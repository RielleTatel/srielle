"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { FadeIn } from "@/components/ui/FadeIn";
import { FadeText } from "@/components/ui/FadeText";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ScrollSlideIn } from "@/components/ui/ScrollSlideIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects, type Project } from "@/data/projects";

const ProjectModal = dynamic(
  () =>
    import("@/components/ui/ProjectModal").then(
      (module) => module.ProjectModal,
    ),
);

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 pb-16 pt-15 sm:px-10 lg:px-15">
      <FadeIn>
        <SectionHeading
          eyebrow="Selected Work"
          title={<FadeText>Projects.</FadeText>}
          description={
            <FadeText>
              From vehicle care to campus life, these projects make essential work easier to find, manage, and act on.
            </FadeText>
          }
          className="mb-6"
        />
      </FadeIn>

      <ul id="project-list" className="grid gap-4 md:grid-cols-2 md:gap-5">
        {projects.map((project, index) => {
          const isFeatured = index === 0;
          return (
            <li key={project.slug} className={isFeatured ? "md:col-span-2" : undefined}>
              <ScrollSlideIn
                from={index % 2 === 0 ? "left" : "right"}
                className="h-full"
              >
                <ProjectCard
                  project={project}
                  index={index}
                  total={projects.length}
                  featured={isFeatured}
                  onSelect={() => setSelectedProject(project)}
                />
              </ScrollSlideIn>
            </li>
          );
        })}
      </ul>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
