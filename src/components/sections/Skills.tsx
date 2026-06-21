import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";

const SKILL_GROUPS = [
  {
    label: "Engineering",
    items: ["TypeScript", "Next.js", "React", "Node.js", "Python"],
  },
  {
    label: "AI & Data",
    items: ["LLM apps", "RAG", "Prompt design", "Postgres"],
  },
  {
    label: "Craft",
    items: ["Product thinking", "Design systems", "Public speaking", "Mentorship"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-32">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Toolbox"
            title="Skills."
            description="What I reach for when building."
          />
        </FadeIn>

        <div className="grid gap-12 sm:grid-cols-3">
          {SKILL_GROUPS.map((group, index) => (
            <FadeIn key={group.label} delay={index * 0.08}>
              <div className="flex flex-col gap-4">
                <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                  {group.label}
                </h3>
                <ul className="flex flex-col gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-base text-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
