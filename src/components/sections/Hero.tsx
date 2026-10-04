"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { BlurTextEffect } from "@/components/ui/BlurTextEffect";
import { KineticTextSwapper } from "@/components/ui/KineticTextSwapper";
import { ResumeToggle } from "@/components/ui/ResumeToggle";
import { useSmoothScrollReady } from "@/components/ui/SmoothScroll";
import { useShouldSkipMotion } from "@/components/ui/useShouldSkipMotion";
import { loadGsap, loadScrollTrigger, loadTextPlugin } from "@/lib/gsap";

const SUBTITLE_PREFIX =
  "From web applications to real impactful initiatives, I turn ideas into ";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLParagraphElement>(null);
  const [typingDone, setTypingDone] = useState(false);
  const isSmoothScrollReady = useSmoothScrollReady();
  const shouldSkipMotion = useShouldSkipMotion();
  const showSwapper = typingDone || shouldSkipMotion;

  useEffect(() => {
    const section = sectionRef.current;
    if (!isSmoothScrollReady || !section) return;

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
          const tween = gsap.to(section, {
            opacity: 0,
            filter: "blur(12px)",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: true,
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
  }, [isSmoothScrollReady]);

  useEffect(() => {
    const node = subtitleRef.current;
    if (!node) return;

    const query =
      "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
    if (!window.matchMedia(query).matches) {
      node.textContent = SUBTITLE_PREFIX;
      return;
    }

    let disposed = false;
    let killTween: (() => void) | undefined;

    void Promise.all([loadGsap(), loadTextPlugin()]).then(
      ([gsap, TextPlugin]) => {
        if (disposed) return;
        gsap.registerPlugin(TextPlugin);
        node.textContent = "";
        const tween = gsap.to(node, {
          text: SUBTITLE_PREFIX,
          duration: 1.6,
          ease: "none",
          delay: 0.5,
          onComplete: () => setTypingDone(true),
        });
        killTween = () => tween.kill();
      },
    );

    return () => {
      disposed = true;
      killTween?.();
    };
  }, []);

  useEffect(() => {
    const headline = headlineRef.current;
    if (!headline) return;

    const query =
      "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
    if (!window.matchMedia(query).matches) return;

    let disposed = false;
    let killTimeline: (() => void) | undefined;

    void loadGsap().then((gsap) => {
      if (disposed) return;
      const tl = gsap.timeline({ delay: 1.0 });
      for (let i = 0; i < 8; i++) {
        const intensity = 12 * (1 - i / 8);
        tl.to(headline, {
          x: gsap.utils.random(-intensity, intensity),
          y: gsap.utils.random(-intensity * 0.5, intensity * 0.5),
          rotation: gsap.utils.random(-3, 3),
          duration: 0.05,
        });
      }
      tl.to(headline, { x: 0, y: 0, rotation: 0, duration: 0.3 });
      killTimeline = () => tl.kill();
    });

    return () => {
      disposed = true;
      killTimeline?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[calc(100svh-8rem)] items-center overflow-hidden"
    >
      <Container className="relative z-10">
        <div className="flex flex-col items-center">
          <FadeIn immediate delay={0.02}>
            <span className="relative inline-block h-40 w-40 overflow-hidden">
              <Image
                src="/logo-optimized.webp"
                alt="Srielle logo"
                fill
                sizes="160px"
                className="object-cover"
                priority
              />
            </span>
          </FadeIn>

          <FadeIn immediate delay={0.05}>
            <p
              ref={headlineRef}
              className="text-foreground text-3xl -mt-8"
              style={{
                fontWeight: 700,
                letterSpacing: "-0.06em",
                lineHeight: 0.95,
                fontSize: "clamp(5rem, 10vw, 2rem)",
                textAlign: "center",
              }}
            >
              <BlurTextEffect
                text="BUILDING SOFTWARE,"
                blurDirection="both"
                blurIntensity={3}
                blurWidth={10}
              />
              <br />
              <BlurTextEffect
                text="COMMUNITIES,"
                blurDirection="both"
                blurIntensity={3}
                blurWidth={22}
              />
              <br />
              <BlurTextEffect
                text="AND OPPORTUNTIES."
                className="text-accent"
                blurDirection="both"
                blurIntensity={3}
                blurWidth={30}
              />
            </p>
          </FadeIn>

          <FadeIn immediate delay={0.2}>
            <p className="mt-6 max-w-2xl text-center text-base text-muted sm:text-lg">
              <span ref={subtitleRef} aria-live="polite">
                {SUBTITLE_PREFIX}
              </span>
              {!showSwapper && (
                <span className="typewriter-cursor" aria-hidden>
                  |
                </span>
              )}
              {showSwapper && (
                <KineticTextSwapper
                  words={[
                    "experiences",
                    "products",
                    "solutions",
                    "communities",
                    "opportunities",
                    "impact",
                  ]}
                  className="text-foreground font-medium"
                />
              )}
            </p>
          </FadeIn>

          <ResumeToggle />
        </div>
      </Container>

    </section>
  );
}
