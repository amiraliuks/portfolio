import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Twitter, Linkedin, Facebook } from "lucide-react";

import { CustomMDX } from "@/components/mdx";
import { BlogReadingProgress } from "@/components/blog/BlogReadingProgress";
import { BlogTableOfContents } from "@/components/blog/BlogTableOfContents";
import {
  extractPostDescription,
  extractTableOfContents,
  stripFirstMatchingImageFromContent,
} from "@/lib/blog-content";
import { getBlogPosts } from "@/lib/getBlogs";
import { calculateReadingTime, formatDate } from "@/lib/utils";
import { baseUrl } from "@/app/sitemap";
import { BlogPost, BlogPageProps } from "@/types/types";
import { tinyBlurDataURL } from "@/lib/image";
import { toSafeHttpUrl } from "@/lib/url-safety";

function toAbsoluteImageUrl(image?: string) {
  if (!image) return undefined;
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return toSafeHttpUrl(image);
  }

  const absolute = image.startsWith("/") ? `${baseUrl}${image}` : `${baseUrl}/${image}`;
  return toSafeHttpUrl(absolute);
}

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params;
  const posts = getBlogPosts();
  const post = posts.find((entry) => entry.slug === slug);

  if (!post) return;

  const {
    title,
    publishedAt: publishedTime,
    summary,
    description,
    image,
  } = post.metadata;

  const safeDescription = description ?? summary ?? extractPostDescription(post.content);
  const absoluteImage = toAbsoluteImageUrl(image);
  const ogImage =
    absoluteImage ??
    `${baseUrl}/og?title=${encodeURIComponent(
      title
    )}&description=${encodeURIComponent(safeDescription)}`;

  const languageAlternates: Record<string, string> = {};
  if (post.metadata.translationSlugs?.en) {
    languageAlternates["en-US"] = `${baseUrl}/blog/${post.metadata.translationSlugs.en}`;
  }
  if (post.metadata.translationSlugs?.al) {
    languageAlternates["sq-AL"] = `${baseUrl}/blog/${post.metadata.translationSlugs.al}`;
  }

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
      ...(Object.keys(languageAlternates).length > 0
        ? { languages: languageAlternates }
        : {}),
    },
  };
}

export default async function Blog({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogPosts().find((entry) => entry.slug === slug) as BlogPost | undefined;

  if (!post) notFound();

  const readingTime = calculateReadingTime(post.content);
  const currentLanguage = post.metadata.language ?? "en";
  const englishSlug =
    post.metadata.translationSlugs?.en ?? (currentLanguage === "en" ? post.slug : undefined);
  const albanianSlug =
    post.metadata.translationSlugs?.al ?? (currentLanguage === "al" ? post.slug : undefined);
  const hasLanguageSwitch = Boolean(englishSlug && albanianSlug);
  const contentForRender = stripFirstMatchingImageFromContent(
    post.content,
    post.metadata.image
  );
  const tableOfContents = extractTableOfContents(contentForRender);
  const safeDescription =
    post.metadata.description ?? post.metadata.summary ?? extractPostDescription(post.content);

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

  const absoluteImage = toAbsoluteImageUrl(post.metadata.image);
  const ogImage =
    absoluteImage ??
    `${baseUrl}/og?title=${encodeURIComponent(
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
    <article
      data-blog-post="true"
      className="mx-auto w-full max-w-6xl px-4 pb-24 pt-16 sm:px-6 lg:px-10"
    >
      <BlogReadingProgress />

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

      <header className="mb-12">
        <h1 className="mb-6 text-3xl font-bold leading-[1.15] tracking-tight md:text-4xl">
          {post.metadata.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span>Amir Aliu</span>
          <span>|</span>
          <span>{formatDate(post.metadata.publishedAt)}</span>
          <span>|</span>
          <span>
            {readingTime} {readingTime === 1 ? "min" : "mins"} read
          </span>
        </div>

        {hasLanguageSwitch && (
          <div className="mt-5 flex items-center gap-2">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">Language</span>
            <Link
              href={`/blog/${englishSlug}`}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                currentLanguage === "en"
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              EN
            </Link>
            <Link
              href={`/blog/${albanianSlug}`}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                currentLanguage === "al"
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              AL
            </Link>
          </div>
        )}
      </header>

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-2
            rounded-full border border-border
            px-3 py-1.5 text-xs
            transition-all duration-200
            hover:bg-accent
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
            rounded-full border border-border
            px-3 py-1.5 text-xs
            transition-all duration-200
            hover:bg-accent
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
            rounded-full border border-border
            px-3 py-1.5 text-xs
            transition-all duration-200
            hover:bg-accent
          "
        >
          <Facebook size={14} />
          Share
        </a>
      </div>

      {post.metadata.image && (
        <div className="mb-14 overflow-hidden rounded-2xl">
          <Image
            src={post.metadata.image}
            alt={post.metadata.title}
            width={1600}
            height={900}
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="h-auto w-full object-cover"
            placeholder="blur"
            blurDataURL={tinyBlurDataURL}
            priority
          />
        </div>
      )}

      <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_15rem]">
        <div
          data-blog-content="true"
          className="prose prose-lg max-w-none min-w-0 prose-neutral dark:prose-invert"
        >
          <CustomMDX source={contentForRender} />
        </div>
        <BlogTableOfContents headings={tableOfContents} />
      </div>
    </article>
  );
}
