import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { calculateReadingTime, formatDate } from "@/lib/utils";
import { getBlogPosts } from "@/lib/getBlogs";
import { baseUrl } from "@/app/sitemap";
import { BlogPost, BlogPageProps } from "@/types/types";

import { Twitter, Linkedin, Facebook } from "lucide-react";

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params;
  const posts = getBlogPosts();
  const post = posts.find((post) => post.slug === slug);

  if (!post) return;

  const {
    title,
    publishedAt: publishedTime,
    summary,
    description,
    image,
  } = post.metadata;

  const safeDescription = description ?? summary ?? "";

  const ogImage = image
    ? image
    : `https://amiraliu.vercel.app/og?title=${encodeURIComponent(
      title
    )}&description=${encodeURIComponent(safeDescription)}`;

  return {
    title,
    description: safeDescription,
    openGraph: {
      title,
      description: safeDescription,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: safeDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: `${baseUrl}/blog/${post.slug}`,
    },
  };
}

export default async function Blog({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogPosts().find((post) => post.slug === slug) as
    | BlogPost
    | undefined;

  if (!post) notFound();
  const readingTime = calculateReadingTime(post.content);

  const safeDescription =
    post.metadata.description ?? post.metadata.summary ?? "";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://amiraliu.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://amiraliu.vercel.app/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.metadata.title,
        item: `${baseUrl}/blog/${post.slug}`,
      },
    ],
  };

  const ogImage = post.metadata.image
    ? `${baseUrl}${post.metadata.image}`
    : `https://amiraliu.vercel.app/og?title=${encodeURIComponent(
      post.metadata.title
    )}&description=${encodeURIComponent(safeDescription)}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    datePublished: post.metadata.publishedAt,
    dateModified: post.metadata.publishedAt,
    description: safeDescription,
    image: ogImage,
    url: `${baseUrl}/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: "Amir Aliu",
      url: "https://amiraliu.vercel.app",
    },
  };

  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const shareText = post.metadata.title;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent(postUrl)}`;

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    postUrl
  )}`;

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    postUrl
  )}`;

  return (
    <article className="mx-auto max-w-3xl px-4 pt-16 pb-24">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <header className="mb-16">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-[1.15] mb-6">
          {post.metadata.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-neutral-500">
          <span>Amir Aliu</span>
          <span>•</span>
          <span>{formatDate(post.metadata.publishedAt)}</span>
          <span>•</span>
          <span>{readingTime} {readingTime === 1 ? "min" : "mins"} read</span>
        </div>
      </header>

      <div className="flex items-center gap-3">
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-2
            text-xs px-3 py-1.5
            rounded-full
            border border-neutral-300
            hover:bg-neutral-100
            dark:border-neutral-700
            dark:hover:bg-neutral-800
            transition-all duration-200
          "
        >
          <Twitter size={14} />
          Share
        </a>

        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
      flex items-center gap-2
      text-xs px-3 py-1.5
      rounded-full
      border border-neutral-300
      hover:bg-neutral-100
      dark:border-neutral-700
      dark:hover:bg-neutral-800
      transition-all duration-200
    "
        >
          <Linkedin size={14} />
          Share
        </a>

        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
      flex items-center gap-2
      text-xs px-3 py-1.5
      rounded-full
      border border-neutral-300
      hover:bg-neutral-100
      dark:border-neutral-700
      dark:hover:bg-neutral-800
      transition-all duration-200
    "
        >
          <Facebook size={14} />
          Share
        </a>
      </div>

      {post.metadata.image && (
        <div className="mb-16 overflow-hidden rounded-2xl">
          <img
            src={post.metadata.image}
            alt={post.metadata.title}
            className="w-full object-cover"
          />
        </div>
      )}

      <div className="prose prose-neutral dark:prose-invert max-w-none prose-lg">
        <CustomMDX source={post.content} />
      </div>
    </article>
  );
}