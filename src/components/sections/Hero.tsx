import Image from "next/image";
import SilkFlow from "@/components/ui/SilkFlow";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { BlurTextEffect } from "@/components/ui/BlurTextEffect";
import { KineticTextSwapper } from "@/components/ui/KineticTextSwapper";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden pt-8 pb-24"
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
