import SilkFlow from "@/components/ui/SilkFlow";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden py-24"
    >
      <div className="absolute inset-0">
        <SilkFlow
          color="#b2d1ed"
          speed={0.15}
          scale={2.5}
          warpStrength={6.0}
          contrast={0.6}
        />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center ">
          <FadeIn immediate delay={0.05}>
            <p
              className="text-foreground text-3xl"
              style={{
                fontWeight: 700,
                letterSpacing: "-0.06em",
                lineHeight: 0.95,
                fontSize: "clamp(4rem, 10vw, 5rem)",
                textAlign: "center",
              }}
            >
              BUILDING SOFTWARE,
              <br />
              COMMUNITIES,
              <br />
              <span className="text-accent">AND OPPORTUNTIES.</span>
            </p>
          </FadeIn>

          <FadeIn immediate delay={0.2}>
            <p className="mt-6 max-w-2xl text-center text-base text-muted sm:text-lg">
              From web applications to community initiatives, I turn ideas into
              experiences that make a lasting impact.
            </p>
          </FadeIn>

          <FadeIn immediate delay={0.35}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="#projects" variant="primary">
                View my work
              </Button>
              <Button href="#contact" variant="secondary">
                Get in touch
              </Button>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
