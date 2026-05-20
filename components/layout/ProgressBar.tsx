'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';

export function ProgressBar() {
  const pathname = usePathname();
  const [isPending, setIsPending] = useState(false);
  const fallbackTimer = useRef<number | null>(null);

  const stopProgress = useCallback(() => {
    if (fallbackTimer.current !== null) {
      window.clearTimeout(fallbackTimer.current);
      fallbackTimer.current = null;
    }

    NProgress.done();
    setIsPending(false);
  }, []);

  useEffect(() => {
    NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.1 });
  }, []);

  useEffect(() => {
    stopProgress();
  }, [pathname, stopProgress]);

  useEffect(() => {
    const handleClick = (event: globalThis.MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as Element | null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");

      if (!anchor || (anchor.target && anchor.target !== "_self") || anchor.hasAttribute("download")) {
        return;
      }

      const nextUrl = new URL(anchor.href, window.location.href);
      const currentUrl = new URL(window.location.href);

      if (nextUrl.origin !== currentUrl.origin) return;
      if (nextUrl.pathname === currentUrl.pathname && nextUrl.search === currentUrl.search) return;

      NProgress.start();
      setIsPending(true);

      if (fallbackTimer.current !== null) {
        window.clearTimeout(fallbackTimer.current);
      }

      fallbackTimer.current = window.setTimeout(() => {
        setIsPending(false);
        NProgress.done();
        fallbackTimer.current = null;
      }, 10000);
    };

    document.addEventListener("click", handleClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      if (fallbackTimer.current !== null) {
        window.clearTimeout(fallbackTimer.current);
      }
    };
  }, []);

  if (!isPending) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 border border-border bg-background/95 px-3 py-2 text-xs text-muted-foreground shadow-lg backdrop-blur">
      <span className="h-2 w-2 animate-pulse rounded-full bg-foreground" />
      <span>Opening page...</span>
    </div>
  );
}