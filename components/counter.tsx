"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface CounterProps {
  target: number;
  suffix?: string;
  className?: string;
}

export function Counter({ target, suffix = "", className = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
    >
      {inView ? target : 0}
      {suffix}
    </motion.span>
  );
}
