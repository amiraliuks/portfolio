"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiTryhackme } from "react-icons/si";
import { ResumeSheet } from "./ResumeSheet";

import Experience from "./Experience";
import Education from "./Education";

const Typewriter = dynamic(() => import("typewriter-effect"), {
  ssr: false,
  loading: () => <span className="text-2xl">Full Stack Developer</span>,
});

export default function MainContent() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is Amir Aliu?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Amir Aliu is a full-stack developer from Kosovo who builds applications across web, game, and software development — with strong interests in cybersecurity and networking.",
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
        <main className="grow px-4 max-w-3xl mx-auto py-4">
          <h1 className="text-4xl font-bold mb-4">Amir Aliu</h1>

          <div className="text-xl sm:text-2xl text-muted-foreground font-medium h-8 flex items-center mb-8">
            <span className="mr-2 text-foreground/50">{">"}</span>
            <Typewriter
              options={{
                strings: [
                  "Full Stack Developer",
                  "Cybersecurity Enthusiast",
                  "Privacy Advocate",
                  "IT & Networking Learner",
                  "Game Development Hobbyist",
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
            I&apos;m a full-stack developer who enjoys building practical, reliable web applications. I work across both the frontend and backend, which lets me put together smooth user experiences backed by solid, well-structured systems.
          </p>

          {/* Resume & socials */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <ResumeSheet />

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" asChild>
                <a href="https://www.linkedin.com/in/amiraliu/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="h-5 w-5" />
                </a>
              </Button>

              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" asChild>
                <a href="https://github.com/AmirAliuA" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>

              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" asChild>
                <a href="https://tryhackme.com/p/amiraliu" target="_blank" rel="noopener noreferrer">
                  <SiTryhackme className="h-5 w-5" />
                </a>
              </Button>

              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" asChild>
                <a href="https://X.com/amiraliudev" target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </main>

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