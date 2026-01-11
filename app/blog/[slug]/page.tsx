import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { formatDate } from "@/lib/utils";
import { getBlogPosts } from "@/lib/getBlogs";
import { baseUrl } from "@/app/sitemap";
import { BlogPost, BlogPageProps } from "@/types/types";

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

  return (
    <section>
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

      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>

      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>

      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}