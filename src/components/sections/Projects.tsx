"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FadeIn } from "@/components/ui/FadeIn";
import { FadeText } from "@/components/ui/FadeText";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { ScrollSlideIn } from "@/components/ui/ScrollSlideIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects, type Project } from "@/data/projects";

export function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const featuredCount = 3;
  const visibleProjects = showAll ? projects : projects.slice(0, featuredCount);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(frame);
  }, [showAll]);

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
        {visibleProjects.map((project, index) => (
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

      <div className="mt-9 flex justify-end">
        <button
          type="button"
          aria-controls="project-list"
          aria-expanded={showAll}
          onClick={() => setShowAll((current) => !current)}
          className="inline-flex items-center justify-center rounded-full border border-accent/60 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {showAll ? "Show fewer projects" : `Show ${projects.length - featuredCount} more projects`}
        </button>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
