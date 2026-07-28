"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { useCanParallax } from "@/lib/use-is-mobile";

export function ScrollProgress() {
  const prefersReduced = useReducedMotion();
  const canParallax = useCanParallax();
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: canParallax ? 80 : 200,
    damping: canParallax ? 20 : 40,
    restDelta: prefersReduced || !canParallax ? 0.01 : 0.001,
  });

  const left = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: prefersReduced || !canParallax ? 0.1 : 0.001,
  });

  return (
    <>
      {/* ✦ Top progress bar — quill-stroke */}
      <motion.div
        style={{
          scaleX: canParallax ? scaleX : scrollYProgress,
          transformOrigin: "left",
        }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-ink z-[60] origin-left pointer-events-none"
      />
      {/* ✦ Wax dot — desktop only (extra spring work on every scroll frame) */}
      {canParallax && (
        <motion.div
          style={{ left }}
          className="fixed top-0 h-[2px] w-[6px] -translate-x-1/2 bg-oxblood z-[61] origin-left pointer-events-none"
        />
      )}
    </>
  );
}
