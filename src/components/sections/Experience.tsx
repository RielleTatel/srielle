import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="py-32">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Experience"
            title="Where I've worked."
            description="Roles across engineering, community, and leadership."
          />
        </FadeIn>

        <ol className="flex flex-col">
          {experience.map((role, index) => (
            <FadeIn key={`${role.company}-${role.title}`} delay={index * 0.06}>
              <li className="grid gap-2 border-t border-border py-8 sm:grid-cols-12 sm:gap-6">
                <p className="text-sm text-muted sm:col-span-3">{role.period}</p>
                <div className="sm:col-span-9">
                  <h3 className="text-lg font-medium tracking-tight text-foreground">
                    {role.title}
                    <span className="text-muted"> · {role.company}</span>
                  </h3>
                  <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted">
                    {role.summary}
                  </p>
                </div>
              </li>
            </FadeIn>
          ))}
        </ol>
      </Container>
    </section>
  );
}
