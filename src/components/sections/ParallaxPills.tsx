"use client";

import { useEffect, useRef } from "react";
import { FadeText } from "@/components/ui/FadeText";
import { useSmoothScrollReady } from "@/components/ui/SmoothScroll";
import { loadGsap, loadScrollTrigger } from "@/lib/gsap";

type Pill = {
  x: string;
  y: number;       // initial top position as a percentage of the stage
  speed: number;
  size: number;
  opacity: number;
  delay: number;   // master timeline position
};

const PILLS: Pill[] = [
  // First batch — visible on-screen at scroll start (y < 100)
  { x: "35%", y: 30,  speed: 0.8, size: 35, opacity: 0.70, delay: 0.00 },
  { x: "50%", y: 45,  speed: 1.8, size: 45, opacity: 0.80, delay: 0.04 },
  { x: "75%", y: 25,  speed: 0.9, size: 30, opacity: 0.65, delay: 0.03 },
  { x: "20%", y: 60,  speed: 1.1, size: 50, opacity: 0.75, delay: 0.06 },
  { x: "60%", y: 75,  speed: 1.6, size: 70, opacity: 0.90, delay: 0.10 },
  { x: "3%",  y: 80,  speed: 0.6, size: 25, opacity: 0.60, delay: 0.08 },

  // Transition — just below the viewport, enters as first batch leaves
  { x: "40%", y: 110, speed: 1.3, size: 40, opacity: 0.75, delay: 0.18 },
  { x: "15%", y: 120, speed: 1.0, size: 45, opacity: 0.70, delay: 0.22 },
  { x: "70%", y: 115, speed: 2.0, size: 65, opacity: 0.85, delay: 0.20 },

  // Second batch — deeper below, arrives later in the scroll
  { x: "30%", y: 145, speed: 0.8, size: 30, opacity: 0.60, delay: 0.30 },
  { x: "82%", y: 155, speed: 1.4, size: 50, opacity: 0.80, delay: 0.34 },
  { x: "55%", y: 165, speed: 1.2, size: 40, opacity: 0.70, delay: 0.38 },
  { x: "5%",  y: 175, speed: 1.5, size: 60, opacity: 0.80, delay: 0.42 },
  { x: "95%", y: 185, speed: 1.8, size: 55, opacity: 0.85, delay: 0.46 },
  { x: "45%", y: 200, speed: 1.0, size: 35, opacity: 0.70, delay: 0.50 },
];

export function ParallaxPills() {
  const sectionRef = useRef<HTMLElement>(null);
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isSmoothScrollReady = useSmoothScrollReady();

  useEffect(() => {
    const section = sectionRef.current;
    if (!isSmoothScrollReady || !section) return;

    const html = document.documentElement;
    const stage = section.firstElementChild as HTMLDivElement;
    let disposed = false;
    let refreshFrame = 0;
    let themeObserver: IntersectionObserver;
    let revertMotion: (() => void) | undefined;

    // Keep the page-wide theme switch on native and smoothed scrolling alike.
    // Observing the section avoids running a scroll handler on every frame.
    const observeTheme = () => {
      themeObserver?.disconnect();
      themeObserver = new IntersectionObserver(([entry]) => {
        html.classList.toggle(
          "dark-mode",
          entry.isIntersecting || entry.boundingClientRect.top < 0,
        );
      }, { rootMargin: `0px 0px -${window.innerHeight / 2}px 0px` });
      themeObserver.observe(section);
    };
    observeTheme();
    window.addEventListener("resize", observeTheme);

    void Promise.all([loadGsap(), loadScrollTrigger()]).then(([gsap, ScrollTrigger]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add({
        all: "all",
        mobile: "(max-width: 767px)",
        desktop: "(min-width: 768px) and (pointer: fine)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      }, (context) => {
        const { desktop, mobile, reduceMotion } = context.conditions!;
        // Phones show no pills (hidden in CSS), so there is nothing to animate.
        if (reduceMotion || mobile) return;

        if (!desktop) {
          // Touch tablets keep native scrolling with six lightweight parallax
          // layers. No pinning or blur; only transform and opacity change.
          PILLS.slice(0, 6).forEach((pill, index) => {
            const element = pillRefs.current[index];
            if (!element) return;
            gsap.fromTo(element, {
              y: () => stage.clientHeight * 0.12 * pill.speed,
              scaleY: 1 + pill.speed * 0.75,
              opacity: pill.opacity * 0.7,
            }, {
              y: () => -stage.clientHeight * 0.28 * pill.speed,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
          });
        } else {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${stage.clientHeight * 2.5}`,
              pin: true,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          PILLS.forEach((pill, index) => {
            const element = pillRefs.current[index];
            if (!element) return;
            gsap.set(element, {
              y: 0,
              scaleY: 1 + pill.speed * 1.5,
              opacity: pill.opacity,
            });
            const exitDistance = () => -(pill.y + 15) / 100 * stage.clientHeight;
            const fadeDistance = () => -(pill.y + 40) / 100 * stage.clientHeight;
            timeline
              .to(element, { y: exitDistance, duration: 0.85, ease: "none" }, pill.delay)
              .to(element, {
                y: fadeDistance,
                opacity: 0,
                duration: 0.15,
                ease: "power2.in",
              }, pill.delay + 0.85);
          });
        }

        window.cancelAnimationFrame(refreshFrame);
        refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
      }, section);
      // matchMedia reverts transforms and pin spacers when modes change.
      revertMotion = () => mm.revert();
    });

    return () => {
      disposed = true;
      window.cancelAnimationFrame(refreshFrame);
      window.removeEventListener("resize", observeTheme);
      themeObserver.disconnect();
      revertMotion?.();
      html.classList.remove("dark-mode");
    };
  }, [isSmoothScrollReady]);

  return (
    <section ref={sectionRef} id="parallax-pills" className="relative">
      <div className="parallax-stage relative h-[100svh] w-full overflow-hidden">
        {PILLS.map((pill, i) => (
          <div
            key={i}
            ref={(el) => { pillRefs.current[i] = el; }}
            aria-hidden
            className="parallax-pill pointer-events-none absolute z-0 max-md:hidden"
            style={{
              left: pill.x,
              top: `${pill.y}%`,
              width: 18,
              height: pill.size,
              borderRadius: 999,
              background: "var(--pill-gradient)",
              transformOrigin: "center center",
              transform: `scaleY(${1 + pill.speed * 0.7})`,
              opacity: pill.opacity,
            }}
          />
        ))}

        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
              <FadeText>Scroll</FadeText>
            </p>
            <h2
              className="mt-4 text-foreground"
              style={{
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                fontSize: "clamp(1.75rem, 6vw, 5rem)",
              }}
            >
              <FadeText>The goal was never just to code.</FadeText>
              <br />
                <span className="text-[#82A079]">
                  <FadeText delay={0.25}>The goal was always to create impact.</FadeText>
                </span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
