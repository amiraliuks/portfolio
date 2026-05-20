import { notFound, redirect } from "next/navigation";
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
import { getBlogListingPosts, getBlogPosts, getWriteupPosts } from "@/lib/getBlogs";
import { calculateReadingTime, formatDate } from "@/lib/utils";
import { baseUrl } from "@/app/sitemap";
import { BlogPost, BlogPageProps } from "@/types/types";
import { tinyBlurDataURL } from "@/lib/image";
import { toSafeHttpUrl } from "@/lib/url-safety";
import { getBlogHreflangAlternates, getOpenGraphLocales } from "@/lib/blog-hreflang";

const RELATED_POST_LIMIT = 3;

function toAbsoluteImageUrl(image?: string) {
  if (!image) return undefined;
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return toSafeHttpUrl(image);
  }

  const absolute = image.startsWith("/") ? `${baseUrl}${image}` : `${baseUrl}/${image}`;
  return toSafeHttpUrl(absolute);
}

function toNormalizedTagSet(tags: string[] | undefined) {
  return new Set((tags ?? []).map((tag) => tag.trim().toLowerCase()).filter(Boolean));
}

function getRelatedPosts(currentPost: BlogPost) {
  const currentGroupKey = currentPost.metadata.translationKey ?? currentPost.slug;
  const currentLanguage = currentPost.metadata.language ?? "en";
  const currentTags = toNormalizedTagSet(currentPost.metadata.tags);

  const scored = getBlogListingPosts()
    .filter((candidate) => candidate.metadata.public !== false)
    .filter((candidate) => candidate.slug !== currentPost.slug)
    .filter((candidate) => (candidate.metadata.translationKey ?? candidate.slug) !== currentGroupKey)
    .map((candidate) => {
      const candidateTags = toNormalizedTagSet(candidate.metadata.tags);
      const sharedTagCount = [...currentTags].filter((tag) => candidateTags.has(tag)).length;
      const languageBonus = (candidate.metadata.language ?? "en") === currentLanguage ? 0.5 : 0;
      const score = sharedTagCount + languageBonus;

      return {
        post: candidate as BlogPost,
        score,
        sharedTagCount,
        publishedAt: new Date(candidate.metadata.publishedAt).getTime(),
      };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.publishedAt - a.publishedAt;
    });

  if (!scored.length) return [];

  const sameLanguage = scored.filter((item) => (item.post.metadata.language ?? "en") === currentLanguage);
  const languagePool = sameLanguage.length > 0 ? sameLanguage : scored;

  const withSharedTags = languagePool.filter((item) => item.sharedTagCount > 0);
  const finalPool = withSharedTags.length > 0 ? withSharedTags : languagePool;

  return finalPool.slice(0, RELATED_POST_LIMIT).map((item) => item.post);
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
  const socialDescription =
    safeDescription.length > 180 ? `${safeDescription.slice(0, 177).trimEnd()}...` : safeDescription;
  const absoluteImage = toAbsoluteImageUrl(image);
  const ogTitle = `${title} | Blog | Amir Aliu`;
  const ogImage =
    absoluteImage ??
    `${baseUrl}/og?title=${encodeURIComponent(
      ogTitle
    )}&description=${encodeURIComponent(socialDescription)}`;

  const languageAlternates = getBlogHreflangAlternates(post as BlogPost, baseUrl);
  const openGraphLocales = getOpenGraphLocales(post as BlogPost);

  return {
    title,
    description: safeDescription,
    keywords: post.metadata.tags,
    openGraph: {
      title: ogTitle,
      description: socialDescription,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [{ url: ogImage, alt: `${title} preview image` }],
      locale: openGraphLocales.locale,
      alternateLocale: openGraphLocales.alternateLocale,
      authors: ["Amir Aliu"],
      section: "Blog",
      tags: post.metadata.tags ?? [],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: socialDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: `${baseUrl}/blog/${post.slug}`,
      languages: languageAlternates,
    },
  };
}

export default async function Blog({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogPosts().find((entry) => entry.slug === slug) as BlogPost | undefined;

  if (!post) {
    const writeup = getWriteupPosts().find((entry) => entry.slug === slug);
    if (writeup) redirect(`/writeups/${slug}`);
    notFound();
  }

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
  const relatedPosts = getRelatedPosts(post);
  const heroFit = post.metadata.heroFit ?? "contain";

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
    mainEntityOfPage: `${baseUrl}/blog/${post.slug}`,
    keywords: (post.metadata.tags ?? []).join(", "),
    inLanguage: currentLanguage === "al" ? "sq-AL" : "en-US",
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
              className={`rounded-none border px-3 py-1 text-xs font-medium transition ${
                currentLanguage === "en"
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              EN
            </Link>
            <Link
              href={`/blog/${albanianSlug}`}
              className={`rounded-none border px-3 py-1 text-xs font-medium transition ${
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
          aria-label="Share this post on X"
          className="
            flex items-center gap-2
            rounded-none border border-border
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
          aria-label="Share this post on LinkedIn"
          className="
            flex items-center gap-2
            rounded-none border border-border
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
          aria-label="Share this post on Facebook"
          className="
            flex items-center gap-2
            rounded-none border border-border
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
        <div
          className={`mb-14 overflow-hidden rounded-none border border-border/60 ${
            heroFit === "cover" ? "bg-muted/30 p-0" : "bg-muted/20 p-2 sm:p-3"
          }`}
        >
          <Image
            src={post.metadata.image}
            alt={post.metadata.title}
            width={1600}
            height={900}
            sizes="(min-width: 1024px) 1024px, 100vw"
            className={
              heroFit === "cover"
                ? "h-64 w-full object-cover sm:h-[28rem]"
                : "h-auto max-h-[18rem] w-full object-contain sm:max-h-[24rem]"
            }
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

      {relatedPosts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold tracking-tight">Related Posts</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost) => {
              const relatedSummary =
                relatedPost.metadata.summary ?? relatedPost.metadata.description ?? "";
              const relatedReadingTime =
                relatedPost.metadata.readingTime ?? calculateReadingTime(relatedPost.content);

              return (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group rounded-none border border-border/70 bg-muted/20 p-4 transition hover:border-border hover:bg-muted/35"
                >
                  <p className="text-xs text-muted-foreground">
                    {formatDate(relatedPost.metadata.publishedAt)} | {relatedReadingTime}{" "}
                    {relatedReadingTime === 1 ? "min" : "mins"} read
                  </p>
                  <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-foreground/90 transition group-hover:text-foreground">
                    {relatedPost.metadata.title}
                  </h3>
                  {relatedSummary ? (
                    <p className="mt-2 line-clamp-3 text-xs text-muted-foreground">{relatedSummary}</p>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <aside className="mt-12 rounded-none border border-border/70 bg-muted/20 p-4 sm:p-5">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Explore More</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href="/projects"
            className="rounded-none border border-border px-3 py-1 text-xs text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
          >
            Related Projects
          </Link>
          <Link
            href="/certifications"
            className="rounded-none border border-border px-3 py-1 text-xs text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
          >
            Security Certifications
          </Link>
          <Link
            href="/blog"
            className="rounded-none border border-border px-3 py-1 text-xs text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
          >
            Back to Blog
          </Link>
        </div>
      </aside>
    </article>
  );
}