import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

export function Contact() {
  return (
    <section id="contact" className="border-t border-border py-32">
      <Container>
        <FadeIn>
          <div className="flex flex-col gap-8">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
              Get in touch
            </span>
            <h2
              className="max-w-3xl text-foreground"
              style={{
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              }}
            >
              Let&apos;s build something
              <br />
              that matters.
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Open to collaborations, speaking engagements, and meaningful
              conversations. The fastest way to reach me is email.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="mailto:tatelgabrielle19@gmail.com" variant="primary">
                Email Me
              </Button>
              <Button href="https://github.com/RielleTatel" variant="secondary">
                GitHub
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
