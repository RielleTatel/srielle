import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  reversed?: boolean;
};

export function ProjectCard({ project, reversed = false }: ProjectCardProps) {
  return (
    <article className="grid w-full overflow-hidden rounded-2xl border border-border bg-background/60 md:grid-cols-2">
      <div
        className={`flex aspect-[4/3] items-center justify-center md:aspect-auto md:min-h-[320px] ${
          reversed ? "md:order-2" : ""
        }`}
        style={{ backgroundColor: project.imageBackground }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image.src}
          alt={project.image.alt}
          className="h-full w-full object-cover"
        />
      </div>

      <div
        className={`flex flex-col gap-5 px-5 py-8 md:px-6 md:py-10 ${
          reversed ? "md:order-1" : ""
        }`}
      >
        <h3 className="text-3xl font-bold uppercase tracking-tight text-foreground">
          {project.title}
        </h3>

        <p className="text-base leading-relaxed text-muted">
          {project.description}
        </p>

        {project.highlight && (
          <p
            className="text-xs font-semibold uppercase tracking-[0.14em]"
            style={{ color: "#f08c4a" }}
          >
            {project.highlight}
          </p>
        )}

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
