import React from 'react';
import { Metadata } from 'next';
import { projects } from '@/data/projects';
import ProjectSection from '@/components/ProjectSection';

export const metadata: Metadata = {
  title: 'Projects — Amir Aliu',
  description:
    'Explore my portfolio of web applications, creative experiments, and open-source contributions built with modern technologies.',
  openGraph: {
    title: 'Projects — Amir Aliu',
    description:
      'Explore my portfolio of web applications, creative experiments, and open-source contributions.',
    url: 'https://amiraliu.vercel.app/projects',
    siteName: 'Amir Aliu Portfolio',
    images: [
      {
        url: 'https://amiraliu.vercel.app/og?title=Projects%20%E2%80%94%20Amir%20Aliu&description=Explore%20my%20portfolio%20of%20web%20applications%20and%20open-source%20contributions',
        width: 1200,
        height: 630,
        alt: 'Amir Aliu Projects',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects — Amir Aliu',
    description: 'Explore my portfolio of web applications and open-source contributions.',
    images: [
      'https://amiraliu.vercel.app/og?title=Projects%20%E2%80%94%20Amir%20Aliu&description=Explore%20my%20portfolio%20of%20web%20applications%20and%20open-source%20contributions',
    ],
  },
  alternates: {
    canonical: 'https://amiraliu.vercel.app/projects',
  },
};

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projects Showcase',
    description:
      'Portfolio of web applications, creative experiments, and open-source contributions built with modern technologies.',
    url: 'https://amiraliu.vercel.app/projects',
    author: {
      '@type': 'Person',
      name: 'Amir Aliu',
      url: 'https://amiraliu.vercel.app',
    },
    hasPart: projects.map((project) => ({
      '@type': 'CreativeWork',
      name: project.title,
      description: project.description,
      url: project.live || project.href || 'https://amiraliu.vercel.app/projects',
      dateCreated: project.createdAt,
      keywords: project.badge.join(', '),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-12 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Projects
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-lg">
            A showcase of my work in web development, cybersecurity, and various other tech areas. You&apos;ll find a mix of open-source projects, released products, and select closed-source work I&apos;m able to highlight — all representing the skills I&apos;ve built and the areas I enjoy exploring.
          </p>
        </div>

        {/* Projects List */}
        <ProjectSection />
      </div>
    </>
  );
}