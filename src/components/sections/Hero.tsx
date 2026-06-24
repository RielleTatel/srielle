"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import SilkFlow from "@/components/ui/SilkFlow";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { BlurTextEffect } from "@/components/ui/BlurTextEffect";
import { KineticTextSwapper } from "@/components/ui/KineticTextSwapper";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(section, {
        opacity: 0,
        filter: "blur(12px)",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[calc(100svh-8rem)] items-center overflow-hidden will-change-[opacity,filter]"
    >
      <Container className="relative z-10">
        <div className="flex flex-col items-center ">
          <FadeIn immediate delay={0.02}>
              <span className="relative inline-block h-40 w-40 overflow-hidden">
                <Image
                  src="/logo.svg"
                  alt="Srielle logo"
                  fill
                  sizes="50px"
                  className="object-cover"
                  priority
                />
              </span>

          </FadeIn>

          <FadeIn immediate delay={0.05}>
            <p
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
              From web applications to real impactful initiatives, I turn ideas into{" "}
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
            </p>
          </FadeIn>
        </div>
      </Container> 

    </section>
  );
}
