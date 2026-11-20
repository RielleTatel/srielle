import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { FadeText } from "@/components/ui/FadeText";
import { ProjectGrid } from "@/components/ui/ProjectGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredProjects, projects } from "@/data/projects";

export function Projects({ showAll = false }: { showAll?: boolean }) {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 pb-16 pt-15 sm:px-10 lg:px-15">
      <FadeIn>
        <SectionHeading
          eyebrow="Selected Work"
          heading={showAll ? "h1" : "h2"}
          title={<FadeText>Projects.</FadeText>}
          description={
            <FadeText>
              From vehicle care to campus life, these projects make essential work easier to find, manage, and act on.
            </FadeText>
          }
          className="mb-6"
        />
      </FadeIn>

      <ProjectGrid
        projects={showAll ? projects : featuredProjects}
        featureFirst
        cardHeading={showAll ? "h2" : "h3"}
      />

      {!showAll && (
        <div className="mt-7 flex justify-end">
          <Link
            href="/projects"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-accent/60 bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            View all projects
            <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
      )}
    </section>
  );
}
