"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { AnimatePresence, motion } from "motion/react";
import { Quote } from "lucide-react";
import {
  StackedCardCarousel,
  type StackedCardItem,
} from "@/components/ui/StackedCardCarousel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeText } from "@/components/ui/FadeText";

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
  },
];

const STACKED_CARDS: StackedCardItem[] = ENTRIES.map((entry) => ({
  image: entry.image,
  heading: entry.title,
  category: entry.role,
  tags: entry.tags,
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
  const totalLabel = String(CARD_COUNT).padStart(2, "0");
  const currentLabel = String(activeIndex + 1).padStart(2, "0");

  return (
    <section ref={sectionRef} id="about" className="px-15 pt-6 pb-6">
      <SectionHeading
        eyebrow="Beyond the Code"
        title={<FadeText>About Me.</FadeText>}
        description={
          <FadeText delay={0.1}>
            Software is one chapter. These are the others — leadership, advocacy, and the communities I build along the way.
          </FadeText>
        }
        className="mb-6 items-center text-center"
      />
      <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.90fr)_minmax(0,1fr)]">
        <div className="relative h-[555px] w-full overflow-hidden rounded-3xl border border-[var(--accent)]/15 bg-foreground/[0.025]">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[var(--accent)]/[0.18] blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -right-20 h-56 w-56 rounded-full bg-[var(--accent)]/[0.08] blur-3xl"
          />
          <StackedCardCarousel
            cards={STACKED_CARDS}
            activeIndex={activeIndex}
            onActiveIndexChange={handleActiveIndexChange}
            activeDotColor="var(--accent)"
          />
        </div>

        <aside
          aria-label="Chapter details"
          className="relative flex h-[540px] w-full flex-col gap-6 overflow-hidden rounded-3xl border border-[var(--accent)]/15 bg-foreground/[0.025] p-7 backdrop-blur-sm sm:p-8"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[var(--accent)]/[0.18] blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-20 h-56 w-56 rounded-full bg-[var(--accent)]/[0.08] blur-3xl"
          />
          <div className="relative flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
            <span>
              Chapter <span className="text-[var(--accent)]">{currentLabel}</span> / {totalLabel}
            </span>
            <span
              aria-hidden
              className="h-px flex-1 bg-gradient-to-r from-[var(--accent)]/40 via-border to-transparent"
            />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={activeEntry.role}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/[0.08] px-3 py-1 tracking-[0.16em] text-[var(--accent)]"
              >
                {activeEntry.role}
              </motion.span>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-1 flex-col justify-between gap-6"
            >
              <div className="flex flex-col gap-2">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                  Position
                </p>
                <h3
                  className="text-foreground"
                  style={{
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.05,
                    fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)",
                  }}
                >
                  {activeEntry.positionTitle}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {activeEntry.positionOrg}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                  {activeEntry.description}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <span
                  aria-hidden
                  className="h-px w-full bg-gradient-to-r from-[var(--accent)]/40 via-border to-transparent"
                />
                <figure className="flex flex-col gap-3">
                  <Quote
                    size={20}
                    strokeWidth={1.6}
                    className="text-[var(--accent)]/70"
                    aria-hidden
                  />
                  <blockquote
                    className="text-foreground/90"
                    style={{
                      fontStyle: "italic",
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.3,
                      fontSize: "clamp(1.05rem, 1.4vw, 1.35rem)",
                    }}
                  >
                    {activeEntry.slogan}
                  </blockquote>
                </figure>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="relative flex items-center justify-end">
            <div role="tablist" aria-label="Chapter navigation" className="flex items-center gap-2">
              {ENTRIES.map((entry, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={entry.title}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Open chapter ${idx + 1}: ${entry.title}`}
                    onClick={() => handleActiveIndexChange(idx)}
                    className="group p-1"
                  >
                    <span
                      className={`block h-1 rounded-full transition-all duration-300 ease-out ${
                        isActive
                          ? "w-10 bg-[var(--accent)]"
                          : "w-2 bg-muted/40 group-hover:bg-muted"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
