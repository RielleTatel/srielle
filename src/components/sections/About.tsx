import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" className="py-24">
      <Container>
        <SectionHeading
          eyebrow="About"
          title="A short introduction"
          description="Replace this with a brief story about who you are and what you do."
        />
      </Container>
    </section>
  );
}
