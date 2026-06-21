import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Contact() {
  return (
    <section id="contact" className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Get in touch"
          title="Contact"
          description="Say hi — replace this with your preferred contact channels."
        />
      </Container>
    </section>
  );
}
