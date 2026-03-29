import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar } from "lucide-react";

import { projects } from "@/data/projects";
import { formatProjectDate } from "@/lib/utils";

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
  const featureItems = project.features ?? [];
  const galleryItems = project.postImages ?? [];
  const hasFeatures = featureItems.length > 0;
  const hasGallery = galleryItems.length > 0;
  const validLinks = (project.links || []).filter((link) => link.href?.trim().length);
  const hasLinks = validLinks.length > 0;

  return (
    <section className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-neutral-400 transition hover:bg-neutral-900 hover:text-neutral-200"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Projects
      </Link>

      <article className="overflow-hidden rounded-3xl border border-neutral-800/80 bg-gradient-to-b from-neutral-900/80 to-neutral-950/95 shadow-[0_30px_90px_-45px_rgba(56,189,248,0.35)]">
        {project.image ? (
          <div className="relative">
            <Image
              src={project.image}
              alt={project.title}
              width={1800}
              height={1000}
              className="h-64 w-full object-cover object-center md:h-80"
              sizes="(min-width: 1024px) 1080px, 100vw"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          </div>
        ) : (
          <div className="h-56 w-full bg-gradient-to-br from-neutral-900 to-neutral-800" />
        )}

        <div className="space-y-5 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full border border-neutral-700 bg-neutral-900/70 px-2.5 py-1 text-neutral-300">
              <Calendar className="h-3.5 w-3.5" />
              {formatProjectDate(project.createdAt)}
            </span>
            {hasBadges &&
              project.badge.slice(0, 4).map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-cyan-200"
                >
                  {tag}
                </span>
              ))}
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-neutral-100 sm:text-4xl">
            {project.title}
          </h1>

          <p className="max-w-3xl text-sm leading-relaxed text-neutral-300 sm:text-base">
            {project.description}
          </p>

          {hasLinks && (
            <div className="flex flex-wrap gap-2 pt-1">
              {validLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/70 px-3 py-1.5 text-xs font-medium text-neutral-200 transition hover:border-neutral-500 hover:bg-neutral-800"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {link.type}
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </article>

      <div className="grid gap-6 lg:grid-cols-3">
        {hasFeatures && (
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-neutral-950/60 p-5 sm:p-6">
            <h2 className="mb-4 text-lg font-semibold text-neutral-100">Key Features</h2>
            <ul className="space-y-2 text-sm text-neutral-300">
              {featureItems.map((feature, index) => (
                <li key={index} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {hasBadges && (
          <aside className="rounded-2xl border border-white/10 bg-neutral-950/60 p-5 sm:p-6">
            <h2 className="mb-4 text-lg font-semibold text-neutral-100">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.badge.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="rounded-full border border-white/10 bg-neutral-900/80 px-2.5 py-1 text-xs text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </aside>
        )}
      </div>

      {hasGallery && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-100">Gallery</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {galleryItems.map((media, index) => {
              const isVideo =
                media.src.endsWith(".mp4") ||
                media.src.endsWith(".webm") ||
                media.src.endsWith(".mov");

              return (
                <figure
                  key={index}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/70"
                >
                  {isVideo ? (
                    <video
                      src={media.src}
                      controls
                      preload="metadata"
                      className="h-auto w-full object-cover"
                    />
                  ) : (
                    <Image
                      src={media.src}
                      alt={media.alt}
                      width={1200}
                      height={800}
                      className="h-auto w-full object-cover"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  )}
                  <figcaption className="border-t border-white/10 px-4 py-3 text-sm text-neutral-400">
                    {media.caption}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>
      )}
    </section>
  );
}
