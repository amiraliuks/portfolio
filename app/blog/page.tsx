import React from 'react';
import { BlogPosts } from '@/components/BlogPosts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Amir Aliu',
  description:
    'Read articles about web development, programming, and technology. Learn about React, Next.js, TypeScript, and modern software development practices.',
  openGraph: {
    title: 'Blog — Amir Aliu',
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
    title: 'Blog — Amir Aliu',
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
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://amiraliu.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://amiraliu.vercel.app/blog',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6">Blog</h1>
        <p className="text-muted-foreground mb-8">
          Insights, tutorials, and everything in between.
        </p>
        <BlogPosts />
      </div>
    </>
  );
}
