"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Pill = {
  x: string;
  y: number;       // initial top position in vh
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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const html = document.documentElement;
      const enableLightMode = () => html.classList.add("light-mode");
      const disableLightMode = () => html.classList.remove("light-mode");

      // Light mode latches on at the start of this section and stays on for every
      // section below. It only reverts when the user scrolls back above the start.
      const themeTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top center",
        onEnter: enableLightMode,
        onLeaveBack: disableLightMode,
      });

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      PILLS.forEach((pill, i) => {
        const el = pillRefs.current[i];
        if (!el) return;
        const maxStretch = 1 + pill.speed * 1.5;

        // Pills are positioned by CSS top:${pill.y}vh and translated upward via y.
        // exitTranslation puts the pill's top at -15vh (safely above the viewport);
        // the fade phase travels a further 25vh while opacity/blur ramp out.
        const exitTranslation = pill.y + 15;
        const fadeTranslation = 25;

        // Pre-state: already stretched and visible at full opacity. Pills with
        // pill.y > 100 are below the viewport, so they're naturally hidden by
        // the container's overflow-hidden until they translate into view.
        // No fade-in needed — they emerge from the bottom edge naturally.
        gsap.set(el, {
          y: 0,
          scaleY: maxStretch,
          opacity: pill.opacity,
          filter: "blur(0px)",
        });

        const pillTl = gsap.timeline();
        pillTl
          // Phase 1 — travel upward through the viewport.
          .to(el, {
            y: `-${exitTranslation}vh`,
            duration: 0.85,
            ease: "none",
          })
          // Phase 2 — fade + blur as the pill clears the top edge.
          .to(el, {
            y: `-${exitTranslation + fadeTranslation}vh`,
            opacity: 0,
            filter: "blur(20px)",
            duration: 0.15,
            ease: "power2.in",
          });

        // Pills wait at their startY until master reaches their delay, then go.
        // Staggered delays = different pills in different lifecycle phases at any
        // given scroll position, which produces the continuous wave.
        masterTl.add(pillTl, pill.delay);
      });

      return () => {
        themeTrigger.kill();
        masterTl.scrollTrigger?.kill();
        masterTl.kill();
        disableLightMode();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="parallax-pills" className="relative">
      <div className="relative h-screen w-full overflow-hidden">
        {PILLS.map((pill, i) => (
          <div
            key={i}
            ref={(el) => { pillRefs.current[i] = el; }}
            aria-hidden
            className="pointer-events-none absolute z-0 will-change-[transform,opacity,filter]"
            style={{
              left: pill.x,
              top: `${pill.y}vh`,
              width: 18,
              height: pill.size,
              borderRadius: 999,
              background: "var(--pill-gradient)",
              transformOrigin: "center center",
            }}
          />
        ))}

        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
              Scroll
            </p>
            <h2
              className="mt-4 text-foreground"
              style={{
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
              }}
            >
              The goal
              was never
              just to code.
              <br />
                <span className="text-[#82A079]"> 
                  The goal
                  was always
                  to create impact.
                </span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}