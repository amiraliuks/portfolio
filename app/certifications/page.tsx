import React from 'react';
import { certifications } from '@/data/certifications';
import CertificationsSection from '@/components/CertificationSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Certifications — Amir aliu',
  description:
    "Browse through my various certifications. A collection that reflects the areas I genuinely enjoy working in. Each certification represents skills I've built over time and shows my commitment to continuous learning, improvement, and staying active in the fields I care about most.",
  openGraph: {
    title: 'Certifications — Amir aliu',
    description:
      "Browse through my various certifications. A collection that reflects the areas I genuinely enjoy working in. Each certification represents skills I've built over time and shows my commitment to continuous learning, improvement, and staying active in the fields I care about most.",
    url: 'https://amiraliu.vercel.app/projects',
    siteName: 'Amir Aliu Portfolio',
    images: [
      {
        url: 'https://amiraliu.vercel.app/og?title=Projects%20%E2%80%94%20Amir%20Aliu&description=Explore%20my%20portfolio%20of%20web%20applications%20and%20open-source%20contributions',
        width: 1200,
        height: 630,
        alt: 'Amir Aliu Certifications',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Certifications — Amir Aliu',
    description: "Browse through my various certifications. A collection that reflects the areas I genuinely enjoy working in. Each certification represents skills I've built over time and shows my commitment to continuous learning, improvement, and staying active in the fields I care about most.",
    images: [
      'https://amiraliu.vercel.app/og?title=Certifications%20%E2%80%94%20Amir%20Aliu&description=Explore%20my%20portfolio%20of%20web%20applications%20and%20open-source%20contributions',
    ],
  },
  alternates: {
    canonical: 'https://amiraliu.vercel.app/certifications',
  },
};

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Certifications Showcase',
    description:
      'Portfolio of web applications, creative experiments, and open-source contributions built with modern technologies.',
    url: 'https://amiraliu.vercel.app/certifications',
    author: {
      '@type': 'Person',
      name: 'Amir Aliu',
      url: 'https://amiraliu.vercel.app',
    },
    hasPart: certifications.map((certification) => ({
      '@type': 'CreativeWork',
      name: certification.title,
      description: certification.description,
      url: certification.live || certification.href || 'https://amiraliu.vercel.app/projects',
      dateCreated: certification.createdAt,
      keywords: certification.badge.join(', '),
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
            Certifications
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-lg">
            Browse through my various certifications. A collection that reflects the areas I genuinely enjoy working in. Each certification represents skills I&apos;ve built over time and shows my commitment to continuous learning, improvement, and staying active in the fields I care about most.
          </p>
        </div>

        {/* Certifications List */}
        <CertificationsSection />
      </div>
    </>
  );
}
