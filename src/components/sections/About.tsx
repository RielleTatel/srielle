"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import {
  StackedCardCarousel,
  type StackedCardItem,
} from "@/components/ui/StackedCardCarousel";
import {
  ThreeDPillCarousel,
  type ThreeDPillItem,
} from "@/components/ui/ThreeDPillCarousel";
import { SectionHeading } from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

type AboutEntry = {
  title: string;
  role: string;
  slogan: string;
  positionTitle: string;
  positionOrg: string;
  description: string;
  tags: string[];
  image: { src: string; alt: string };
  pillImage: { src: string; alt: string };
};

const ENTRIES: AboutEntry[] = [
  {
    title: "Community Leadership",
    role: "Community Builder",
    slogan: "Building Communities Through Technology",
    positionTitle: "President",
    positionOrg:
      "Google Developer Groups on Campus – Ateneo de Zamboanga University (2024–2025)",
    description:
      "Led a 60+ member technology community and organized initiatives that empowered students through hackathons, AI workshops, and developer programs. Spearheaded BlueCode: Zamboanga Hackathon 2025, the first city-wide hackathon in Zamboanga after the pandemic, helping revive the local tech ecosystem.",
    tags: ["Leadership", "Community Building", "Hackathons", "Developer Relations"],
    image: { src: "/aboutSection/blueCode.jpg", alt: "BlueCode Hackathon" },
    pillImage: { src: "/aboutSection/blueCode2.jpg", alt: "Community event" },
  },
  {
    title: "Startup Innovation & Entrepreneurship",
    role: "Startup Enthusiast",
    slogan: "From Ideas to Impact",
    positionTitle: "Lead Founder",
    positionOrg: "Anyam (2025–Present)",
    description:
      "Founded and led Anyam, a tourism technology startup focused on promoting underrepresented destinations through community-driven storytelling and digital innovation. The startup won the Regional Championship and later became a National Winning Team in the CHED Tourism Startup Challenge, securing ₱250,000 in implementation funding.",
    tags: ["Entrepreneurship", "Innovation", "Product Strategy", "Full-Stack Development"],
    image: { src: "/awards/awards2.jpg", alt: "Anyam award" },
    pillImage: { src: "/awards/awards.jpeg", alt: "Anyam recognition" },
  },
  {
    title: "Competitive Debate & Public Advocacy",
    role: "Competitive Debater",
    slogan: "Ideas Worth Defending",
    positionTitle: "Competitive Debater",
    positionOrg: "Ateneo Debate Union",
    description:
      "Represent Ateneo de Zamboanga University in regional and national British Parliamentary debate tournaments, developing strong analytical thinking and communication under pressure. Recognized as a National Breaking Debater during the 36th National Debate Championship.",
    tags: ["Debate", "Public Speaking", "Critical Thinking", "Argumentation"],
    image: { src: "/debate/debate1.jpg", alt: "Debate tournament" },
    pillImage: { src: "/debate/debate2.jpeg", alt: "Debate round" },
  },
  {
    title: "Technology Education & Community Engagement",
    role: "Tech Speaker & Advocate",
    slogan: "Sharing Knowledge, Inspiring Innovation",
    positionTitle: "Technical Speaker & Community Volunteer",
    positionOrg:
      "Google Developer Groups • GDG Zamboanga • Community Events",
    description:
      "Regularly speak at community-driven technology events, including Build with AI and BuildLabs, sharing practical insights on AI and modern software development. Through these engagements, I aim to make technology more accessible while encouraging continuous learning and innovation.",
    tags: ["Developer Advocacy", "Artificial Intelligence", "Mentorship", "Workshops"],
    image: { src: "/speaker/speaker1.jpg", alt: "Speaking engagement" },
    pillImage: { src: "/speaker/speaker2.jpeg", alt: "Workshop session" },
  },
];

const STACKED_CARDS: StackedCardItem[] = ENTRIES.map((entry) => ({
  image: entry.image,
  heading: entry.title,
  title: entry.description,
  category: entry.role,
  tags: entry.tags,
}));

const PILL_ITEMS: ThreeDPillItem[] = ENTRIES.map((entry) => ({
  image: entry.pillImage,
}));

const CARD_COUNT = ENTRIES.length;
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

  const activeEntry = ENTRIES[activeIndex];

  return (
    <section ref={sectionRef} id="about" className="px-15 pt-6 pb-6">
      <SectionHeading
        eyebrow="Beyond the Code"
        title="About Me."
        className="mb-2"
      />
      <div className="grid items-center gap-2 lg:grid-cols-4">
        <div className="h-[540px] w-full overflow-hidden rounded-3xl lg:col-span-3">
          <StackedCardCarousel
            cards={STACKED_CARDS}
            activeIndex={activeIndex}
            onActiveIndexChange={handleActiveIndexChange}
          />
        </div>
        <div className="flex h-[540px] w-full flex-col items-center justify-between gap-4 lg:col-span-1">
          <div className="w-full text-center">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
              {activeEntry.positionTitle}
            </p>
            <p className="mt-2 text-sm text-foreground/80 leading-snug">
              {activeEntry.positionOrg}
            </p>
          </div>
          <div className="w-full flex-1">
            <ThreeDPillCarousel
              items={PILL_ITEMS}
              backgroundColor="transparent"
              activeIndex={activeIndex}
              onActiveIndexChange={handleActiveIndexChange}
            />
          </div>
          <p
            className="w-full text-center"
            style={{
              color: "var(--accent)",
              fontStyle: "italic",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
            }}
          >
            {activeEntry.slogan}
          </p>
        </div>
      </div>
    </section>
  );
}
