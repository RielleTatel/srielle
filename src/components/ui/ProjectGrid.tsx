"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ScrollSlideIn } from "@/components/ui/ScrollSlideIn";
import type { Project } from "@/data/projects";

const ProjectModal = dynamic(() =>
  import("@/components/ui/ProjectModal").then((module) => module.ProjectModal),
);

type ProjectGridProps = {
  projects: readonly Project[];
  featureFirst?: boolean;
  cardHeading?: "h2" | "h3";
};

export function ProjectGrid({
  projects,
  featureFirst = false,
  cardHeading = "h3",
}: ProjectGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <ul id="project-list" className="grid gap-4 md:grid-cols-2 md:gap-5">
        {projects.map((project, index) => {
          const isFeatured = featureFirst && index === 0;

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
                  heading={cardHeading}
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
    </>
  );
}
