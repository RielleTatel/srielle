"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollSlideInProps = {
  children: ReactNode;
  from?: "left" | "right";
  distance?: number;
  className?: string;
};

export function ScrollSlideIn({
  children,
  from = "left",
  distance = 200,
  className,
}: ScrollSlideInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.from(el, {
        x: from === "left" ? -distance : distance,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, [from, distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
