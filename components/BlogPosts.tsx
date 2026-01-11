import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { getBlogPosts } from "@/lib/getBlogs";

export function BlogPosts() {
  const allBlogs = getBlogPosts().sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  return (
    <div className="divide-y divide-white/5">
      {allBlogs.map((post, index) => (
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
  );
}