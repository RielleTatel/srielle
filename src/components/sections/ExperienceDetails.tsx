"use client";

import { memo, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, MapPin, X } from "lucide-react";
import type { Role } from "@/data/experience";
import styles from "./Experience.module.css";

function Highlight({ text }: { text: string }) {
  return text.split(/(100,000\+ records|500\+ thesis records)/g).map((part, index) => (
    part === "100,000+ records" || part === "500+ thesis records"
      ? <strong key={index}>{part}</strong>
      : part
  ));
}

export const ExperienceDetails = memo(function ExperienceDetails({ role }: { role: Role }) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;

    const root = document.documentElement;
    const body = document.body;
    const rootOverflow = root.style.overflow;
    const bodyOverflow = body.style.overflow;
    const opener = openerRef.current;
    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });

    return () => {
      if (dialog.open) dialog.close();
      root.style.overflow = rootOverflow;
      body.style.overflow = bodyOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        className={styles.openButton}
        aria-label={`View details for ${role.company}`}
        aria-haspopup="dialog"
        onClick={() => setIsOpen(true)}
      >
        <span className={styles.buttonLabel}>
          View details
          <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby={`experience-${role.id}-details-title`}
        onClose={() => setIsOpen(false)}
        onKeyDown={(event) => {
          if (event.key === "Tab") {
            event.preventDefault();
            closeRef.current?.focus();
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setIsOpen(false);
        }}
      >
        <div className={styles.dialogBody}>
          <button
            ref={closeRef}
            type="button"
            className={styles.closeButton}
            aria-label="Close experience details"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>

          <header className={styles.dialogHeading}>
            {role.logo && (
              <Image
                src={role.logo.src}
                alt={role.logo.alt}
                width={64}
                height={64}
                sizes="64px"
                className={`${styles.dialogLogo} ${role.id === "freelance" ? styles.personalLogo : ""}`}
              />
            )}
            <div>
              <p className={styles.company}>{role.company}</p>
              <h2 id={`experience-${role.id}-details-title`}>{role.title}</h2>
            </div>
          </header>

          {role.period && <p className={styles.dialogPeriod}>{role.period}</p>}
          {role.location && (
            <p className={styles.dialogLocation}>
              <MapPin size={15} strokeWidth={1.5} aria-hidden="true" />
              <span>{role.location}</span>
            </p>
          )}

          {role.highlights.length > 1 ? (
            <ul className={styles.highlights}>
              {role.highlights.map((highlight) => (
                <li key={highlight}><Highlight text={highlight} /></li>
              ))}
            </ul>
          ) : (
            <p className={styles.description}>{role.highlights[0]}</p>
          )}
        </div>
      </dialog>
    </>
  );
});
