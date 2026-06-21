import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Career"
          title="Experience"
          description="Where I've worked and what I focused on."
        />
        <ol className="flex flex-col gap-8 border-l border-zinc-200 pl-6 dark:border-zinc-800">
          {experience.map((role) => (
            <li key={`${role.company}-${role.title}`}>
              <p className="text-sm text-zinc-500">{role.period}</p>
              <h3 className="mt-1 text-lg font-medium text-zinc-900 dark:text-zinc-50">
                {role.title} · {role.company}
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {role.summary}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
