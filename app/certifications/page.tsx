import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import CertificationsSection from '@/components/sections/CertificationSection';

import { certifications } from '@/data/certifications';

export const metadata: Metadata = {
  title: 'Certifications',
  description:
    'A timeline of cybersecurity, CTF, and professional certifications documenting hands-on training, competitions, and practical technical growth.',
  keywords: [
    'Certifications',
    'Professional certifications',
    'CTF certifications',
    'Cybersecurity training',
    'Amir Aliu',
  ],
  openGraph: {
    title: 'Certifications | Amir Aliu',
    description:
      'A timeline of cybersecurity, CTF, and professional certifications documenting hands-on training, competitions, and practical technical growth.',
    url: 'https://amiraliu.vercel.app/certifications',
    siteName: 'Amir Aliu Portfolio',
    images: [
      {
        url: 'https://amiraliu.vercel.app/og?title=Certifications%20-%20Amir%20Aliu&description=Browse%20my%20certifications%20across%20cybersecurity%2C%20support%2C%20and%20professional%20training',
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
    title: 'Certifications | Amir Aliu',
    description:
      'A timeline of cybersecurity, CTF, and professional certifications documenting hands-on training, competitions, and practical technical growth.',
    images: [
      'https://amiraliu.vercel.app/og?title=Certifications%20-%20Amir%20Aliu&description=Browse%20my%20certifications%20across%20cybersecurity%2C%20support%2C%20and%20professional%20training',
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
      'Professional and CTF certifications demonstrating practical skills in cybersecurity and modern technology.',
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
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
        <header className="mb-8">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">
            Certifications
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            A compact timeline of cybersecurity, CTF, and professional certifications. The page highlights recent work first, then groups the full archive by year.
          </p>
        </header>

        <CertificationsSection />
      </div>
    </>
  );
}