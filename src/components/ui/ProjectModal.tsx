"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import type { Project } from "@/data/projects";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

const IMAGES_PER_PAGE = 4;

function ProjectGallery({ project }: { project: Project }) {
  const images = project.images?.length
    ? project.images
    : project.image
      ? [project.image]
      : [];
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(images.length / IMAGES_PER_PAGE);
  const pageImages = images.slice(
    page * IMAGES_PER_PAGE,
    (page + 1) * IMAGES_PER_PAGE,
  );

  function movePage(direction: -1 | 1) {
    setPage((current) => Math.max(0, Math.min(current + direction, pageCount - 1)));
  }

  return (
    <div className="md:sticky md:top-0 md:self-start">
      {images.length > 0 ? (
        <>
          <div
            role="group"
            aria-label="Project photos"
            className="grid grid-cols-2 gap-3 bg-background p-4 sm:gap-4 sm:p-5"
            style={{ backgroundColor: project.imageBackground }}
          >
            {pageImages.map((image, index) => {
              const leadImage =
                pageImages.length === 1 || (pageImages.length === 3 && index === 0);

              return (
                <figure
                  key={`${image.src}-${page * IMAGES_PER_PAGE + index}`}
                  className={`overflow-hidden rounded-xl ${leadImage ? "col-span-2" : ""}`}
                >
                  <a
                    href={image.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open full-size image in a new tab: ${image.alt}`}
                    className="group/photo relative block overflow-hidden focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-accent"
                    style={{ backgroundColor: project.imageBackground }}
                  >
                    <div className={`relative ${leadImage ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1120px) 270px, (min-width: 768px) 25vw, 50vw"
                        className={`${
                          image.fit === "cover"
                            ? "object-cover"
                            : "object-contain p-3 sm:p-5"
                        } transition-transform duration-500 ease-out motion-reduce:transition-none group-hover/photo:scale-[1.04] group-focus-visible/photo:scale-[1.04]`}
                      />
                      <span className="absolute bottom-3 right-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-background/95 px-4 text-sm font-medium text-foreground shadow-sm transition-[opacity,transform] duration-200 motion-reduce:transition-none md:translate-y-1 md:opacity-0 md:group-hover/photo:translate-y-0 md:group-hover/photo:opacity-100 md:group-focus-visible/photo:translate-y-0 md:group-focus-visible/photo:opacity-100">
                        Open image
                        <ArrowUpRight aria-hidden="true" size={16} />
                      </span>
                    </div>
                  </a>
                  {image.caption && (
                    <figcaption className="bg-background/90 px-4 py-3 text-sm leading-relaxed text-muted">
                      {image.caption}
                    </figcaption>
                  )}
                </figure>
              );
            })}
          </div>

          {pageCount > 1 && (
            <nav
              aria-label="Project photo pages"
              className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5"
            >
              <p aria-live="polite" aria-atomic="true" className="text-sm text-muted">
                Showing {page * IMAGES_PER_PAGE + 1}–
                {Math.min((page + 1) * IMAGES_PER_PAGE, images.length)} of {images.length} photos
              </p>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  aria-label="Show previous photos"
                  disabled={page === 0}
                  onClick={() => movePage(-1)}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <ChevronLeft aria-hidden="true" size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Show next photos"
                  disabled={page === pageCount - 1}
                  onClick={() => movePage(1)}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <ChevronRight aria-hidden="true" size={18} />
                </button>
              </div>
            </nav>
          )}
        </>
      ) : (
        <div
          className="flex aspect-[4/3] flex-col justify-between p-7 text-[#1f3318] sm:p-10"
          style={{ backgroundColor: project.imageBackground }}
        >
          <span className="text-sm font-medium">
            {project.visualLabel ?? project.industry}
          </span>
          <p className="max-w-[12ch] text-5xl font-bold leading-none tracking-tight">
            {project.visualTitle ?? project.title}
          </p>
          <p className="max-w-sm border-t border-[#1f3318]/25 pt-3 text-base font-semibold">
            {project.impact.figure ?? project.tagline}
          </p>
        </div>
      )}
    </div>
  );
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !project) return;

    const smoother = ScrollSmoother.get();
    smoother?.paused(true);
    if (!dialog.open) dialog.showModal();
    closeButtonRef.current?.focus({ preventScroll: true });

    return () => {
      if (dialog.open) dialog.close();
      smoother?.paused(false);
    };
  }, [project]);

  function dismiss() {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={project ? `project-title-${project.slug}` : undefined}
      onCancel={(event) => {
        event.preventDefault();
        dismiss();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dismiss();
      }}
      className="project-modal m-auto max-h-[88dvh] w-[calc(100%-2rem)] max-w-[1120px] overflow-y-auto rounded-2xl border border-border bg-background p-0 text-foreground shadow-[0_28px_100px_rgba(0,0,0,0.28)] backdrop:bg-foreground/55 backdrop:backdrop-blur-sm"
    >
      {project && (
        <>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close project details"
            onClick={dismiss}
            className="sticky top-3 z-30 -mb-11 ml-auto mr-3 mt-3 inline-flex size-11 items-center justify-center rounded-full border border-border bg-background/95 text-xl text-foreground shadow-sm transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span aria-hidden="true">×</span>
          </button>

          <div className="grid md:grid-cols-[1.1fr_0.9fr]">
            <ProjectGallery key={project.slug} project={project} />

            <div className="flex flex-col gap-7 px-6 py-8 sm:px-9 sm:py-10 md:px-10 md:py-12">
              <div className="space-y-3 pr-9">
                <h2
                  id={`project-title-${project.slug}`}
                  className="text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.045em] text-foreground"
                >
                  {project.title}
                </h2>
                <p className="text-lg leading-relaxed text-accent">
                  {project.tagline}
                </p>
              </div>

              <p className="text-base leading-relaxed text-muted">
                {project.description}
              </p>

              <section aria-labelledby={`project-impact-${project.slug}`}>
                <h3
                  id={`project-impact-${project.slug}`}
                  className="mb-2 text-sm font-semibold text-accent"
                >
                  Impact
                </h3>
                {project.impact.figure && (
                  <p className="mb-2 text-xl font-bold leading-snug text-foreground">
                    {project.impact.figure}
                  </p>
                )}
                <p className="text-base leading-relaxed text-foreground">
                  {project.impact.result}
                </p>
              </section>

              <section aria-labelledby={`project-built-with-${project.slug}`}>
                <h3
                  id={`project-built-with-${project.slug}`}
                  className="mb-2 text-sm font-semibold text-accent"
                >
                  Built with
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {project.services.join(", ")}
                </p>
              </section>

              <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4 text-sm text-muted">
                <span>{project.industry}</span>
                {project.year && <span>{project.year}</span>}
              </div>

              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 w-fit items-center rounded-full border border-accent/60 px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  View case study
                </a>
              )}
            </div>
          </div>
        </>
      )}
    </dialog>
  );
}
