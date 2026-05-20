import React from 'react';
import { Metadata } from 'next';
import { BlogPosts } from '@/components/sections/BlogPosts';
import { getWriteupListingPosts } from "@/lib/getBlogs";
import { baseUrl } from '@/app/sitemap';

export const metadata: Metadata = {
  title: 'Writeups',
  description:
    'CTF writeups from competitions I participate in solo or with the KSAL Cyber Team.',
  keywords: [
    'Writeups',
    'CTF writeups',
    'Cybersecurity',
    'KSAL Cyber Team',
    'Amir Aliu writeups',
  ],
  openGraph: {
    title: 'Writeups | Amir Aliu',
    description:
      'CTF writeups from competitions I participate in solo or with the KSAL Cyber Team.',
    url: 'https://amiraliu.vercel.app/writeups',
    siteName: 'Amir Aliu Portfolio',
    images: [
      {
        url: 'https://amiraliu.vercel.app/og?title=Writeups%20%E2%80%94%20Amir%20Aliu&description=CTF%20writeups%20from%20solo%20and%20KSAL%20Cyber%20Team%20competitions',
        width: 1200,
        height: 630,
        alt: 'Amir Aliu Writeups',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Writeups | Amir Aliu',
    description: 'CTF writeups from solo and KSAL Cyber Team competitions.',
    images: [
      'https://amiraliu.vercel.app/og?title=Writeups%20%E2%80%94%20Amir%20Aliu&description=CTF%20writeups%20from%20solo%20and%20KSAL%20Cyber%20Team%20competitions',
    ],
  },
  alternates: {
    canonical: 'https://amiraliu.vercel.app/writeups',
  },
};

export default function Page() {
  const posts = getWriteupListingPosts().sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  );
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'CTF Writeups',
    description: 'CTF writeups from competitions I participate in solo or with the KSAL Cyber Team.',
    url: `${baseUrl}/writeups`,
    hasPart: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.metadata.title,
      url: `${baseUrl}/writeups/${post.slug}`,
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
        <h1 className="text-4xl font-bold mb-6">Writeups</h1>
        <p className="text-muted-foreground mb-6">
          My writeups for CTFs I participate in solo or with the <a href="https://ksal.netlify.app/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
            KSAL Cyber Team
          </a>.
        </p>

        <BlogPosts
          posts={posts}
          basePath="/writeups"
          collectionLabel="writeups"
          featuredLabel="Top 2 recent writeups"
          emptyLabel="No writeups matched your current search/filter."
          hiddenTags={["Security Research"]}
        />
      </div>
    </>
  );
}