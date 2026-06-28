"use client";

import { Fragment, type CSSProperties } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

type FadeTextProps = {
  children: string;
  delay?: number;
  stagger?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  viewportAmount?: number;
};

export function FadeText({
  children,
  delay = 0,
  stagger = 0.04,
  y = 12,
  className,
  style,
  viewportAmount = 0.4,
}: FadeTextProps) {
  const reduce = useReducedMotion();
  const words = children.split(/(\s+)/).filter((part) => part.length > 0);

  if (reduce) {
    return (
      <span className={className} style={style}>
        {children}
      </span>
    );
  }

  const container: Variants = {
    hidden: {
      transition: {
        staggerChildren: stagger * 0.6,
        staggerDirection: -1,
      },
    },
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  const word: Variants = {
    hidden: {
      opacity: 0,
      y,
      transition: { duration: 0.35, ease: [0.4, 0, 1, 1] },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.span
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: viewportAmount }}
    >
      {words.map((part, i) => {
        if (/^\s+$/.test(part)) {
          return <Fragment key={i}>{part}</Fragment>;
        }
        return (
          <motion.span
            key={i}
            variants={word}
            style={{ display: "inline-block", willChange: "transform, opacity" }}
          >
            {part}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
