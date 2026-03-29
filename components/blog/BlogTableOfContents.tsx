"use client";

import { MouseEvent, useEffect, useMemo, useState } from "react";

import type { TableOfContentsItem } from "@/lib/blog-content";

interface BlogTableOfContentsProps {
  headings: TableOfContentsItem[];
}

export function BlogTableOfContents({ headings }: BlogTableOfContentsProps) {
  const [activeHeading, setActiveHeading] = useState<string>(headings[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  const headingIds = useMemo(() => headings.map((heading) => heading.id), [headings]);

  useEffect(() => {
    const firstId = headingIds[0];
    if (!firstId) return;

    const headingElements = headingIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!headingElements.length) return;

    const updateActiveHeading = () => {
      const marker = Math.max(120, window.innerHeight * 0.28);
      const isNearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

      if (isNearBottom) {
        const lastId = headingElements[headingElements.length - 1]?.id;
        if (!lastId) return;
        setActiveHeading((current) => (current === lastId ? current : lastId));
        return;
      }

      let nextActiveId = headingElements[0].id;
      let closestDistance = Number.POSITIVE_INFINITY;

      for (const element of headingElements) {
        const distanceToMarker = Math.abs(element.getBoundingClientRect().top - marker);
        if (distanceToMarker < closestDistance) {
          closestDistance = distanceToMarker;
          nextActiveId = element.id;
        }
      }

      setActiveHeading((current) => (current === nextActiveId ? current : nextActiveId));
    };

    updateActiveHeading();
    window.addEventListener("scroll", updateActiveHeading, { passive: true });
    window.addEventListener("resize", updateActiveHeading);

    return () => {
      window.removeEventListener("scroll", updateActiveHeading);
      window.removeEventListener("resize", updateActiveHeading);
    };
  }, [headingIds]);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      const content = document.querySelector<HTMLElement>('[data-blog-content="true"]');
      const scrollingElement = document.scrollingElement ?? document.documentElement;
      const scrollTop = scrollingElement.scrollTop || window.scrollY;
      const viewportHeight = window.innerHeight;

      if (!content) {
        const documentHeight = scrollingElement.scrollHeight - window.innerHeight;
        const nextProgress =
          documentHeight <= 0
            ? 0
            : Math.min(100, Math.max(0, (scrollTop / documentHeight) * 100));
        setProgress(nextProgress);
        return;
      }

      const contentTop = content.getBoundingClientRect().top + scrollTop;
      const contentHeight = content.offsetHeight;
      const viewportMarker = scrollTop + viewportHeight * 0.35;

      const start = contentTop;
      const end = Math.max(start + 1, contentTop + contentHeight - viewportHeight * 0.25);
      const nextProgress = Math.min(100, Math.max(0, ((viewportMarker - start) / (end - start)) * 100));

      setProgress(nextProgress);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const handleHeadingClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();

    const target = document.getElementById(id);
    if (!target) return;

    const offset = 116;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.history.replaceState(null, "", `#${id}`);
    window.scrollTo({ top, behavior: "smooth" });
    setActiveHeading(id);
  };

  if (!headings.length) return null;

  const roundedProgress = Math.round(progress);

  return (
    <aside className="hidden self-start xl:sticky xl:top-24 xl:block">
      <div className="max-h-[calc(100vh-7rem)] overflow-y-auto rounded-xl border border-border bg-card/40 p-4">
        <div className="mb-4 border-b border-border pb-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Reading
            </span>
            <span className="text-xs font-semibold tabular-nums text-foreground">
              {roundedProgress}%
            </span>
          </div>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          On This Page
        </p>

        <nav className="mt-3 space-y-1">
          {headings.map((heading) => {
            const isActive = activeHeading === heading.id;
            const levelSpacing =
              heading.level === 1 ? "pl-0" : heading.level === 2 ? "pl-3" : "pl-6";

            return (
              <a
                key={`${heading.id}-${heading.text}`}
                href={`#${heading.id}`}
                onClick={(event) => handleHeadingClick(event, heading.id)}
                className={[
                  "block cursor-pointer truncate rounded-md py-1.5 pr-1 text-sm transition-colors",
                  levelSpacing,
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
                title={heading.text}
              >
                {heading.text}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
