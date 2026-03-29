"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { ImageModal } from "@/components/image-modal";
import { tinyBlurDataURL } from "@/lib/image";

type MediaItem = {
  src: string;
  alt: string;
  caption: string;
};

interface ProjectMediaShowcaseProps {
  projectTitle: string;
  heroImage?: string;
  heroVideo?: string;
  heroAlt: string;
  galleryItems: MediaItem[];
  showHero?: boolean;
  showGallery?: boolean;
}

function isVideoSrc(src: string) {
  const lower = src.toLowerCase();
  return lower.endsWith(".mp4") || lower.endsWith(".webm") || lower.endsWith(".mov");
}

export function ProjectMediaShowcase({
  projectTitle,
  heroImage,
  heroVideo,
  heroAlt,
  galleryItems,
  showHero = true,
  showGallery = true,
}: ProjectMediaShowcaseProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const modalImages = useMemo(() => {
    const deduped = new Map<string, MediaItem>();

    const addImage = (item: MediaItem) => {
      const src = item.src.trim();
      if (!src || isVideoSrc(src)) return;
      if (!deduped.has(src)) deduped.set(src, item);
    };

    if (heroImage) {
      addImage({
        src: heroImage,
        alt: heroAlt,
        caption: "",
      });
    }

    galleryItems.forEach(addImage);
    return Array.from(deduped.values());
  }, [galleryItems, heroAlt, heroImage]);

  const hasHeroMedia = showHero && Boolean(heroVideo || heroImage);
  const hasGallery = showGallery && galleryItems.length > 0;

  const openModalForSrc = (src: string) => {
    const index = modalImages.findIndex((image) => image.src === src);
    if (index === -1) return;

    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  return (
    <>
      {hasHeroMedia && (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-card shadow-lg">
          {heroVideo ? (
            <video
              src={heroVideo}
              controls
              preload="metadata"
              className="h-full w-full object-cover"
            />
          ) : (
            <button
              type="button"
              aria-label="Open project cover image"
              onClick={() => openModalForSrc(heroImage!)}
              className="group relative block h-full w-full cursor-zoom-in"
            >
              <Image
                src={heroImage!}
                alt={heroAlt}
                fill
                priority
                className="object-cover transition-transform duration-200 group-hover:scale-[1.01]"
                sizes="(min-width: 1024px) 896px, 100vw"
                placeholder="blur"
                blurDataURL={tinyBlurDataURL}
              />
            </button>
          )}
        </div>
      )}

      {hasGallery && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Gallery</h2>

          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            {galleryItems.map((media, idx) => {
              const isVideo = isVideoSrc(media.src);

              return (
                <figure
                  key={`${media.src}-${idx}`}
                  className="overflow-hidden rounded-lg border border-border bg-card"
                >
                  <div className="relative aspect-[16/10] w-full bg-muted">
                    {isVideo ? (
                      <video
                        src={media.src}
                        controls
                        preload="metadata"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <button
                        type="button"
                        aria-label={`Open image: ${media.alt}`}
                        onClick={() => openModalForSrc(media.src)}
                        className="group relative block h-full w-full cursor-zoom-in"
                      >
                        <Image
                          src={media.src}
                          alt={media.alt}
                          fill
                          className="object-cover transition-transform duration-200 group-hover:scale-[1.01]"
                          sizes="(min-width: 768px) 50vw, 100vw"
                          placeholder="blur"
                          blurDataURL={tinyBlurDataURL}
                        />
                      </button>
                    )}
                  </div>

                  <figcaption className="border-t border-border px-3 py-2 text-sm text-muted-foreground">
                    {media.caption}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      )}

      {modalImages.length > 0 && (
        <ImageModal
          images={modalImages}
          currentIndex={currentImageIndex}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          projectTitle={projectTitle}
        />
      )}
    </>
  );
}
