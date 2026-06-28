"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import {
  StackedCardCarousel,
  STACKED_CARD_DEFAULTS,
} from "@/components/ui/StackedCardCarousel";
import { ThreeDPillCarousel } from "@/components/ui/ThreeDPillCarousel";

gsap.registerPlugin(ScrollTrigger);

const CARD_COUNT = STACKED_CARD_DEFAULTS.length;
const SCROLL_PX_PER_CARD = 1200;

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || CARD_COUNT < 2) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "center center",
        end: () => `+=${(CARD_COUNT - 1) * SCROLL_PX_PER_CARD}`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        snap: {
          snapTo: 1 / (CARD_COUNT - 1),
          duration: 0.25,
          delay: 0.05,
        },
        onUpdate(self) {
          const next = Math.round(self.progress * (CARD_COUNT - 1));
          setActiveIndex((prev) => (prev === next ? prev : next));
        },
      });

      triggerRef.current = trigger;

      return () => {
        triggerRef.current = null;
        trigger.kill();
      };
    });

    return () => mm.revert();
  }, []);

  // Drag-to-swipe and dot-clicks call back here. Sync the page scroll so the
  // pinned section advances in lockstep — otherwise the next wheel tick would
  // snap the index back to whatever ScrollTrigger's progress still says.
  const handleActiveIndexChange = (next: number) => {
    setActiveIndex(next);
    const trigger = triggerRef.current;
    if (!trigger) return;
    const targetProgress = next / (CARD_COUNT - 1);
    const targetScroll =
      trigger.start + targetProgress * (trigger.end - trigger.start);
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(targetScroll, true);
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} id="about" className="p-15">
      <div className="grid items-center gap-4 lg:grid-cols-4">
        <div className="h-[640px] w-full overflow-hidden rounded-3xl lg:col-span-3">
          <StackedCardCarousel
            activeIndex={activeIndex}
            onActiveIndexChange={handleActiveIndexChange}
          />
        </div>
        <div className="h-[420px] w-full lg:col-span-1">
          <ThreeDPillCarousel
            backgroundColor="transparent"
            activeIndex={activeIndex}
            onActiveIndexChange={handleActiveIndexChange}
          />
        </div>
      </div>
    </section>
  );
}
