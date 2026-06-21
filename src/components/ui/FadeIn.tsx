"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** When true, animation fires on mount (e.g. hero). Otherwise it fires when scrolled into view. */
  immediate?: boolean;
  y?: number;
};

export function FadeIn({
  children,
  delay = 0,
  className,
  immediate = false,
  y = 20,
}: FadeInProps) {
  const reduce = useReducedMotion();
  const initial = reduce ? { opacity: 1 } : { opacity: 0, y };
  const target = { opacity: 1, y: 0 };
  const transition = {
    duration: 0.8,
    delay,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  };

  if (immediate) {
    return (
      <motion.div
        className={className}
        initial={initial}
        animate={target}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={target}
      viewport={{ once: true, amount: 0.2 }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
