"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types/types";

interface BlogPostsProps {
  posts: BlogPost[];
}

const MAX_FILTER_TAGS = 8;
const MAX_POST_TAGS = 3;
const PAGE_SIZE = 5;

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

  const tags = useMemo(() => {
    const counts = new Map<string, number>();

    sortedPosts.forEach((post) => {
      (post.metadata.tags || []).forEach((tag) => {
        counts.set(tag, (counts.get(tag) || 0) + 1);
      });
    });

    return [...counts.entries()]
      .sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1];
        return a[0].localeCompare(b[0]);
      })
      .map(([tag]) => tag);
  }, [sortedPosts]);

  const primaryTags = tags.slice(0, MAX_FILTER_TAGS);
  const extraTags = tags.slice(MAX_FILTER_TAGS);
  const visibleFilterTags = showAllTags
    ? tags
    : activeTag && extraTags.includes(activeTag)
      ? [...primaryTags, activeTag]
      : primaryTags;

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredBlogs = useMemo(() => {
    return sortedPosts.filter((post) => {
      const matchesTag = activeTag ? post.metadata.tags?.includes(activeTag) : true;
      if (!matchesTag) return false;

      if (!normalizedQuery) return true;

      const searchBlob = [
        post.metadata.title,
        post.metadata.description ?? "",
        post.metadata.summary ?? "",
        ...(post.metadata.tags || []),
      ]
        .join(" ")
        .toLowerCase();

      return searchBlob.includes(normalizedQuery);
    });
  }, [activeTag, normalizedQuery, sortedPosts]);

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
  const featuredPosts = sortedPosts.slice(0, 2);
  const showFeatured = !activeTag && !normalizedQuery && featuredPosts.length > 0;

  return (
    <div className="space-y-8">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
            setVisibleCount(PAGE_SIZE);
          }}
          placeholder="Search by title, summary, or tag..."
          className="h-11 w-full rounded-xl border border-white/10 bg-neutral-950/70 pl-10 pr-3 text-sm text-neutral-100 placeholder:text-neutral-500 focus:border-neutral-500 focus:outline-none"
        />
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 border-b border-white/5 pb-6">
          <button
            onClick={() => {
              setActiveTag(null);
              setShowAllTags(false);
              setVisibleCount(PAGE_SIZE);
            }}
            className={`px-4 py-1.5 text-sm rounded-full border transition
              ${activeTag === null
                ? "bg-neutral-900 text-white dark:bg-white dark:text-black border-neutral-900 dark:border-white"
                : "border-white/10 text-neutral-400 hover:bg-neutral-800"
              }`}
          >
            All
          </button>

          {visibleFilterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setActiveTag(tag);
                setVisibleCount(PAGE_SIZE);
              }}
              className={`px-4 py-1.5 text-sm rounded-full border transition
                ${activeTag === tag
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-black border-neutral-900 dark:border-white"
                  : "border-white/10 text-neutral-400 hover:bg-neutral-800"
                }`}
            >
              {tag}
            </button>
          ))}

          {extraTags.length > 0 && (
            <button
              onClick={() => setShowAllTags((prev) => !prev)}
              className="px-4 py-1.5 text-sm rounded-full border border-white/10 text-neutral-400 hover:bg-neutral-800 transition"
            >
              {showAllTags ? "Show less" : `More tags (${extraTags.length})`}
            </button>
          )}
        </div>
      )}

      {showFeatured && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
              Featured
            </h2>
            <span className="text-xs text-neutral-500">Top 2 recent posts</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {featuredPosts.map((post) => {
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/60 transition hover:border-neutral-600 hover:bg-neutral-900/70"
                >
                  {post.metadata.image ? (
                    <Image
                      src={post.metadata.image}
                      alt={post.metadata.title}
                      width={1200}
                      height={630}
                      className="h-40 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="h-40 w-full bg-gradient-to-br from-neutral-900 to-neutral-800" />
                  )}

                  <div className="space-y-2 p-4">
                    <h3 className="text-base font-semibold text-neutral-100 group-hover:text-blue-400 transition">
                      {post.metadata.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-neutral-400">
                      {post.metadata.description ?? post.metadata.summary}
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-neutral-500">{formatDate(post.metadata.publishedAt)}</span>
                      <span className="text-neutral-700">|</span>
                      <span className="text-neutral-500">
                        {post.metadata.readingTime ?? 1} min
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <div className="divide-y divide-white/5">
        {visiblePosts.map((post, index) => {
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block py-6 transition"
            >
              <div className="grid grid-cols-[auto_1fr_auto] gap-6 items-start">
                <span className="font-mono text-sm text-neutral-500 pt-1">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="space-y-2">
                  <h2 className="text-lg sm:text-xl font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-blue-500 transition">
                    {post.metadata.title}
                  </h2>

                  {post.metadata.description && (
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
                      {post.metadata.description}
                    </p>
                  )}

                  {post.metadata.tags && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {post.metadata.tags.slice(0, MAX_POST_TAGS).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-neutral-500 dark:text-neutral-400 border border-white/10 rounded-full px-2 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.metadata.tags.length > MAX_POST_TAGS && (
                        <span className="text-xs text-neutral-500 dark:text-neutral-400 border border-white/10 rounded-full px-2 py-0.5">
                          +{post.metadata.tags.length - MAX_POST_TAGS} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-1 text-right text-xs whitespace-nowrap">
                  <div className="text-neutral-500">{formatDate(post.metadata.publishedAt)}</div>
                  <div className="text-neutral-500">{post.metadata.readingTime ?? 1} min</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="rounded-xl border border-white/10 bg-neutral-950/50 p-6 text-center text-sm text-neutral-400">
          No blog posts matched your current search/filter.
        </div>
      )}

      {hasMore && (
        <div className="flex flex-col items-center gap-3 pt-2">
          <button
            onClick={() => setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredBlogs.length))}
            className="rounded-full border border-white/10 px-5 py-2 text-sm text-neutral-300 transition hover:bg-neutral-800"
          >
            Load more posts
          </button>
          <p className="text-xs text-neutral-500">
            Showing {visiblePosts.length} of {filteredBlogs.length}
          </p>
        </div>
      )}

      <div ref={sentinelRef} className="h-1 w-full" aria-hidden />
    </div>
  );
}
