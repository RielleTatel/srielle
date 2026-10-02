"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { FadeText } from "@/components/ui/FadeText";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { ScrollSlideIn } from "@/components/ui/ScrollSlideIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects, type Project } from "@/data/projects";

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

      <ul id="project-list" className="flex flex-col gap-6">
        {projects.map((project, index) => (
          <li key={project.slug}>
            <ScrollSlideIn from={index % 2 === 0 ? "left" : "right"}>
              <ProjectCard
                project={project}
                reversed={index % 2 === 1}
                onSelect={() => setSelectedProject(project)}
              />
            </ScrollSlideIn>
          </li>
        ))}
      </ul>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
