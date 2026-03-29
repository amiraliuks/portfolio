import Link from "next/link";
import Image from "next/image";
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

export default function ProjectsSection() {
  const sorted = [...projects].sort(
    (a, b) => parseProjectDate(b.createdAt).getTime() - parseProjectDate(a.createdAt).getTime()
  );

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {sorted.map((project) => (
        <Card
          key={project.id}
          className="
            group
            relative
            h-full
            overflow-hidden
            rounded-2xl
            border border-neutral-200/80
            bg-gradient-to-b from-neutral-50 to-neutral-100/60
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
          <div
            aria-hidden
            className="
              pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300
              group-hover:opacity-100
              bg-[radial-gradient(circle_at_80%_-20%,rgba(34,211,238,0.15),transparent_45%)]
            "
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
              />
            ) : (
              <div className="flex h-34 w-full items-center justify-center bg-muted text-xs text-muted-foreground sm:h-36">
                {project.title}
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
            <div className="absolute right-3 top-3 rounded-full border border-white/30 bg-black/35 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white/90 backdrop-blur-sm">
              Featured
            </div>
          </Link>

          <CardHeader className="space-y-2 px-4 pt-3 pb-0 sm:px-5">
            <time className="inline-flex w-fit rounded-full border border-neutral-200 bg-white/80 px-2 py-0.5 font-sans text-[10px] text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/70 dark:text-neutral-300">
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
                {project.badge.map((tag, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="
                      rounded-full
                      border-neutral-200
                      bg-white/70
                      px-2 py-0.5
                      text-[9px]
                      font-medium
                      text-neutral-700
                      dark:border-neutral-700
                      dark:bg-neutral-900/65
                      dark:text-neutral-200
                    "
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>

          <CardFooter className="px-4 pb-3 pt-1 sm:px-5">
            <div className="flex flex-row flex-wrap items-start gap-1.5">
              <Link href={`/projects/${project.slug}`}>
                <Badge
                  variant="outline"
                  className="
                    rounded-full
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
                return (
                  <Link href={lnk.href} target="_blank" rel="noopener noreferrer" key={idx}>
                    <Badge
                      variant="outline"
                      className="
                        flex gap-1.5
                        rounded-full
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

              {project.href && (
                <Link href={project.href} target="_blank" rel="noopener noreferrer">
                  <Badge
                    variant="outline"
                    className="
                      flex gap-1.5
                      rounded-full
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
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
