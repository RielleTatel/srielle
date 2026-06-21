import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Toolbox"
          title="Skills"
          description="Languages, frameworks, and tools I reach for."
        />
      </Container>
    </section>
  );
}
