import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { BlogPosts } from '@/components/BlogPosts';
import { getBlogListingPosts } from "@/lib/getBlogs";
import { baseUrl } from '@/app/sitemap';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Read articles about web development, programming, and technology. Learn about React, Next.js, TypeScript, and modern software development practices.',
  keywords: [
    'Blog',
    'CTF writeups',
    'Cybersecurity research',
    'Next.js tutorials',
    'Amir Aliu articles',
  ],
  openGraph: {
    title: 'Blog | Amir Aliu',
    description:
      'Read articles about web development, programming, and technology by Amir Aliu.',
    url: 'https://amiraliu.vercel.app/blog',
    siteName: 'Amir Aliu Portfolio',
    images: [
      {
        url: 'https://amiraliu.vercel.app/og?title=Blog%20%E2%80%94%20Amir%20Aliu&description=Read%20articles%20about%20web%20development%2C%20programming%2C%20and%20technology',
        width: 1200,
        height: 630,
        alt: 'Amir Aliu Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Amir Aliu',
    description: 'Read articles about web development, programming, and technology.',
    images: [
      'https://amiraliu.vercel.app/og?title=Blog%20%E2%80%94%20Amir%20Aliu&description=Read%20articles%20about%20web%20development%2C%20programming%2C%20and%20technology',
    ],
  },
  alternates: {
    canonical: 'https://amiraliu.vercel.app/blog',
  },
};

export default function Page() {
  const posts = getBlogListingPosts().sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  );
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog Articles',
    description: 'Insights, tutorials, CTF writeups, and hands-on security research.',
    url: `${baseUrl}/blog`,
    hasPart: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.metadata.title,
      url: `${baseUrl}/blog/${post.slug}`,
      datePublished: post.metadata.publishedAt,
      keywords: (post.metadata.tags ?? []).join(', '),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Blog</h1>
        <p className="text-muted-foreground mb-6">
          Insights, tutorials, CTF writeups, and hands-on security research.
        </p>

        <BlogPosts posts={posts} />
      </div>
    </>
  );
}
