import Image from "next/image";
import { MapPin } from "lucide-react";
import { ExperienceDetails } from "@/components/sections/ExperienceDetails";
import { experience } from "@/data/experience";
import styles from "./Experience.module.css";

// Static brand-led cards: DESIGN_VARIANCE 6, MOTION_INTENSITY 1,
// VISUAL_DENSITY 3. Full descriptions open in a native dialog.
export function Experience() {
  return (
    <section
      id="experience"
      className={styles.section}
      aria-labelledby="about-experience-title"
    >
      <header className={styles.heading}>
        <h2 id="about-experience-title">Experience</h2>
      </header>
      <div className={styles.cards}>
        {experience.map((role) => (
          <article
            key={role.id}
            className={styles.card}
            data-company={role.id}
            aria-labelledby={`experience-${role.id}-title`}
          >
            <div className={styles.meta}>
              {role.kind && <span className={styles.kind}>{role.kind}</span>}
              {role.period && <p className={styles.period}>{role.period}</p>}
            </div>

            <header className={styles.cardHeader}>
              {role.logo && (
                <Image
                  src={role.logo.src}
                  alt={role.logo.alt}
                  width={72}
                  height={72}
                  sizes={role.id === "freelance"
                    ? "(min-width: 768px) 96px, 76px"
                    : "(min-width: 768px) 72px, 60px"}
                  className={`${styles.logo} ${role.id === "freelance" ? styles.personalLogo : ""}`}
                />
              )}

              <div className={styles.identity}>
                <p className={styles.company}>{role.company}</p>
                <h3 id={`experience-${role.id}-title`}>{role.title}</h3>
              </div>
            </header>

            <div className={styles.cardFooter}>
              {role.city && (
                <p className={styles.location}>
                  <MapPin size={14} strokeWidth={1.5} aria-hidden="true" />
                  <span>{role.city}</span>
                </p>
              )}
            </div>
            <ExperienceDetails role={role} />
          </article>
        ))}
      </div>
    </section>
  );
}
