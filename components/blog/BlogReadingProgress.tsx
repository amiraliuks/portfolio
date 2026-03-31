"use client";

import { useEffect, useState } from "react";

export function BlogReadingProgress() {
  const [progress, setProgress] = useState(0);

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
      const contentBottom = contentTop + contentHeight;
      const viewportBottom = scrollTop + viewportHeight;

      if (viewportBottom >= contentBottom - 2) {
        setProgress(100);
        return;
      }

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

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-1">
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
