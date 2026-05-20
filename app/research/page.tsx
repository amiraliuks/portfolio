import type { Metadata } from "next";

import ResearchSection from "@/components/sections/ResearchSection";
import { cves, researchCards } from "@/data/research";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Security research, CVE work, and vulnerability writeups by Amir Aliu.",
  keywords: [
    "Security research",
    "CVE",
    "Vulnerability research",
    "Web security",
    "Cybersecurity",
  ],
  openGraph: {
    title: "Research | Amir Aliu",
    description:
      "Security research, CVE work, and vulnerability writeups by Amir Aliu.",
    url: "https://amiraliu.vercel.app/research",
    siteName: "Amir Aliu Portfolio",
    images: [
      {
        url: "https://amiraliu.vercel.app/og?title=Research%20-%20Amir%20Aliu&description=Security%20research%2C%20CVE%20work%2C%20and%20vulnerability%20writeups",
        width: 1200,
        height: 630,
        alt: "Amir Aliu Research",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Research | Amir Aliu",
    description:
      "Security research, CVE work, and vulnerability writeups by Amir Aliu.",
    images: [
      "https://amiraliu.vercel.app/og?title=Research%20-%20Amir%20Aliu&description=Security%20research%2C%20CVE%20work%2C%20and%20vulnerability%20writeups",
    ],
  },
  alternates: {
    canonical: "https://amiraliu.vercel.app/research",
  },
};

export default function ResearchPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Security Research",
    description:
      "Security research, CVE work, and vulnerability writeups by Amir Aliu.",
    url: "https://amiraliu.vercel.app/research",
    author: {
      "@type": "Person",
      name: "Amir Aliu",
      url: "https://amiraliu.vercel.app",
    },
    hasPart: researchCards.map((item) => ({
      "@type": "CreativeWork",
      name: item.title,
      description: item.description,
      dateCreated: item.date,
      keywords: item.tags.join(", "),
      url: item.href
        ? `https://amiraliu.vercel.app${item.href}`
        : "https://amiraliu.vercel.app/research",
    })),
    about: cves.map((cve) => ({
      "@type": "Thing",
      name: `${cve.id} - ${cve.product}`,
      description: cve.vulnerabilityType,
      url: cve.href
        ? `https://amiraliu.vercel.app${cve.href}`
        : "https://amiraliu.vercel.app/research",
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        <div className="mb-12 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Research
          </h1>
          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
            CVE work, vulnerability research, and security-focused writeups across web, browser, and device security.
          </p>
        </div>

        <ResearchSection />
      </div>
    </>
  );
}