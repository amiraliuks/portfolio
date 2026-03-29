import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";

import { ProjectMediaShowcase } from "@/components/ProjectMediaShowcase";
import { projects } from "@/data/projects";
import { formatProjectDate } from "@/lib/utils";

const MAX_FEATURES = 8;

function splitFeature(feature: string) {
  const [label, ...rest] = feature.split(" - ");
  const detail = rest.join(" - ").trim();

  if (!detail) return { label: null, detail: feature.trim() };
  return { label: label.trim(), detail };
}

function shortenFeature(feature: string, maxLength = 170) {
  if (feature.length <= maxLength) return feature;
  return `${feature.slice(0, maxLength - 3).trimEnd()}...`;
}

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

  const validLinks = (project.links || []).filter((link) => link.href?.trim().length);
  const featureItems = (project.features || []).filter(Boolean);
  const visibleFeatures = featureItems.slice(0, MAX_FEATURES);
  const galleryItems = project.postImages ?? [];

  const hasBadges = Array.isArray(project.badge) && project.badge.length > 0;
  const hasGallery = galleryItems.length > 0;
  const hasFeatures = visibleFeatures.length > 0;
  const hasLinks = validLinks.length > 0;
  const hiddenFeatureCount = Math.max(0, featureItems.length - visibleFeatures.length);

  return (
    <section className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:space-y-10">
      <ProjectMediaShowcase
        projectTitle={project.title}
        heroImage={project.image}
        heroVideo={project.video}
        heroAlt={project.title}
        galleryItems={[]}
        showGallery={false}
      />

      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</h1>

        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{formatProjectDate(project.createdAt)}</span>
        </div>

        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
          {project.description}
        </p>
      </div>

      {hasLinks && (
        <div className="flex flex-wrap gap-2.5">
          {validLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-2
                  rounded-md px-4 py-2
                  bg-primary text-primary-foreground font-medium
                  transition hover:bg-primary/90
                "
              >
                <Icon className="h-5 w-5" />
                {link.type}
              </a>
            );
          })}
        </div>
      )}

      {hasBadges && (
        <div className="flex flex-wrap gap-2">
          {project.badge!.map((b, i) => (
            <span
              key={i}
              className="
                rounded-md border border-border
                bg-muted/40 px-3 py-1
                text-xs font-medium text-foreground
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
          <ul className="space-y-2 text-muted-foreground">
            {visibleFeatures.map((feature, i) => {
              const condensed = shortenFeature(feature);
              const { label, detail } = splitFeature(condensed);

              return (
                <li key={i} className="flex gap-2.5 text-sm leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/70" />
                  <span>
                    {label ? <span className="font-medium text-foreground">{label}: </span> : null}
                    <span>{detail}</span>
                  </span>
                </li>
              );
            })}
          </ul>
          {hiddenFeatureCount > 0 && (
            <p className="text-xs text-muted-foreground">
              +{hiddenFeatureCount} more feature{hiddenFeatureCount > 1 ? "s" : ""} in internal notes.
            </p>
          )}
        </div>
      )}

      {hasGallery && (
        <ProjectMediaShowcase
          projectTitle={project.title}
          heroAlt={project.title}
          galleryItems={galleryItems}
          showHero={false}
        />
      )}

    </section>
  );
}
