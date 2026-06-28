import { FadeIn } from "@/components/ui/FadeIn";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="px-15 pt-6 pb-16">
      <FadeIn>
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects."
          description="A short list of things I've shipped — from full-stack products to community platforms."
          className="mb-6"
        />
      </FadeIn>

      <ul className="flex flex-col gap-6">
        {projects.map((project, index) => (
          <FadeIn key={project.slug} delay={index * 0.08}>
            <li>
              <ProjectCard project={project} reversed={index % 2 === 1} />
            </li>
          </FadeIn>
        ))}
      </ul>
    </section>
  );
}
