import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  function parseDMY(dateStr: string) {
    const parts = dateStr.includes("/")
      ? dateStr.split("/")
      : dateStr.split("-");
    const [day, month, year] = parts.map(Number);
    return new Date(year, month - 1, day);
  }

  const sorted = [...projects].sort((a, b) => {
    return parseDMY(b.createdAt).getTime() - parseDMY(a.createdAt).getTime();
  });

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {sorted.map((project) => (
        <div key={project.id} className="relative group">
          <Link
            href={`/projects/${project.slug}`}
            className="absolute inset-0 z-10"
          />

          <Card className="flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full">

            {/* Media (same height as old card: h-40) */}
            {project.video ? (
              <video
                src={project.video}
                autoPlay
                loop
                muted
                playsInline
                className="pointer-events-none mx-auto h-40 w-full object-cover object-top"
              />
            ) : project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                width={500}
                height={300}
                className="h-40 w-full object-cover object-top"
              />
            ) : (
              <div className="h-40 w-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
                {project.title} Preview
              </div>
            )}

            {/* CONTENT — matched 1:1 with the OLD card */}
            <div className="px-2 pt-3 pb-2">
              <div className="space-y-1">

                {/* Title */}
                <h3 className="text-base font-semibold">{project.title}</h3>

                {/* Date */}
                <time className="text-xs font-sans">{project.createdAt}</time>

                {/* Description like old card (smaller + muted) */}
                <p className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert mt-2">
                  {project.description}
                </p>
              </div>

              {/* Tags (same tiny badges as old card) */}
              {project.badge && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {project.badge.map((tag, i) => (
                    <Badge
                      key={i}
                      className="px-1 py-0 text-[10px]"
                      variant="secondary"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="px-2 pb-2 flex flex-row flex-wrap gap-1">
              {project.links?.map((link, idx) => {
                const Icon = link.icon;
                return (
                  <Link href={link.href} key={idx} target="_blank">
                    <Badge className="flex gap-2 px-2 py-1 text-[10px]">
                      <Icon className="w-3 h-3" />
                      {link.type}
                    </Badge>
                  </Link>
                );
              })}

              {project.href && (
                <Link href={project.href} target="_blank">
                  <Badge className="flex items-center gap-1 px-2 py-1 text-[10px]">
                    <Github className="h-3 w-3" /> Source
                  </Badge>
                </Link>
              )}
            </div>
          </Card>
        </div>
      ))}
    </section>
  );
}
