"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 20, restDelta: 0.001 });

  return (
    <>
      {/* ✦ Top progress bar — quill-stroke */}
      <motion.div
        style={{ scaleX, transformOrigin: "left" }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-ink z-[60] origin-left"
      />
      {/* ✦ Faint wax dot that travels with the bar */}
      <motion.div
        style={{
          left: useSpring(scrollYProgress, { stiffness: 80, damping: 20, restDelta: 0.001 }),
        }}
        className="fixed top-0 h-[2px] w-[6px] -translate-x-1/2 bg-oxblood z-[61] origin-left"
      />
    </>
  );
}
