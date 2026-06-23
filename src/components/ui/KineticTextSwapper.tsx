"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type AnimationStyle =
  | "3dRoll"
  | "softBlur"
  | "springSlide"
  | "flipCard"
  | "scalePop"
  | "elasticDrop";

type KineticTextSwapperProps = {
  words: string[];
  /** Seconds between swaps. */
  interval?: number;
  animationStyle?: AnimationStyle;
  className?: string;
};

function getVariants(style: AnimationStyle) {
  switch (style) {
    case "3dRoll":
      return {
        initial: { opacity: 0, rotateX: -90, y: 40, z: -50 },
        animate: { opacity: 1, rotateX: 0, y: 0, z: 0 },
        exit: { opacity: 0, rotateX: 90, y: -40, z: -50 },
      };
    case "softBlur":
      return {
        initial: { opacity: 0, filter: "blur(12px)", y: 10 },
        animate: { opacity: 1, filter: "blur(0px)", y: 0 },
        exit: { opacity: 0, filter: "blur(12px)", y: -10 },
      };
    case "springSlide":
      return {
        initial: { opacity: 0, y: "100%" },
        animate: { opacity: 1, y: "0%" },
        exit: { opacity: 0, y: "-100%" },
      };
    case "flipCard":
      return {
        initial: { opacity: 0, rotateY: 90, scale: 0.9 },
        animate: { opacity: 1, rotateY: 0, scale: 1 },
        exit: { opacity: 0, rotateY: -90, scale: 0.9 },
      };
    case "scalePop":
      return {
        initial: { opacity: 0, scale: 0.5 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 1.2 },
      };
    case "elasticDrop":
      return {
        initial: { opacity: 0, y: -60, scaleY: 1.5 },
        animate: { opacity: 1, y: 0, scaleY: 1 },
        exit: { opacity: 0, y: 60, scaleY: 0.5 },
      };
  }
}

export function KineticTextSwapper({
  words,
  interval = 2.5,
  animationStyle = "softBlur",
  className,
}: KineticTextSwapperProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval * 1000);
    return () => clearInterval(id);
  }, [words.length, interval]);

  // Invisible longest-word spacer keeps inline width stable across swaps —
  // without this, surrounding text reflows as the active word changes.
  const longest = words.reduce((a, b) => (a.length > b.length ? a : b), "");
  const variants = getVariants(animationStyle);

  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        verticalAlign: "baseline",
        perspective: 1200,
        transformStyle: "preserve-3d",
      }}
    >
      <span
        aria-hidden
        style={{ visibility: "hidden", whiteSpace: "nowrap" }}
      >
        {longest}
      </span>
      <AnimatePresence>
        <motion.span
          key={index}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 16,
            mass: 0.8,
          }}
          className={className}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            display: "inline-block",
            whiteSpace: "nowrap",
            transformOrigin: "center center",
            textShadow:
              "0 0 5px color-mix(in srgb, currentColor 20%, transparent), 0 0 22px color-mix(in srgb, currentColor 22%, transparent)",
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
