"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useSmoothScrollReady } from "@/components/ui/SmoothScroll";
import { loadGsap, loadScrollTrigger } from "@/lib/gsap";

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
  const isSmoothScrollReady = useSmoothScrollReady();

  useEffect(() => {
    const el = ref.current;
    if (!isSmoothScrollReady || !el) return;

    const query =
      "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
    if (!window.matchMedia(query).matches) return;

    let disposed = false;
    let revert: (() => void) | undefined;

    void Promise.all([loadGsap(), loadScrollTrigger()]).then(
      ([gsap, ScrollTrigger]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();
        mm.add(query, () => {
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
        revert = () => mm.revert();
      },
    );

    return () => {
      disposed = true;
      revert?.();
    };
  }, [from, distance, isSmoothScrollReady]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
