import Image from "next/image";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  reversed?: boolean;
};

export function ProjectCard({ project, reversed = false }: ProjectCardProps) {
  return (
    <article className="grid w-full overflow-hidden rounded-2xl border border-border bg-background/60 md:grid-cols-2">
      <div
        className={`relative flex aspect-[4/3] items-center justify-center md:aspect-auto md:min-h-[320px] ${
          reversed ? "md:order-2" : ""
        }`}
        style={{ backgroundColor: project.imageBackground }}
      >
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 1280px) 580px, (min-width: 768px) 50vw, 100vw"
            className={project.image.fit === "contain" ? "object-contain" : "object-cover"}
          />
        ) : (
          <div className="flex h-full w-full flex-col justify-between gap-8 p-7 text-[#1f3318] sm:p-10">
            <span className="text-sm font-medium">{project.visualLabel ?? project.industry}</span>
            <p className="max-w-[12ch] text-[clamp(2.75rem,5vw,5.5rem)] font-bold leading-[0.92] tracking-[-0.065em] [overflow-wrap:anywhere]">
              {project.visualTitle ?? project.title}
            </p>
            <p className="max-w-sm border-t border-[#1f3318]/25 pt-3 text-base font-semibold leading-snug sm:text-lg">
              {project.impact.figure ?? project.tagline}
            </p>
          </div>
        )}
      </div>

      <div
        className={`flex flex-col gap-5 px-5 py-8 md:px-6 md:py-10 ${
          reversed ? "md:order-1" : ""
        }`}
      >
        <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {project.title}
        </h3>

        <p className="text-base italic text-accent">{project.tagline}</p>

        <div className="border-l-[3px] border-accent pl-4">
          <p className="mb-1 text-sm font-semibold text-accent">Impact</p>
          {project.image && project.impact.figure && (
            <p className="mb-1 text-xl font-bold leading-tight text-foreground">
              {project.impact.figure}
            </p>
          )}
          <p className="text-lg font-medium leading-snug text-foreground">
            {project.impact.result}
          </p>
        </div>

        <p className="text-base leading-relaxed text-muted">
          {project.description}
        </p>

        <div className="mt-auto flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1 text-xs text-muted">
            <span>{project.services.join(", ")}</span>
            {project.industry && <span>{project.industry}</span>}
          </div>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/cta inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-[var(--accent)]"
            >
              View case study
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover/cta:translate-x-0.5"
              >
                →
              </span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
