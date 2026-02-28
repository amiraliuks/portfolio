"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types/types";

interface BlogPostsProps {
  posts: BlogPost[];
}

export function BlogPosts({ posts }: BlogPostsProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Extract unique tags
  const tags = useMemo(() => {
    return Array.from(
      new Set(posts.flatMap((post) => post.metadata.tags || []))
    ).sort();
  }, [posts]);

  const filteredBlogs = activeTag
    ? posts.filter((post) =>
      post.metadata.tags?.includes(activeTag)
    )
    : posts;

  return (
    <div className="space-y-10">

      {/* Filter Bar */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 border-b border-white/5 pb-6">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-4 py-1.5 text-sm rounded-full border transition
              ${activeTag === null
                ? "bg-neutral-900 text-white dark:bg-white dark:text-black border-neutral-900 dark:border-white"
                : "border-white/10 text-neutral-400 hover:bg-neutral-800"
              }`}
          >
            All
          </button>

          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-1.5 text-sm rounded-full border transition
                ${activeTag === tag
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-black border-neutral-900 dark:border-white"
                  : "border-white/10 text-neutral-400 hover:bg-neutral-800"
                }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Posts */}
      <div className="divide-y divide-white/5">
        {filteredBlogs.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block py-6 transition"
          >
            <div className="grid grid-cols-[auto_1fr_auto] gap-6 items-start">

              {/* Index */}
              <span className="font-mono text-sm text-neutral-500 pt-1">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Content */}
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
                    {post.metadata.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-xs text-neutral-500 dark:text-neutral-400 border border-white/10 rounded-full px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Meta */}
              <div className="text-right text-xs text-neutral-500 whitespace-nowrap pt-1">
                <div>{formatDate(post.metadata.publishedAt, false)}</div>
                {post.metadata.readingTime && (
                  <div>{post.metadata.readingTime} min</div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}