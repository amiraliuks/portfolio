import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";

import TechStack from "@/components/sections/TechStack";
import { baseUrl } from "@/app/sitemap";
import {
  webdev,
  gamedev,
  tools,
  database,
  devops,
  operatingSystems,
} from "@/data/techstack";
import experience from "@/data/experience";
import { projects } from "@/data/projects";
import { certifications, countCertificationsByCategory } from "@/data/certifications";
import { getBlogListingPosts } from "@/lib/getBlogs";

const description =
  "Cybersecurity practitioner and vulnerability researcher based in Gjilan, Kosovo, focused on offensive security, reverse engineering, and web security.";

export const metadata: Metadata = {
  title: "About | Amir Aliu",
  description,
  openGraph: {
    title: "About | Amir Aliu",
    description,
    url: `${baseUrl}/about`,
    siteName: "Amir Aliu",
    images: [
      {
        url: `${baseUrl}/og?title=${encodeURIComponent("About | Amir Aliu")}&description=${encodeURIComponent(
          description
        )}`,
        width: 1200,
        height: 630,
        alt: "About Amir Aliu",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Amir Aliu",
    description,
    images: [
      `${baseUrl}/og?title=${encodeURIComponent("About | Amir Aliu")}&description=${encodeURIComponent(
        description
      )}`,
    ],
  },
  alternates: {
    canonical: `${baseUrl}/about`,
  },
};

function getExperienceYears() {
  const thisYear = new Date().getFullYear();
  const startYears = experience
    .map((item) => Number.parseInt(item.start, 10))
    .filter((value) => Number.isFinite(value));

  if (!startYears.length) return 0;

  const earliestYear = Math.min(...startYears);
  return Math.max(0, thisYear - earliestYear + 1);
}

export default function AboutPage() {
  const posts = getBlogListingPosts();
  const certificationCounts = countCertificationsByCategory(certifications);
  const experienceYears = getExperienceYears();

  const highlights = [
    { label: "Years Building", value: `${experienceYears}+` },
    { label: "Projects Shipped", value: `${projects.length}` },
    { label: "Professional Certs", value: `${certificationCounts.professional}` },
    { label: "CTF Credentials", value: `${certificationCounts.ctf}` },
    { label: "Published Posts", value: `${posts.length}` },
  ];

  const journey = [
    {
      period: "2013",
      title: "Started in hands-on support",
      summary: "Began with technical support and real-world troubleshooting in school environments.",
    },
    {
      period: "2018",
      title: "Moved into freelance development",
      summary: "Built and maintained websites for communities and SMB clients.",
    },
    {
      period: "2026",
      title: "Expanded into security communities",
      summary: "Contributed actively to KSAL Cyber Team, DEFCON Prishtina, and FLOSSK.",
    },
    {
      period: "2026",
      title: "Product and research focus",
      summary: "Building tools like writeupify while deepening vulnerability research and CTF work.",
    },
  ];

  const focusAreas = [
    {
      title: "Vulnerability Research",
      description:
        "Analyzing real systems, reproducing edge cases, and documenting impact with practical mitigation guidance.",
    },
    {
      title: "CTF and Offensive Practice",
      description:
        "Using CTF-style workflows to sharpen exploitation, forensics, and iterative problem-solving under pressure.",
    },
    {
      title: "Product Engineering",
      description:
        "Building and shipping products like writeupify.app end-to-end, from architecture to deployment, with secure defaults and maintainable code.",
    },
  ];

  const trustLinks = [
    { label: "GitHub", href: "https://github.com/amiraliuks", note: "Code and open-source work" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/amiraliu/", note: "Professional profile" },
    {
      label: "Hack The Box",
      href: "https://profile.hackthebox.com/profile/019c6c5f-08c7-7145-a968-c11ebb264445",
      note: "Hands-on labs and challenges",
    },
    { label: "TryHackMe", href: "https://tryhackme.com/p/amiraliu", note: "Learning paths and CTF practice" },
    { label: "Resume", href: "/amir-aliu-resume.pdf", note: "PDF version" },
  ];

  const currentInterests = [
    "CMS security",
    "Browser extension security",
    "CTF infrastructure",
    "Responsible disclosure",
    "Defensive tooling",
    "Writeup workflows",
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: `${baseUrl}/about`,
      },
    ],
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Amir Aliu",
    url: baseUrl,
    jobTitle: "Cybersecurity Practitioner and Full-Stack Developer",
    sameAs: trustLinks.filter((item) => item.href.startsWith("http")).map((item) => item.href),
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-20 pt-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <section className="rounded-none border border-border/70 bg-muted/20 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">About</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Amir Aliu</h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Cybersecurity practitioner and vulnerability researcher based in Gjilan, Kosovo. I focus on vulnerability research, bug bounty hunting, and offensive security with findings spanning CVE submissions, CMS vulnerabilities, and responsible disclosures across multiple platforms.
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          I am a participant of Kosovo Cyber Team 2026 and a core member of KSAL Cyber Team & KSAL Research Team, focusing on reverse engineering, web security, and CTF competition. 
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          I also founded writeupify.app, a collaborative platform for cybersecurity writeups and structured vulnerability documentation.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">Highlights</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {highlights.map((item) => (
            <article
              key={item.label}
              className="rounded-none border border-border/70 bg-muted/15 px-4 py-3"
            >
              <p className="text-xl font-semibold leading-none text-foreground">{item.value}</p>
              <p className="mt-2 text-[11px] uppercase tracking-wide text-muted-foreground">
                {item.label}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">Journey</h2>
        <div className="mt-4 space-y-4">
          {journey.map((milestone) => (
            <article
              key={`${milestone.period}-${milestone.title}`}
              className="rounded-none border border-border/70 bg-muted/10 p-4"
            >
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{milestone.period}</p>
              <h3 className="mt-1 text-sm font-semibold text-foreground">{milestone.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{milestone.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">Current Focus</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {focusAreas.map((area) => (
            <article
              key={area.title}
              className="rounded-none border border-border/70 bg-muted/15 p-4"
            >
              <h3 className="text-sm font-semibold text-foreground">{area.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-none border border-border/70 bg-muted/10 p-4">
        <h2 className="text-lg font-semibold tracking-tight">Current Interests</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          The areas I am actively sharpening through projects, research, writeups, and community work.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {currentInterests.map((interest) => (
            <span
              key={interest}
              className="rounded-none border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground"
            >
              {interest}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-10 border-t border-border/60 pt-8">
        <h2 className="text-2xl font-semibold tracking-tight">Technologies and Tools</h2>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          These reflect how I use each tool in real projects, not generic definitions.
        </p>
        <p className="mt-4 text-sm text-muted-foreground sm:text-base">Operating Systems</p>
        <TechStack techStack={operatingSystems} />
        <p className="mt-6 text-sm text-muted-foreground sm:text-base">Web and Software Development</p>
        <TechStack techStack={webdev} />
        <p className="mt-6 text-sm text-muted-foreground sm:text-base">Game Development</p>
        <TechStack techStack={gamedev} />
        <p className="mt-6 text-sm text-muted-foreground sm:text-base">Tools and Platforms</p>
        <TechStack techStack={tools} />
        <p className="mt-6 text-sm text-muted-foreground sm:text-base">Database and Storage</p>
        <TechStack techStack={database} />
        <p className="mt-6 text-sm text-muted-foreground sm:text-base">DevOps and Cloud</p>
        <TechStack techStack={devops} />
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">Trust and Profiles</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {trustLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group rounded-none border border-border/70 bg-muted/15 p-4 transition hover:bg-muted/30"
            >
              <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                {link.label}
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground transition group-hover:text-foreground" />
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{link.note}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}