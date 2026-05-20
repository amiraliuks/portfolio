"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/data/projects";
import { formatProjectDate, parseProjectDate } from "@/lib/utils";
import { toSafeHref } from "@/lib/url-safety";
import { tinyBlurDataURL } from "@/lib/image";

const baseUrl = "https://amiraliu.vercel.app";
const projectFilterTags = [
  "Web Development",
  "Software Development",
  "Game Development",
  "Browser Extension Development",
  "Mobile Development",
  "Machine Learning",
  "Game Modding",
  "Hardware",
  "Security",
  "Automation",
  "Reverse Engineering",
];
const MAX_VISIBLE_BADGES = 5;

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const sorted = useMemo(
    () =>
      [...projects].sort(
        (a, b) => parseProjectDate(b.createdAt).getTime() - parseProjectDate(a.createdAt).getTime()
      ),
    []
  );
  const availableFilters = projectFilterTags
    .map((tag) => ({
      tag,
      count: sorted.filter((project) => project.badge.includes(tag)).length,
    }))
    .filter((filter) => filter.count > 0);
  const filteredProjects = sorted.filter(
    (project) => activeFilter === "all" || project.badge.includes(activeFilter)
  );

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap gap-1.5 border-b border-border/60 pb-3">
        <button
          type="button"
          onClick={() => setActiveFilter("all")}
          aria-pressed={activeFilter === "all"}
          className={`shrink-0 rounded-none border px-2.5 py-1 text-xs transition ${
            activeFilter === "all"
              ? "border-foreground bg-foreground text-background"
              : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          All <span className="text-[11px] opacity-70">{sorted.length}</span>
        </button>

        {availableFilters.map(({ tag, count }) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveFilter(tag)}
            aria-pressed={activeFilter === tag}
            className={`shrink-0 rounded-none border px-2.5 py-1 text-xs transition ${
              activeFilter === tag
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {tag} <span className="text-[11px] opacity-70">{count}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filteredProjects.map((project, index) => (
          <Card
            key={project.id}
            className="
            group
            relative
            h-full
            overflow-hidden
            rounded-none
            border border-neutral-200/80
            bg-linear-to-b from-neutral-50 to-neutral-100/60
            py-0
            shadow-[0_16px_40px_-28px_rgba(2,6,23,0.35)]
            transition-all duration-300 ease-out
            hover:-translate-y-1
            hover:border-neutral-300
            hover:shadow-[0_26px_70px_-35px_rgba(2,6,23,0.5)]
            dark:border-neutral-800/90
            dark:from-neutral-900/95
            dark:to-neutral-950/95
            dark:hover:border-neutral-700
            dark:hover:shadow-[0_30px_80px_-35px_rgba(6,182,212,0.25)]
          "
          >
            {(() => {
              const categoryTags = project.badge.filter((tag) => projectFilterTags.includes(tag));
              const stackTags = project.badge.filter((tag) => !projectFilterTags.includes(tag));
              const visibleTags = [...categoryTags, ...stackTags].slice(0, MAX_VISIBLE_BADGES);
              const hiddenTagCount = Math.max(0, project.badge.length - visibleTags.length);

              return (
                <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_-20%,rgba(34,211,238,0.15),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />

          <Link href={`/projects/${project.slug}`} className="relative block cursor-pointer overflow-hidden border-b border-neutral-200/80 dark:border-neutral-800/80">
            {project.video ? (
              <video
                src={project.video}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="pointer-events-none mx-auto h-34 w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] sm:h-36"
              />
            ) : project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                width={500}
                height={300}
                sizes="(min-width: 768px) 50vw, 100vw"
                quality={82}
                className="h-34 w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03] sm:h-36"
                placeholder="blur"
                blurDataURL={tinyBlurDataURL}
                priority={index < 2}
              />
            ) : (
              <div className="flex h-34 w-full items-center justify-center bg-muted text-xs text-muted-foreground sm:h-36">
                {project.title}
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/15 to-transparent" />
            <div className="absolute right-3 top-3 rounded-none border border-white/30 bg-black/35 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white/90 backdrop-blur-sm">
              Featured
            </div>
          </Link>

          <CardHeader className="space-y-2 px-4 pt-3 pb-0 sm:px-5">
            <time className="inline-flex w-fit rounded-none border border-neutral-200 bg-white/80 px-2 py-0.5 font-sans text-[10px] text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/70 dark:text-neutral-300">
              {formatProjectDate(project.createdAt)}
            </time>

            <CardTitle className="line-clamp-2 text-base leading-tight">
              {project.title}
            </CardTitle>

            <p className="line-clamp-5 font-sans text-[13px] leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </CardHeader>

          <CardContent className="mt-auto flex flex-col px-4 pb-1 sm:px-5">
            {project.badge?.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-1">
                {visibleTags.map((tag) => {
                  const isCategory = projectFilterTags.includes(tag);

                  return (
                  <Badge
                    key={tag}
                    variant="outline"
                    className={`rounded-none px-2 py-0.5 text-[9px] font-medium ${
                      isCategory
                        ? "border-neutral-400 bg-neutral-900 text-white dark:border-neutral-500 dark:bg-neutral-100 dark:text-neutral-950"
                        : "border-neutral-200 bg-white/70 text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900/65 dark:text-neutral-200"
                    }`}
                  >
                    {tag}
                  </Badge>
                  );
                })}
                {hiddenTagCount > 0 && (
                  <Badge
                    variant="outline"
                    className="rounded-none border-neutral-200 bg-white/70 px-2 py-0.5 text-[9px] font-medium text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900/65 dark:text-neutral-400"
                  >
                    +{hiddenTagCount}
                  </Badge>
                )}
              </div>
            )}
          </CardContent>

          <CardFooter className="px-4 pb-3 pt-1 sm:px-5">
            <div className="flex flex-row flex-wrap items-start gap-1.5">
              <Link href={`/projects/${project.slug}`}>
                <Badge
                  variant="outline"
                  className="
                    rounded-none
                    border-neutral-300
                    bg-white
                    px-2.5 py-1
                    text-[10px] font-semibold
                    text-neutral-800
                    transition-colors
                    hover:bg-neutral-100
                    dark:border-neutral-700
                    dark:bg-neutral-900
                    dark:text-neutral-100
                    dark:hover:bg-neutral-800
                  "
                >
                  Open Project
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Badge>
              </Link>

              {project.links?.map((lnk, idx) => {
                const Icon = lnk.icon;
                const safeHref = toSafeHref(lnk.href, baseUrl);
                if (!safeHref) return null;
                return (
                  <Link href={safeHref} target="_blank" rel="noopener noreferrer" key={idx}>
                    <Badge
                      variant="outline"
                      className="
                        flex gap-1.5
                        rounded-none
                        border-neutral-300
                        bg-white/80
                        px-2.5 py-1
                        text-[10px]
                        text-neutral-700
                        transition-colors
                        hover:bg-neutral-100
                        dark:border-neutral-700
                        dark:bg-neutral-900/75
                        dark:text-neutral-100
                        dark:hover:bg-neutral-800
                      "
                    >
                      <Icon className="w-3 h-3" />
                      {lnk.type}
                    </Badge>
                  </Link>
                );
              })}

              {(() => {
                const safeProjectHref = project.href ? toSafeHref(project.href, baseUrl) : null;
                if (!safeProjectHref) return null;

                return (
                  <Link
                    href={safeProjectHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Badge
                      variant="outline"
                      className="
                        flex gap-1.5
                        rounded-none
                        border-neutral-300
                        bg-white/80
                        px-2.5 py-1
                        text-[10px]
                        text-neutral-700
                        transition-colors
                        hover:bg-neutral-100
                        dark:border-neutral-700
                        dark:bg-neutral-900/75
                        dark:text-neutral-100
                        dark:hover:bg-neutral-800
                      "
                    >
                      <Github className="w-3 h-3" /> Source
                    </Badge>
                  </Link>
                );
              })()}
            </div>
          </CardFooter>
                </>
              );
            })()}
        </Card>
      ))}
      </div>
    </section>
  );
}