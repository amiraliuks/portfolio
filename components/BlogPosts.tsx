"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { normalizeBlogTags } from "@/lib/blog-tags";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types/types";
import { tinyBlurDataURL } from "@/lib/image";
import { trackEvent } from "@/lib/analytics";

interface BlogPostsProps {
  posts: BlogPost[];
}

const MAX_FILTER_TAGS = 6;
const MAX_POST_TAGS = 3;
const PAGE_SIZE = 5;

type PresentablePost = BlogPost & {
  displayTags: string[];
  languageLabel: string;
};

function getLanguageLabel(post: BlogPost): string {
  const available = post.metadata.availableLanguages ?? [];
  const hasEnglish = available.includes("en");
  const hasAlbanian = available.includes("al");

  if (hasEnglish && hasAlbanian) return "Available in English and Albanian";
  if (hasAlbanian) return "Available in Albanian";
  return "Available in English";
}

export function BlogPosts({ posts }: BlogPostsProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showAllTags, setShowAllTags] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const sortedPosts = useMemo(() => {
    return [...posts].sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    );
  }, [posts]);

  const presentablePosts = useMemo<PresentablePost[]>(() => {
    return sortedPosts.map((post) => ({
      ...post,
      displayTags: normalizeBlogTags(post.metadata.tags, MAX_POST_TAGS),
      languageLabel: getLanguageLabel(post),
    }));
  }, [sortedPosts]);

  const tagEntries = useMemo(() => {
    const counts = new Map<string, number>();

    presentablePosts.forEach((post) => {
      post.displayTags.forEach((tag) => {
        counts.set(tag, (counts.get(tag) || 0) + 1);
      });
    });

    return [...counts.entries()]
      .sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1];
        return a[0].localeCompare(b[0]);
      });
  }, [presentablePosts]);

  const tags = tagEntries.map(([tag]) => tag);
  const tagCountMap = new Map(tagEntries);

  const primaryTags = tags.slice(0, MAX_FILTER_TAGS);
  const extraTags = tags.slice(MAX_FILTER_TAGS);
  const visibleFilterTags = showAllTags
    ? tags
    : activeTag && extraTags.includes(activeTag)
      ? [...primaryTags, activeTag]
      : primaryTags;

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredBlogs = useMemo(() => {
    return presentablePosts.filter((post) => {
      const matchesTag = activeTag ? post.displayTags.includes(activeTag) : true;
      if (!matchesTag) return false;

      if (!normalizedQuery) return true;

      const searchBlob = [
        post.metadata.title,
        post.metadata.description ?? "",
        post.metadata.summary ?? "",
        ...(post.metadata.tags || []),
        ...post.displayTags,
      ]
        .join(" ")
        .toLowerCase();

      return searchBlob.includes(normalizedQuery);
    });
  }, [activeTag, normalizedQuery, presentablePosts]);

  const hasMore = visibleCount < filteredBlogs.length;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredBlogs.length));
        }
      },
      { rootMargin: "160px 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [filteredBlogs.length, hasMore]);

  const visiblePosts = filteredBlogs.slice(0, visibleCount);
  const featuredPosts = presentablePosts.slice(0, 2);
  const showFeatured = !activeTag && !normalizedQuery && featuredPosts.length > 0;

  return (
    <div className="space-y-9">
      <div className="relative" role="search" aria-label="Search blog posts">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <label htmlFor="blog-search" className="sr-only">
          Search blog posts by title, summary, or tag
        </label>
        <input
          id="blog-search"
          type="search"
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
            setVisibleCount(PAGE_SIZE);
          }}
          placeholder="Search by title, summary, or tag..."
          className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
        />
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 border-b border-border/60 pb-6">
          <button
            type="button"
            onClick={() => {
              setActiveTag(null);
              setShowAllTags(false);
              setVisibleCount(PAGE_SIZE);
            }}
            aria-pressed={activeTag === null}
            className={`px-4 py-1.5 text-sm rounded-full border transition
              ${activeTag === null
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
          >
            All
          </button>

          {visibleFilterTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setActiveTag(tag);
                setVisibleCount(PAGE_SIZE);
              }}
              aria-pressed={activeTag === tag}
              className={`px-4 py-1.5 text-sm rounded-full border transition
                ${activeTag === tag
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
            >
              {tag}{" "}
              <span className="text-[11px] opacity-70">
                {tagCountMap.get(tag)}
              </span>
            </button>
          ))}

          {extraTags.length > 0 && (
            <button
              type="button"
              onClick={() => setShowAllTags((prev) => !prev)}
              className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
            >
              {showAllTags ? "Show less" : `More tags (${extraTags.length})`}
            </button>
          )}
        </div>
      )}

      {showFeatured && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Featured
            </h2>
            <span className="text-xs text-muted-foreground">Top 2 recent posts</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {featuredPosts.map((post, featuredIndex) => {
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-card/70 transition duration-300 hover:-translate-y-0.5 hover:border-border hover:bg-accent/25"
                  onClick={() =>
                    trackEvent("blog_post_open", {
                      source: "blog_featured",
                      slug: post.slug,
                    })
                  }
                >
                  <div className="relative overflow-hidden border-b border-border/60">
                    {post.metadata.image ? (
                      <Image
                        src={post.metadata.image}
                        alt={post.metadata.title}
                        width={1200}
                        height={630}
                        className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                        sizes="(min-width: 768px) 50vw, 100vw"
                        placeholder="blur"
                        blurDataURL={tinyBlurDataURL}
                        priority={featuredIndex === 0}
                      />
                    ) : (
                      <div className="h-44 w-full bg-gradient-to-br from-muted to-accent" />
                    )}
                  </div>

                  <div className="space-y-3 p-5">
                    <h3 className="line-clamp-2 text-xl font-semibold leading-tight text-foreground transition group-hover:text-primary">
                      {post.metadata.title}
                    </h3>
                    <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {post.metadata.description ?? post.metadata.summary}
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground">{formatDate(post.metadata.publishedAt)}</span>
                      <span className="text-muted-foreground/60">|</span>
                      <span className="text-muted-foreground">
                        {post.metadata.readingTime ?? 1} min
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">{post.languageLabel}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <div className="divide-y divide-border/60">
        {visiblePosts.map((post, index) => {
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border border-transparent px-1 py-6 transition hover:border-border hover:bg-accent/25 sm:px-3"
              onClick={() =>
                trackEvent("blog_post_open", {
                  source: "blog_list",
                  slug: post.slug,
                })
              }
            >
              <div className="grid items-start gap-5 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-6">
                <span className="pt-1 font-mono text-sm text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="space-y-2">
                  <h2 className="line-clamp-2 text-lg font-medium text-foreground transition group-hover:text-primary sm:text-xl">
                    {post.metadata.title}
                  </h2>

                  {post.metadata.description && (
                    <p className="line-clamp-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {post.metadata.description}
                    </p>
                  )}

                  {post.displayTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {post.displayTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-1 text-left text-xs whitespace-nowrap sm:text-right">
                  <div className="text-muted-foreground">{formatDate(post.metadata.publishedAt)}</div>
                  <div className="text-muted-foreground">{post.metadata.readingTime ?? 1} min</div>
                  <div className="max-w-[15rem] text-[11px] leading-snug whitespace-normal text-muted-foreground sm:text-right">
                    {post.languageLabel}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="rounded-xl border border-border bg-muted/25 p-6 text-center text-sm text-muted-foreground">
          No blog posts matched your current search/filter.
        </div>
      )}

      {hasMore && (
        <div className="flex flex-col items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredBlogs.length))}
            className="rounded-full border border-border px-5 py-2 text-sm text-foreground transition hover:bg-accent"
          >
            Load more posts
          </button>
          <p className="text-xs text-muted-foreground">
            Showing {visiblePosts.length} of {filteredBlogs.length}
          </p>
        </div>
      )}

      <div ref={sentinelRef} className="h-1 w-full" aria-hidden />
    </div>
  );
}
