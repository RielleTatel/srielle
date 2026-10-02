"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import type { Project } from "@/data/projects";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

function ProjectGallery({ project }: { project: Project }) {
  const images = project.images?.length
    ? project.images
    : project.image
      ? [project.image]
      : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  function moveSlide(direction: -1 | 1) {
    setActiveIndex((current) => (current + direction + images.length) % images.length);
  }

  if (!activeImage) {
    return (
      <div
        className="flex aspect-[16/9] flex-col justify-between p-7 text-[#1f3318] sm:p-10"
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
    );
  }

  const aspectRatio =
    activeImage.width && activeImage.height
      ? `${activeImage.width} / ${activeImage.height}`
      : "16 / 9";

  return (
    <section
      className="relative overflow-hidden rounded-t-2xl md:sticky md:top-0 md:h-full md:min-h-0 md:rounded-l-2xl md:rounded-tr-none"
      style={{ backgroundColor: project.imageBackground }}
    >
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label={`${project.title} project images`}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            moveSlide(-1);
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            moveSlide(1);
          }
        }}
        className="project-carousel-stage relative aspect-[var(--project-image-ratio)] w-full overflow-hidden md:aspect-auto md:h-full md:min-h-0"
        style={{ "--project-image-ratio": aspectRatio } as CSSProperties}
      >
        <div
          className="flex h-full w-full transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={image.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${images.length}`}
              aria-hidden={index !== activeIndex}
              className="relative h-full w-full shrink-0"
            >
              <a
                href={image.src}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={index === activeIndex ? undefined : -1}
                aria-label={`Open full-size image in a new tab: ${image.alt}`}
                className="group/photo absolute inset-0 block overflow-hidden focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-accent"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1152px) 645px, (min-width: 768px) 58vw, calc(100vw - 2rem)"
                  className={`${
                    image.fit === "contain" ? "object-contain" : "object-cover"
                  } transition-transform duration-500 ease-out motion-reduce:transition-none group-hover/photo:scale-[1.015] group-focus-visible/photo:scale-[1.015]`}
                />
                <span className="absolute bottom-4 right-4 inline-flex size-10 translate-y-1 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-sm transition-[opacity,transform] duration-200 motion-reduce:transition-none group-hover/photo:translate-y-0 group-hover/photo:opacity-100 group-focus-visible/photo:translate-y-0 group-focus-visible/photo:opacity-100">
                  <ArrowUpRight aria-hidden="true" size={18} />
                </span>
              </a>
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Show previous image"
              onClick={() => moveSlide(-1)}
              className="absolute left-4 top-1/2 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-md transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none"
            >
              <ChevronLeft aria-hidden="true" size={20} />
            </button>
            <button
              type="button"
              aria-label="Show next image"
              onClick={() => moveSlide(1)}
              className="absolute right-4 top-1/2 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-md transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none"
            >
              <ChevronRight aria-hidden="true" size={20} />
            </button>
          </>
        )}

        <p aria-live="polite" aria-atomic="true" className="sr-only">
          Image {activeIndex + 1} of {images.length}: {activeImage.alt}
        </p>
      </div>

      {images.length > 1 && (
        <nav
          aria-label={`Choose a ${project.title} image`}
          className="absolute bottom-2 left-3 z-20 flex items-center justify-center gap-0 rounded-full bg-black/45 px-1.5 py-0.5 backdrop-blur-sm"
        >
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Show image ${index + 1} of ${images.length}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => setActiveIndex(index)}
              className="group/dot inline-flex size-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
            >
              <span
                className={`block h-2 rounded-full transition-[width,background-color] duration-200 motion-reduce:transition-none ${
                  index === activeIndex
                    ? "w-7 bg-white"
                    : "w-2 bg-white/60 group-hover/dot:bg-white/90"
                }`}
              />
            </button>
          ))}
        </nav>
      )}
    </section>
  );
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !project) return;

    const smoother = ScrollSmoother.get();
    const root = document.documentElement;
    const body = document.body;
    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    smoother?.paused(true);
    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();
    closeButtonRef.current?.focus({ preventScroll: true });

    return () => {
      if (dialog.open) dialog.close();
      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyOverflow;
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
      className="project-modal m-auto max-h-[88dvh] w-[calc(100%-2rem)] max-w-[1120px] overscroll-contain overflow-y-auto rounded-2xl border border-border bg-background p-0 text-foreground shadow-[0_28px_100px_rgba(0,0,0,0.28)] backdrop:bg-foreground/55 backdrop:backdrop-blur-sm"
    >
      {project && (
        <>
          <div className="pointer-events-none sticky top-0 z-30 -mb-11 flex h-11 justify-end px-3 pt-3">
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close project details"
              onClick={dismiss}
              className="pointer-events-auto inline-flex size-11 items-center justify-center rounded-full border border-border bg-background/95 text-xl text-foreground shadow-sm transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div className="grid md:grid-cols-[1.15fr_0.85fr]">
            <ProjectGallery key={project.slug} project={project} />

            <div className="flex flex-col gap-5 px-5 py-6 sm:px-7 sm:py-7 md:gap-5 md:px-8 md:py-8">
              <div className="space-y-2 pr-9">
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

              <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4 text-sm text-muted">
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
