import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar } from "lucide-react";

import { ProjectMediaShowcase } from "@/components/media/ProjectMediaShowcase";
import { projects } from "@/data/projects";
import { formatProjectDate } from "@/lib/utils";
import { toSafeHref, toSafeHttpUrl } from "@/lib/url-safety";
import { baseUrl } from "@/app/sitemap";

const MAX_FEATURES = 8;
const IMAGE_FILE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif", ".svg"];

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

function toAbsoluteProjectImageUrl(image?: string) {
  if (!image) return undefined;
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return toSafeHttpUrl(image);
  }

  const absolute = image.startsWith("/") ? `${baseUrl}${image}` : `${baseUrl}/${image}`;
  return toSafeHttpUrl(absolute);
}

function isLikelyImagePath(value?: string) {
  if (!value) return false;
  const withoutQuery = value.split("?")[0]?.toLowerCase() ?? "";
  return IMAGE_FILE_EXTENSIONS.some((extension) => withoutQuery.endsWith(extension));
}

function getProjectOgImage(project: (typeof projects)[number]) {
  if (isLikelyImagePath(project.image)) {
    return toAbsoluteProjectImageUrl(project.image);
  }

  const galleryImage = project.postImages?.find((item) => isLikelyImagePath(item.src))?.src;
  return toAbsoluteProjectImageUrl(galleryImage);
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const absoluteImage = getProjectOgImage(project);
  const topStack = project.badge?.slice(0, 3).join(", ");
  const safeDescription = topStack
    ? `${project.description} Built with ${topStack}.`
    : project.description;
  const socialDescription =
    safeDescription.length > 180 ? `${safeDescription.slice(0, 177).trimEnd()}...` : safeDescription;
  const pageUrl = `${baseUrl}/projects/${project.slug}`;
  const ogTitle = `${project.title} | Project | Amir Aliu`;

  const ogImage =
    absoluteImage ??
    `${baseUrl}/og?title=${encodeURIComponent(ogTitle)}&description=${encodeURIComponent(
      socialDescription
    )}`;

  return {
    title: project.title,
    description: safeDescription,
    keywords: project.badge,
    openGraph: {
      title: ogTitle,
      description: socialDescription,
      url: pageUrl,
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${project.title} project preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: socialDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return notFound();

  const validLinks = (project.links || [])
    .map((link) => ({
      ...link,
      safeHref: toSafeHref(link.href, baseUrl),
    }))
    .filter((link) => Boolean(link.safeHref));
  const featureItems = (project.features || []).filter(Boolean);
  const visibleFeatures = featureItems.slice(0, MAX_FEATURES);
  const galleryItems = project.postImages ?? [];

  const hasBadges = Array.isArray(project.badge) && project.badge.length > 0;
  const hasGallery = galleryItems.length > 0;
  const hasFeatures = visibleFeatures.length > 0;
  const hasLinks = validLinks.length > 0;
  const hiddenFeatureCount = Math.max(0, featureItems.length - visibleFeatures.length);
  const pageUrl = `${baseUrl}/projects/${project.slug}`;
  const absoluteImage = getProjectOgImage(project);

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.description,
    codeRepository: project.links?.find((link) => /source|github/i.test(link.type))?.href,
    dateCreated: project.createdAt,
    url: pageUrl,
    image: absoluteImage,
    author: {
      "@type": "Person",
      name: "Amir Aliu",
      url: baseUrl,
    },
  };

  return (
    <section className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectSchema),
        }}
      />

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

        <div className="inline-flex items-center gap-2 rounded-none border border-border bg-muted/40 px-3 py-1 text-sm text-muted-foreground">
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
                href={link.safeHref!}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-2
                  rounded-none px-4 py-2
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
                rounded-none border border-border
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
      <aside className="rounded-none border border-border/70 bg-muted/20 p-4 sm:p-5">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Explore More</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href="/blog"
            className="rounded-none border border-border px-3 py-1 text-xs text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
          >
            Read Related Writeups
          </Link>
          <Link
            href="/certifications"
            className="rounded-none border border-border px-3 py-1 text-xs text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
          >
            View Certifications
          </Link>
          <Link
            href="/projects"
            className="rounded-none border border-border px-3 py-1 text-xs text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
          >
            Back to Projects
          </Link>
        </div>
      </aside>

    </section>
  );
}