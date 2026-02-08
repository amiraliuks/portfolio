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
import { Github } from "lucide-react";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  function parseDMY(dateStr: string) {
    const parts = dateStr.includes("/") ? dateStr.split("/") : dateStr.split("-");
    const [day, month, year] = parts.map(Number);
    return new Date(year, month - 1, day);
  }

  const sorted = [...projects].sort(
    (a, b) => parseDMY(b.createdAt).getTime() - parseDMY(a.createdAt).getTime()
  );

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {sorted.map((project) => (
        <Card
          key={project.id}
          className="flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full"
        >
          <Link href={`/projects/${project.slug}`} className="block cursor-pointer">
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
                  className="w-full h-40 object-contain bg-transparent"
              />
            ) : (
              <div className="h-44 w-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
                {project.title}
              </div>
            )}
          </Link>

          <CardHeader className="px-2">
            <CardTitle className="mt-1 text-base">
              {project.title}
            </CardTitle>

            <time className="font-sans text-xs">
              {project.createdAt}
            </time>

            <p className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
              {project.description}
            </p>
          </CardHeader>

          <CardContent className="mt-auto flex flex-col px-2">
            {project.badge?.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {project.badge.map((tag, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="px-1 py-0 text-[10px]"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>

          <CardFooter className="px-2">
            <div className="flex flex-row flex-wrap items-start gap-1">
              {project.links?.map((lnk, idx) => {
                const Icon = lnk.icon;
                return (
                  <Link href={lnk.href} target="_blank" key={idx}>
                    <Badge className="flex gap-2 px-2 py-1 text-[11px] rounded-md">
                      <Icon className="w-3 h-3" />
                      {lnk.type}
                    </Badge>
                  </Link>
                );
              })}

              {project.href && (
                <Link href={project.href} target="_blank">
                  <Badge className="flex gap-2 px-2 py-1 text-[10px]">
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