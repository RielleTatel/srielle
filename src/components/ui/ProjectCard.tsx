import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  reversed?: boolean;
  onSelect: () => void;
};

export function ProjectCard({
  project,
  reversed = false,
  onSelect,
}: ProjectCardProps) {
  const image = project.images?.[0] ?? project.image;

  return (
    <article className="group/project relative grid w-full overflow-hidden rounded-2xl border border-border bg-background/60 transition-colors duration-300 hover:border-accent/50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-accent motion-reduce:transition-none md:grid-cols-2">
      <button
        type="button"
        aria-label={`Open ${project.title} project details`}
        onClick={onSelect}
        className="absolute inset-0 z-10 cursor-pointer rounded-2xl focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-accent"
      />
      <div
        className={`pointer-events-none relative z-20 flex aspect-[4/3] items-center justify-center overflow-hidden md:aspect-auto md:min-h-[320px] ${
          reversed ? "md:order-2" : ""
        }`}
        style={{ backgroundColor: project.imageBackground }}
      >
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1280px) 580px, (min-width: 768px) 50vw, 100vw"
            className={`${
              image.fit === "contain" ? "object-contain" : "object-cover"
            } transition-transform duration-500 ease-out motion-reduce:transition-none group-hover/project:scale-[1.035]`}
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
        <span className="pointer-events-none absolute bottom-4 right-4 z-30 inline-flex min-h-11 items-center gap-2 rounded-full bg-background/95 px-4 text-sm font-medium text-foreground shadow-sm transition-[opacity,transform] duration-200 motion-reduce:transition-none md:translate-y-1 md:opacity-0 md:group-hover/project:translate-y-0 md:group-hover/project:opacity-100 md:group-focus-within/project:translate-y-0 md:group-focus-within/project:opacity-100">
          View project
          <ArrowUpRight aria-hidden="true" size={16} />
        </span>
      </div>

      <div
        className={`pointer-events-none relative z-20 flex flex-col gap-5 px-5 py-8 md:px-6 md:py-10 ${
          reversed ? "md:order-1" : ""
        }`}
      >
        <h3 className="text-2xl font-bold tracking-tight text-foreground transition-colors duration-200 group-hover/project:text-accent group-focus-within/project:text-accent sm:text-3xl">
          {project.title}
        </h3>

        <p className="text-base italic text-accent">{project.tagline}</p>

        <div className="border-l-[3px] border-accent pl-4">
          <p className="mb-1 text-sm font-semibold text-accent">Impact</p>
          {image && project.impact.figure && (
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
              className="group/cta pointer-events-auto relative inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-3 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              View case study
              <ArrowUpRight
                aria-hidden="true"
                size={16}
                className="transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
              />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
