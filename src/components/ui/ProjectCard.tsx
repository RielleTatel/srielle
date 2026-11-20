import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
  total: number;
  featured?: boolean;
  heading?: "h2" | "h3";
  onSelect: () => void;
};

const formatIndex = (value: number) => String(value).padStart(2, "0");

export function ProjectCard({
  project,
  index,
  total,
  featured = false,
  heading: Heading = "h3",
  onSelect,
}: ProjectCardProps) {
  const image = project.image ?? project.images?.[0];
  // The card surface, pills, and CTA are all derived from the project's own color.
  const toneStyle = { "--tone": project.imageBackground } as CSSProperties;

  return (
    <article
      style={toneStyle}
      className="group/project relative flex h-full flex-col rounded-[1.75rem] bg-[color-mix(in_oklab,var(--tone)_22%,var(--background))] p-2.5 focus-within:ring-2 focus-within:ring-accent sm:p-3"
    >
      <button
        type="button"
        aria-label={`Open ${project.title} project details`}
        onClick={onSelect}
        className="absolute inset-0 z-10 cursor-pointer rounded-[1.75rem] focus-visible:outline-none"
      />

      <div
        className={`pointer-events-none relative overflow-hidden rounded-[1.25rem] bg-[var(--tone)] ${
          featured ? "aspect-[4/3] sm:aspect-[16/7]" : "aspect-[4/3]"
        }`}
      >
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={
              featured
                ? "(min-width: 1280px) 1160px, 100vw"
                : "(min-width: 1280px) 570px, (min-width: 768px) 50vw, 100vw"
            }
            className={`${
              image.fit === "contain" ? "object-contain" : "object-cover"
            } transition-transform duration-700 ease-out motion-reduce:transition-none group-hover/project:scale-[1.03]`}
          />
        ) : (
          <p className="absolute inset-x-8 bottom-8 text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-white">
            {project.visualTitle ?? project.title}
          </p>
        )}
      </div>

      <div className="pointer-events-none flex flex-1 flex-col px-3 pb-3 pt-5 sm:px-5 sm:pb-5">
        <p className="flex items-baseline gap-3 text-xs text-muted">
          <span className="tabular-nums opacity-70">
            {formatIndex(index + 1)}/{formatIndex(total)}
          </span>
          <span className="font-medium text-foreground/80">{project.industry}</span>
        </p>

        <Heading className="mt-2 text-[clamp(2rem,3.6vw,2.75rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-foreground">
          {project.title}
        </Heading>

        <p className="mt-2 max-w-[60ch] text-base leading-snug text-muted">
          {project.impact.result}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          {project.services.map((service) => (
            <span
              key={service}
              className="inline-flex min-h-8 items-center rounded-full border border-[color-mix(in_oklab,var(--tone)_45%,var(--foreground)_25%)] px-3 text-xs text-foreground/85"
            >
              {service}
            </span>
          ))}
          <span className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-[color-mix(in_oklab,var(--tone)_62%,black)] px-3.5 text-xs font-medium text-white transition-transform duration-200 motion-reduce:transition-none group-hover/project:-translate-y-0.5">
            View project
            <ArrowUpRight aria-hidden="true" size={14} />
          </span>
        </div>
      </div>
    </article>
  );
}
