import { affiliations } from "@/data/affiliations";
import { AffiliationCarousel } from "@/components/sections/AffiliationCarousel";
import styles from "./Affiliations.module.css";

export function Affiliations() {
  return (
    <section id="affiliations" className={styles.section} aria-labelledby="about-affiliations-title">
      <header className={styles.heading}>
        <h2 id="about-affiliations-title">Affiliations</h2>
      </header>
      <AffiliationCarousel items={affiliations} />
    </section>
  );
}
