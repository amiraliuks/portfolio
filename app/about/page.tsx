import React from 'react';
import { Metadata } from 'next';
import { webdev, gamedev, tools, database, devops, operatingSystems } from '@/data/techstack';
import TechStack from '@/components/TechStack';

export const metadata: Metadata = {
  title: 'About Me — Amir Aliu',
  description:
    'Learn more about Amir Aliu, a Full Stack Developer passionate about building scalable web applications with modern technologies like React, Next.js, and TypeScript.',
  openGraph: {
    title: 'About Me — Amir Aliu',
    description:
      'Learn more about Amir Aliu, a Full Stack Developer passionate about building scalable web applications.',
    url: 'https://amiraliu.vercel.app/about',
    siteName: 'Amir Aliu Portfolio',
    images: [
      {
        url: 'https://amiraliu.vercel.app/og?title=About%20Me%20%E2%80%94%20Amir%20Aliu&description=Learn%20more%20about%20Amir%20Aliu%2C%20a%20Full%20Stack%20Developer',
        width: 1200,
        height: 630,
        alt: 'About Amir Aliu',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Me — Amir Aliu',
    description: 'Learn more about Amir Aliu, a Full Stack Developer.',
    images: [
      'https://amiraliu.vercel.app/og?title=About%20Me%20%E2%80%94%20Amir%20Aliu&description=Learn%20more%20about%20Amir%20Aliu%2C%20a%20Full%20Stack%20Developer',
    ],
  },
  alternates: {
    canonical: 'https://amiraliu.vercel.app/about',
  },
};

export default function page() {
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
        name: 'About',
        item: 'https://amiraliu.vercel.app/about',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="flex flex-col">
        <main className="grow px-4 max-w-3xl mx-auto py-8">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            I&apos;m a full-stack developer who enjoys building practical, reliable web applications. I work across both the frontend and backend. Alongside development, I actively explore cybersecurity through CTF competitions, vulnerability research, and secure application design.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            I like experimenting with new tools and improving the way I work, and I&apos;m always looking for ways
            to contribute and be useful in any team I&apos;m part of.
          </p>
        </main>

        <section className="mt-2 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4">Technologies and Tools</h2>
          <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
            Operating Systems
          </p>
          <TechStack techStack={operatingSystems} />
          <p className="text-lg text-muted-foreground mb-4 leading-relaxed mt-6">
            Web & Software Development
          </p>
          <TechStack techStack={webdev} />
          <p className="text-lg text-muted-foreground mb-4 leading-relaxed mt-6">
            Game Development
          </p>
          <TechStack techStack={gamedev} />
          <p className="text-lg text-muted-foreground mb-4 leading-relaxed mt-6">
            Tools and Platforms
          </p>
          <TechStack techStack={tools} />
          <p className="text-lg text-muted-foreground mb-4 leading-relaxed mt-6">
            Database and Storage
          </p>
          <TechStack techStack={database} />
          <p className="text-lg text-muted-foreground mb-4 leading-relaxed mt-6">
            DevOps and Cloud
          </p>
          <TechStack techStack={devops} />
        </section>
      </div>
    </>
  );
}