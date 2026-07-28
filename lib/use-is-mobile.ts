"use client";

import { useEffect, useState } from "react";

/**
 * True when viewport is below the mobile breakpoint (768px).
 * Defaults to false on SSR; resolves after mount.
 * Prefer useCanParallax when gating expensive scroll effects —
 * that starts disabled until desktop is confirmed.
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

/**
 * Whether scroll-linked parallax / continuous motion should run.
 * Starts false (safe for mobile + SSR), then enables only on desktop
 * after mount. Avoids first-paint parallax and mobile scroll jank.
 */
export function useCanParallax(breakpoint = 768): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setEnabled(!mq.matches && !reduce.matches);
    };
    update();

    mq.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, [breakpoint]);

  return enabled;
}
