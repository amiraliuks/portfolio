"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Minus, Plus, RotateCcw, X } from "lucide-react";

import { cn } from "@/lib/utils";

type ActiveImage = {
  src: string;
  alt: string;
};

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const SCALE_STEP = 0.5;

export function MDXImageLightbox({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [activeImage, setActiveImage] = useState<ActiveImage | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragStartRef = useRef<{ x: number; y: number; startX: number; startY: number } | null>(
    null
  );

  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const closeViewer = () => {
    setActiveImage(null);
    resetView();
  };

  const zoomIn = () => {
    setScale((current) => Math.min(MAX_SCALE, current + SCALE_STEP));
  };

  const zoomOut = () => {
    setScale((current) => {
      const next = Math.max(MIN_SCALE, current - SCALE_STEP);
      if (next === MIN_SCALE) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!activeImage) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeViewer();
      }

      if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        zoomIn();
      }

      if (event.key === "-") {
        event.preventDefault();
        zoomOut();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeImage]);

  const viewer =
    activeImage && isMounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[9999] flex flex-col bg-background/95 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={`Image viewer: ${activeImage.alt}`}
          >
            <div className="flex items-center justify-between gap-3 border-b border-border bg-background px-3 py-2 sm:px-4">
              <p className="min-w-0 truncate text-sm font-medium text-foreground">
                {activeImage.alt}
              </p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={zoomOut}
                  className="border border-border px-2 py-1 text-muted-foreground transition hover:bg-accent hover:text-foreground"
                  aria-label="Zoom out"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-14 border border-border px-2 py-1 text-center font-mono text-xs text-muted-foreground">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={zoomIn}
                  className="border border-border px-2 py-1 text-muted-foreground transition hover:bg-accent hover:text-foreground"
                  aria-label="Zoom in"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={resetView}
                  className="border border-border px-2 py-1 text-muted-foreground transition hover:bg-accent hover:text-foreground"
                  aria-label="Reset zoom"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={closeViewer}
                  className="border border-border px-2 py-1 text-muted-foreground transition hover:bg-accent hover:text-foreground"
                  aria-label="Close image viewer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div
              className="relative flex flex-1 touch-none items-center justify-center overflow-hidden bg-black/85"
              onPointerDown={(event) => {
                if (scale <= 1) return;
                event.currentTarget.setPointerCapture(event.pointerId);
                dragStartRef.current = {
                  x: event.clientX,
                  y: event.clientY,
                  startX: position.x,
                  startY: position.y,
                };
              }}
              onPointerMove={(event) => {
                const dragStart = dragStartRef.current;
                if (!dragStart) return;

                setPosition({
                  x: dragStart.startX + event.clientX - dragStart.x,
                  y: dragStart.startY + event.clientY - dragStart.y,
                });
              }}
              onPointerUp={() => {
                dragStartRef.current = null;
              }}
              onPointerCancel={() => {
                dragStartRef.current = null;
              }}
              onWheel={(event) => {
                event.preventDefault();
                if (event.deltaY < 0) zoomIn();
                if (event.deltaY > 0) zoomOut();
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                draggable={false}
                className={cn(
                  "max-h-full max-w-full select-none object-contain transition-transform duration-100",
                  scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
                )}
                style={{
                  backgroundColor: "white",
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                }}
                onClick={() => {
                  if (scale === 1) zoomIn();
                }}
              />
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <div
      className="[&_img]:cursor-zoom-in"
      onClickCapture={(event) => {
        const target = event.target;
        if (!(target instanceof HTMLImageElement)) return;

        const src = target.currentSrc || target.src;
        if (!src) return;

        event.preventDefault();
        event.stopPropagation();
        resetView();
        setActiveImage({ src, alt: target.alt || "Image" });
      }}
    >
      {children}
      {viewer}
    </div>
  );
}