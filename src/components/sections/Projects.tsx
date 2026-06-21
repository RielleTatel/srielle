import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Work"
          title="Projects"
          description="Selected things I've built."
        />
        <ul className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <li
              key={project.slug}
              className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800"
            >
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
