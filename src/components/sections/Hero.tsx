import Image from "next/image";
import { ArrowUpRight, Download } from "lucide-react";
import { Container } from "@/components/ui/Container";
import styles from "./Hero.module.css";

const resumeUrl = "/resume/gabrielle-tatel-resume.pdf";

export function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <Container className={styles.inner}>
        <div className={styles.intro}>
          <p className={styles.role}>Full-stack software developer</p>
          <h1 className={styles.name}>
            Gabrielle
            <br />
            Tatel.
          </h1>
          <p className={styles.mission}>
            Building software, communities, and opportunities.
          </p>
          <p className={styles.summary}>
            I build web and mobile products, enterprise systems, and useful
            tools for the people behind them.
          </p>
          <div className={styles.actions}>
            <a
              className={styles.openLink}
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read my résumé
              <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
            </a>
            <a className={styles.downloadLink} href={resumeUrl} download>
              Download PDF
              <Download aria-hidden="true" size={17} strokeWidth={1.8} />
            </a>
          </div>
        </div>

        <div className={styles.document} aria-label="Résumé preview">
          <div className={styles.documentHeader}>
            <span>Résumé</span>
            <span>Page 1 of 1</span>
          </div>
          <a
            className={styles.previewLink}
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Gabrielle Tatel's full résumé PDF in a new tab"
          >
            <Image
              src="/resume/gabrielle-tatel-resume-preview.webp"
              alt="Preview of Gabrielle Tatel's one-page résumé"
              width={1275}
              height={1650}
              sizes="(max-width: 900px) calc(100vw - 84px), 420px"
              loading="eager"
              fetchPriority="high"
              unoptimized
            />
          </a>
          <p className={styles.documentNote}>Select the page to read the full PDF.</p>
        </div>
      </Container>
    </section>
  );
}
