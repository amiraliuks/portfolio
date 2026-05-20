"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiHackthebox, SiTryhackme } from "react-icons/si";
import { ResumeSheet } from "@/components/media/ResumeSheet";
import { trackEvent } from "@/lib/analytics";
import { formatDate } from "@/lib/utils";

import Experience from "./Experience";
import Education from "./Education";

const Typewriter = dynamic(() => import("typewriter-effect"), {
  ssr: false,
  loading: () => <span className="text-2xl">Full Stack Developer</span>,
});

type HomeMetric = {
  label: string;
  value: number;
  href?: string;
};

type FeaturedPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
};

interface MainContentProps {
  metrics: HomeMetric[];
  featuredPosts: FeaturedPost[];
}

export default function MainContent({ metrics, featuredPosts }: MainContentProps) {
  const handleExternalClick = (target: string) => {
    trackEvent("external_link_click", {
      section: "home_hero",
      target,
    });
  };

  const handleInternalClick = (target: string) => {
    trackEvent("internal_navigation_click", {
      section: "home_hero",
      target,
    });
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is Amir Aliu?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cybersecurity practitioner and vulnerability researcher based in Gjilan, Kosovo, focused on offensive security, reverse engineering, and web security.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="flex flex-col">
        <section aria-labelledby="home-title" className="grow px-4 max-w-3xl mx-auto py-4">
          <h1 id="home-title" className="text-4xl font-bold mb-4">Amir Aliu</h1>

          <div className="text-xl sm:text-2xl text-muted-foreground font-medium h-8 flex items-center mb-8">
            <span className="mr-2 text-foreground/50">{">"}</span>
            <Typewriter
              options={{
                strings: [
                  "Full Stack Developer",
                  "Cybersecurity Student",
                  "Reverse Engineering Student",
                  "Vulnerability Researcher",
                  "Privacy Advocate",
                  "CTF Player",
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
                cursor: "_",
              }}
            />
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Cybersecurity practitioner and vulnerability researcher based in Gjilan, Kosovo,
            focused on offensive security, reverse engineering, and web security.
          </p>

          {/* Resume & socials */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <ResumeSheet />

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" asChild>
                <a
                  href="https://www.linkedin.com/in/amiraliu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open LinkedIn profile"
                  onClick={() => handleExternalClick("linkedin")}
                >
                  <FaLinkedin className="h-5 w-5" />
                </a>
              </Button>

              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" asChild>
                <a
                  href="https://github.com/amiraliuks"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open GitHub profile"
                  onClick={() => handleExternalClick("github")}
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>

              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" asChild>
                <a
                  href="https://tryhackme.com/p/amiraliu"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open TryHackMe profile"
                  onClick={() => handleExternalClick("tryhackme")}
                >
                  <SiTryhackme className="h-5 w-5" />
                </a>
              </Button>

              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" asChild>
                <a
                  href="https://profile.hackthebox.com/profile/019c6c5f-08c7-7145-a968-c11ebb264445"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Hack The Box profile"
                  onClick={() => handleExternalClick("hack_the_box")}
                >
                  <SiHackthebox className="h-5 w-5" />
                </a>
              </Button>

              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" asChild>
                <a
                  href="https://X.com/amiraliudev"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open X profile"
                  onClick={() => handleExternalClick("x")}
                >
                  <FaTwitter className="h-5 w-5" />
                </a>
              </Button>

            </div>
          </div>

          {metrics.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Snapshot
              </h2>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {metrics.map((metric) => {
                  const content = (
                    <>
                      <p className="text-lg font-semibold leading-tight text-foreground">{metric.value}</p>
                      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                        {metric.label}
                      </p>
                    </>
                  );

                  if (metric.href) {
                    return (
                      <Link
                        key={metric.label}
                        href={metric.href}
                        className="rounded-none border border-border/70 bg-muted/20 px-3 py-2 transition hover:bg-accent/30"
                        onClick={() => handleInternalClick(metric.href as string)}
                      >
                        {content}
                      </Link>
                    );
                  }

                  return (
                    <div
                      key={metric.label}
                      className="rounded-none border border-border/70 bg-muted/20 px-3 py-2"
                    >
                      {content}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {featuredPosts.length > 0 && (
            <section className="mt-10">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Featured Posts
                </h2>
                <Link
                  href="/blog"
                  className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  onClick={() => handleInternalClick("/blog")}
                >
                  View all posts
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {featuredPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="rounded-none border border-border/70 bg-muted/15 p-3 transition hover:bg-accent/30"
                    onClick={() => {
                      handleInternalClick(`/blog/${post.slug}`);
                      trackEvent("blog_post_open", { source: "home_featured", slug: post.slug });
                    }}
                  >
                    <p className="line-clamp-2 text-sm font-medium text-foreground">{post.title}</p>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{post.description}</p>
                    <p className="mt-2 text-[11px] text-muted-foreground">
                      {formatDate(post.publishedAt)} | {post.readingTime} min
                    </p>
                    {post.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {post.tags.map((tag) => (
                          <span
                            key={`${post.slug}-${tag}`}
                            className="rounded-none border border-border/70 px-2 py-0.5 text-[10px] text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </section>

        {/* Experience */}
        <section className="mt-24 space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-lg font-semibold tracking-tight text-foreground/90">
              Experience
            </h2>
            <div className="h-px bg-border/40 flex-1" />
          </div>
        </section>

        <Experience />

        {/* Education */}
        <div className="mt-16 flex items-center gap-3 mb-6">
          <h2 className="text-lg font-semibold tracking-tight text-foreground/90">
            Education
          </h2>
          <div className="h-px bg-border/40 flex-1" />
        </div>

        <Education />
      </div>
    </>
  );
}