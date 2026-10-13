import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { experience, type Role } from "@/data/experience";
import { projects } from "@/data/projects";
import styles from "./Experience.module.css";

// Brand-led cards, no modal: impact figures lead, a compressed summary and
// the stack follow. Freelance lists its shipped projects instead of bullets.
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

            {role.city && (
              <p className={styles.location} title={role.location}>
                <MapPin size={14} strokeWidth={1.5} aria-hidden="true" />
                <span>{role.city}</span>
              </p>
            )}

            <RoleBody role={role} />
          </article>
        ))}
      </div>
    </section>
  );
}

function RoleBody({ role }: { role: Role }) {
  const roleProjects = (role.projectSlugs ?? [])
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project) => project !== undefined);

  return (
    <>
      {role.metrics.length > 0 && (
        <dl className={styles.metrics}>
          {role.metrics.map((metric) => (
            <div key={metric.label} className={styles.metric}>
              <dt className={styles.metricLabel}>{metric.label}</dt>
              <dd className={styles.metricFigure}>{metric.figure}</dd>
            </div>
          ))}
        </dl>
      )}

      {role.highlights.length > 0 && (
        <ul className={styles.highlights}>
          {role.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      )}

      {roleProjects.length > 0 && (
        <ul className={styles.projects}>
          {roleProjects.map((project) => (
            <li key={project.slug} className={styles.project}>
              <div className={styles.projectCopy}>
                <h4>{project.title}</h4>
                <p>{project.tagline}</p>
                <p className={styles.projectStack}>{project.services.join(", ")}</p>
              </div>
              <p className={styles.projectFigure}>{project.impact.figure}</p>
            </li>
          ))}
        </ul>
      )}

      {role.stack && (
        <ul className={styles.stack} aria-label="Technologies used">
          {role.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}

      {roleProjects.length > 0 && (
        <Link href="/#projects" className={styles.more}>
          See full case studies <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
        </Link>
      )}
    </>
  );
}
