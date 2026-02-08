import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";

import { projects } from "@/data/projects";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return notFound();

  const hasBadges = Array.isArray(project.badge) && project.badge.length > 0;
  const hasFeatures = Array.isArray(project.features) && project.features.length > 0;
  const hasGallery = Array.isArray(project.postImages) && project.postImages.length > 0;
  const hasLinks = Array.isArray(project.links) && project.links.length > 0;

  return (
    <section className="max-w-4xl mx-auto py-10 px-4 space-y-10">
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="rounded-xl shadow-lg w-full"
        />
      )}

      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>

        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Calendar className="h-4 w-4" />
          <span>{project.createdAt}</span>
        </div>
      </div>

      <p className="text-lg text-neutral-300 leading-relaxed max-w-2xl">
        {project.description}
      </p>

      {hasBadges && (
        <div className="flex flex-wrap gap-2">
          {project.badge!.map((b, i) => (
            <span
              key={i}
              className="
                px-3 py-1
                text-xs font-medium
                rounded-md
                bg-neutral-900
                text-neutral-200
                border border-neutral-800
              "
            >
              {b}
            </span>
          ))}
        </div>
      )}

      {hasFeatures && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Features</h2>
          <ul className="list-disc pl-6 space-y-1 text-neutral-300">
            {project.features!.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      )}

      {hasGallery && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Gallery</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.postImages!.map((media, idx) => {
              const isVideo =
                media.src.endsWith(".mp4") ||
                media.src.endsWith(".webm") ||
                media.src.endsWith(".mov");

              return (
                <figure key={idx} className="space-y-2">
                  {isVideo ? (
                    <video
                      src={media.src}
                      controls
                      className="rounded-lg shadow-lg w-full h-auto"
                    />
                  ) : (
                      <img
                        src={media.src}
                        alt={media.alt}
                        className="rounded-lg shadow-lg w-full h-auto object-cover"
                      />
                  )}

                  <figcaption className="text-sm text-neutral-400">
                    {media.caption}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      )}

      {hasLinks && (
        <div className="flex gap-3">
          {project.links!.map((link, i) => {
            const Icon = link.icon;
            return (
              <a
                key={i}
                href={link.href}
                target="_blank"
                className="
                  flex items-center gap-2
                  px-4 py-2 rounded-md
                  bg-white text-black font-medium
                  hover:bg-neutral-200 transition
                "
              >
                <Icon className="w-5 h-5" />
                {link.type}
              </a>
            );
          })}
        </div>
      )}
    </section>
  );
}