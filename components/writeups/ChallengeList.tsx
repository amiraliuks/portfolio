"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { formatDate } from "@/lib/utils";

type ChallengeListPost = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
};

type ChallengeListProps = {
  posts: ChallengeListPost[];
};

const HIDDEN_TAGS = new Set([
  "ctf",
  "ctf writeups",
  "cybersecurity",
  "security research",
  "writeup",
]);

function getVisibleTags(tags: string[]) {
  return tags
    .map((tag) => tag.trim())
    .filter(Boolean)
    .filter((tag) => !HIDDEN_TAGS.has(tag.toLowerCase()));
}

export function ChallengeList({ posts }: ChallengeListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const presentablePosts = useMemo(() => {
    return posts.map((post) => ({
      ...post,
      displayTags: getVisibleTags(post.tags),
    }));
  }, [posts]);

  const tagEntries = useMemo(() => {
    const counts = new Map<string, number>();

    presentablePosts.forEach((post) => {
      post.displayTags.forEach((tag) => {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      });
    });

    return [...counts.entries()].sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      return a[0].localeCompare(b[0]);
    });
  }, [presentablePosts]);

  const filteredPosts = activeTag
    ? presentablePosts.filter((post) => post.displayTags.includes(activeTag))
    : presentablePosts;

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Challenges</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Showing {filteredPosts.length} of {posts.length}
          </p>
        </div>

        {tagEntries.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              aria-pressed={activeTag === null}
              className={`rounded-none border px-3 py-1 text-xs transition ${
                activeTag === null
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              All{" "}
              <span className="text-[10px] opacity-70">
                {posts.length}
              </span>
            </button>

            {tagEntries.map(([tag, count]) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                aria-pressed={activeTag === tag}
                className={`rounded-none border px-3 py-1 text-xs transition ${
                  activeTag === tag
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {tag}{" "}
                <span className="text-[10px] opacity-70">
                  {count}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/writeups/${post.slug}`}
            className="group rounded-none border border-border/70 bg-muted/20 p-4 transition hover:border-border hover:bg-muted/35"
          >
            <p className="text-xs text-muted-foreground">
              {formatDate(post.publishedAt)} | {post.readingTime}{" "}
              {post.readingTime === 1 ? "min" : "mins"} read
            </p>
            <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-foreground/90 transition group-hover:text-foreground">
              {post.title}
            </h3>
            {post.summary ? (
              <p className="mt-2 line-clamp-3 text-xs text-muted-foreground">{post.summary}</p>
            ) : null}
            {post.displayTags.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {post.displayTags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-none border border-border px-2 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
