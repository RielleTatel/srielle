import { FadeIn } from "@/components/ui/FadeIn";
import { FadeText } from "@/components/ui/FadeText";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ScrollSlideIn } from "@/components/ui/ScrollSlideIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="px-15 pt-15 pb-16">
      <FadeIn>
        <SectionHeading
          eyebrow="Selected Work"
          title={<FadeText>Projects.</FadeText>}
          description={
            <FadeText>
              A short list of things I&apos;ve shipped — from full-stack products to community platforms.
            </FadeText>
          }
          className="mb-6"
        />
      </FadeIn>

      <ul className="flex flex-col gap-6">
        {projects.map((project, index) => (
          <li key={project.slug}>
            <ScrollSlideIn from={index % 2 === 0 ? "left" : "right"}>
              <ProjectCard project={project} reversed={index % 2 === 1} />
            </ScrollSlideIn>
          </li>
        ))}
      </ul>
    </section>
  );
}
