"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";

const resumeUrl = "/resume/gabrielle-tatel-resume.pdf";

export function ResumeToggle() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const openResume = () => dialogRef.current?.showModal();
  const closeResume = () => dialogRef.current?.close();

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openResume}
        className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        View résumé
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="resume-dialog-title"
        onClose={() => triggerRef.current?.focus()}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeResume();
        }}
        className="m-auto h-[65dvh] max-h-[90dvh] w-[calc(100%-1.5rem)] max-w-[900px] overflow-hidden rounded-xl border border-border bg-background p-0 text-foreground shadow-[0_28px_100px_rgba(0,0,0,0.28)] backdrop:bg-[#0f2114]/70 backdrop:backdrop-blur-sm sm:h-[min(90dvh,920px)]"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 sm:px-5">
            <h2 id="resume-dialog-title" className="text-base font-semibold">
              Résumé
            </h2>
            <div className="flex items-center gap-3 sm:gap-5">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Open PDF
                <ArrowUpRight aria-hidden="true" size={16} />
              </a>
              <button
                type="button"
                onClick={closeResume}
                aria-label="Close résumé"
                className="inline-flex size-9 items-center justify-center rounded-full border border-border text-foreground hover:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <X aria-hidden="true" size={18} />
              </button>
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-auto bg-[#e7ebe3] p-3 sm:p-6">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Gabrielle Tatel's full résumé PDF"
              className="mx-auto block max-w-[760px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <Image
                src="/resume/gabrielle-tatel-resume-preview.webp"
                alt="Gabrielle Tatel's one-page résumé"
                width={1275}
                height={1650}
                sizes="(max-width: 900px) calc(100vw - 72px), 760px"
                className="h-auto w-full bg-white shadow-sm"
                unoptimized
              />
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
