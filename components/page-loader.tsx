"use client";

import { useEffect, useRef, useState } from "react";

const PROGRESS_DURATION = 1400;

export function PageLoader() {
  const [done, setDone] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let cancelled = false;
    const start = performance.now();

    const tick = (now: number) => {
      if (cancelled) return;
      const t = Math.min((now - start) / PROGRESS_DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);

      bar.style.transform = `scaleX(${eased})`;

      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };
    frameRef.current = requestAnimationFrame(tick);

    const finish = () => {
      if (cancelled) return;
      cancelled = true;
      cancelAnimationFrame(frameRef.current);

      bar.style.transform = "scaleX(1)";

      requestAnimationFrame(() => {
        bar.style.transition = "opacity 300ms ease";
        bar.style.opacity = "0";
        setTimeout(() => setDone(true), 400);
      });
    };

    if (document.readyState === "complete") {
      const elapsed = performance.now() - start;
      if (elapsed < PROGRESS_DURATION) {
        setTimeout(finish, PROGRESS_DURATION - elapsed);
      } else {
        finish();
      }
    } else {
      const onLoad = () => {
        const elapsed = performance.now() - start;
        if (elapsed < PROGRESS_DURATION) {
          setTimeout(finish, PROGRESS_DURATION - elapsed);
        } else {
          finish();
        }
      };
      window.addEventListener("load", onLoad);
      return () => {
        cancelled = true;
        cancelAnimationFrame(frameRef.current);
        window.removeEventListener("load", onLoad);
      };
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[2px] bg-ink z-[60] origin-left"
      style={{ transformOrigin: "left center", transform: "scaleX(0)" }}
    />
  );
}
