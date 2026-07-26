"use client";

import { useEffect, useState } from "react";
import { useIsMobile } from "@/lib/use-media-query";
import { useReducedMotion } from "@/lib/use-reduced-motion";

interface Mote {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  drift: number;
  color: "ink" | "gold" | "oxblood";
}

const COLORS = {
  ink: "rgba(0, 0, 0, 0.35)",
  gold: "rgba(68, 68, 68, 0.4)",
  oxblood: "rgba(0, 0, 0, 0.3)",
};

function generateMoteseed(count: number, seed: number): Mote[] {
  const random = (i: number) => {
    const x = Math.sin(seed * 9301 + i * 49297) * 233280;
    return x - Math.floor(x);
  };
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: random(i) * 100,
    size: 1 + random(i + 1) * 2.5,
    delay: random(i + 2) * 20,
    duration: 18 + random(i + 3) * 22,
    opacity: 0.3 + random(i + 4) * 0.5,
    drift: (random(i + 5) - 0.5) * 80,
    color: (["ink", "gold", "oxblood"] as const)[Math.floor(random(i + 6) * 3)],
  }));
}

export function InkMotes({
  count = 24,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const isMobile = useIsMobile();
  const prefersReduced = useReducedMotion();
  const [moteseed, setMoteseed] = useState<Mote[]>([]);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);

  // Keep the field alive on phones — slightly fewer motes, same motion language
  const effectiveCount = prefersReduced
    ? 0
    : isMobile
      ? Math.min(count, 14)
      : count;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || effectiveCount === 0) {
      setMoteseed([]);
      return;
    }
    setMoteseed(
      generateMoteseed(effectiveCount, Math.floor(Math.random() * 100000))
    );
  }, [mounted, effectiveCount]);

  // Pause CSS work when the tab is hidden (saves mobile battery; resumes instantly)
  useEffect(() => {
    const onVis = () => setVisible(document.visibilityState === "visible");
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  if (!mounted || prefersReduced || moteseed.length === 0) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 overflow-hidden ${className}`}
      style={{
        zIndex: 1,
        contain: "strict",
      }}
    >
      {moteseed.map((m) => (
        <span
          key={m.id}
          className="absolute bottom-0 rounded-full ink-mote"
          style={{
            left: `${m.left}%`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            background: COLORS[m.color],
            boxShadow: `0 0 ${m.size * 3}px ${COLORS[m.color]}`,
            opacity: m.opacity,
            // Longhand only — never mix `animation` shorthand with animationPlayState
            animationName: "mote-rise",
            animationDuration: `${m.duration}s`,
            animationTimingFunction: "linear",
            animationDelay: `${m.delay}s`,
            animationIterationCount: "infinite",
            animationPlayState: visible ? "running" : "paused",
            ["--drift" as string]: `${m.drift}px`,
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes mote-rise {
          0% {
            transform: translate3d(0, 0, 0) scale(0.5);
            opacity: 0;
          }
          8% {
            opacity: var(--mote-opacity, 0.6);
            transform: translate3d(calc(var(--drift) * 0.2), -8vh, 0) scale(1);
          }
          50% {
            transform: translate3d(var(--drift), -55vh, 0) scale(1);
          }
          92% {
            opacity: var(--mote-opacity, 0.6);
          }
          100% {
            transform: translate3d(calc(var(--drift) * 1.2), -110vh, 0) scale(0.6);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
