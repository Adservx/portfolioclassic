"use client";

import { useEffect, useState } from "react";

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
  ink: "rgba(26, 20, 14, 0.35)",
  gold: "rgba(163, 126, 44, 0.4)",
  oxblood: "rgba(107, 31, 26, 0.3)",
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

export function InkMotes({ count = 24, className = "" }: { count?: number; className?: string }) {
  const [moteseed, setMoteseed] = useState<Mote[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMoteseed(generateMoteseed(count, Math.floor(Math.random() * 100000)));
  }, [count]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 overflow-hidden ${className}`}
      style={{ zIndex: 1 }}
    >
      {moteseed.map((m) => (
        <span
          key={m.id}
          className="absolute bottom-0 rounded-full"
          style={{
            left: `${m.left}%`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            background: COLORS[m.color],
            boxShadow: `0 0 ${m.size * 3}px ${COLORS[m.color]}`,
            opacity: m.opacity,
            animation: `mote-rise ${m.duration}s linear ${m.delay}s infinite`,
            ["--drift" as string]: `${m.drift}px`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes mote-rise {
          0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
          8% { opacity: var(--mote-opacity, 0.6); transform: translate(calc(var(--drift) * 0.2), -8vh) scale(1); }
          50% { transform: translate(var(--drift), -55vh) scale(1); }
          92% { opacity: var(--mote-opacity, 0.6); }
          100% { transform: translate(calc(var(--drift) * 1.2), -110vh) scale(0.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
