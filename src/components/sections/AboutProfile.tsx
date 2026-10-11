import Image from "next/image";
import { profileTools, socialProfiles } from "@/data/profile";
import styles from "./AboutProfile.module.css";

// Targeted addition to the existing paper-and-grid portfolio.
// DESIGN_VARIANCE 6 preserves the split hero; MOTION_INTENSITY 3 adds only
// interaction feedback; VISUAL_DENSITY 4 keeps the tools compact.
export function AboutProfile() {
  return (
    <div className={styles.profile}>
      <nav className={styles.socials} aria-label="Social profiles">
        {socialProfiles.map((profile) => (
          <a
            key={profile.name}
            href={profile.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${profile.name} (opens in a new tab)`}
            title={profile.name}
            className={styles.social}
          >
            <Image src={profile.logo} alt="" width={23} height={23} />
          </a>
        ))}
      </nav>

      <div className={styles.toolbox}>
        <p id="about-tools-title" className={styles.label}>Tools I work with</p>
        <ul className={styles.tools} aria-labelledby="about-tools-title">
          {profileTools.map((tool) => (
            <li key={tool.name} className={styles.tool} title={tool.name}>
              <Image src={tool.logo} alt={tool.name} width={25} height={25} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
