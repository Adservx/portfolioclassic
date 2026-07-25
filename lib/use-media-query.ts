"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe media query hook. Returns `false` until mounted, then tracks matches.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** True below the site's mobile layout breakpoint (md / 768px). */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 767.98px)");
}

/** True for touch-primary devices (phones, many tablets). */
export function useIsCoarsePointer(): boolean {
  return useMediaQuery("(hover: none) and (pointer: coarse)");
}
