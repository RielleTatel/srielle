"use client";

import { memo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Affiliation } from "@/data/affiliations";
import styles from "./Affiliations.module.css";

// Reference-led fanned deck: DESIGN_VARIANCE 8, MOTION_INTENSITY 5,
// VISUAL_DENSITY 3. Finite transitions show which affiliation moves forward.
// Coverflow reference: https://github.com/nolimits4web/swiper/blob/master/demos/240-effect-coverflow.html
// Native transforms keep this small content carousel dependency-free.
export const AffiliationCarousel = memo(function AffiliationCarousel({ items }: { items: Affiliation[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);

  function select(index: number, focusTab = false) {
    const next = (index + items.length) % items.length;
    setActiveIndex(next);
    if (focusTab) tabs.current[next]?.focus({ preventScroll: true });
  }

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "ArrowRight") select(index + 1, true);
    else if (event.key === "ArrowLeft") select(index - 1, true);
    else if (event.key === "Home") select(0, true);
    else if (event.key === "End") select(items.length - 1, true);
    else return;
    event.preventDefault();
  }

  function finishSwipe(event: PointerEvent<HTMLDivElement>) {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;
    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      suppressClick.current = true;
      select(activeIndex + (deltaX < 0 ? 1 : -1));
    }
  }

  if (!items.length) return <p className={styles.empty}>Affiliations will be added soon.</p>;

  return (
    <div role="group" aria-roledescription="carousel" aria-label="Affiliations">
      <div
        className={styles.stage}
        onPointerDown={(event) => {
          suppressClick.current = false;
          if (event.pointerType === "touch") pointerStart.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerUp={finishSwipe}
        onPointerCancel={() => { pointerStart.current = null; }}
        onClickCapture={(event) => {
          if (suppressClick.current) {
            event.preventDefault();
            event.stopPropagation();
            suppressClick.current = false;
          }
        }}
      >
        {items.map((item, index) => {
          let offset = (index - activeIndex + items.length) % items.length;
          if (offset > Math.floor(items.length / 2)) offset -= items.length;
          const isActive = offset === 0;
          const [membership, formerRole] = item.role.split(", former ");

          return (
            <article key={item.id} className={styles.card} data-offset={offset} aria-hidden={Math.abs(offset) > 1}>
              <div
                id={`affiliation-${item.id}-panel`}
                role="tabpanel"
                aria-labelledby={`affiliation-${item.id}-tab`}
                aria-hidden={!isActive}
                inert={!isActive}
                className={styles.cardContent}
              >
                <p className={styles.membership}>{membership}</p>
                <div className={styles.brand}>
                  <Image
                    src={item.logo.src}
                    alt={item.logo.alt}
                    width={72}
                    height={72}
                    sizes="(min-width: 768px) 72px, 56px"
                    className={styles.logo}
                  />
                  <h3>{item.name}</h3>
                </div>
                {formerRole && <p className={styles.history}>Former {formerRole}</p>}
              </div>
              {!isActive && (
                <button
                  type="button"
                  tabIndex={-1}
                  className={styles.selectCard}
                  aria-label={`Show ${item.name} affiliation`}
                  onClick={() => select(index, true)}
                />
              )}
            </article>
          );
        })}
      </div>

      <div className={styles.controls}>
        <button type="button" aria-label="Previous affiliation" onClick={() => select(activeIndex - 1)}>
          <ArrowLeft size={19} strokeWidth={1.5} aria-hidden="true" />
        </button>
        <div className={styles.tabs} role="tablist" aria-label="Choose an affiliation">
          {items.map((item, index) => (
            <button
              key={item.id}
              ref={(element) => { tabs.current[index] = element; }}
              id={`affiliation-${item.id}-tab`}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-controls={`affiliation-${item.id}-panel`}
              tabIndex={activeIndex === index ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={(event) => handleTabKey(event, index)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button type="button" aria-label="Next affiliation" onClick={() => select(activeIndex + 1)}>
          <ArrowRight size={19} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
      <p className={styles.srOnly} aria-live="polite" aria-atomic="true">
        {items[activeIndex].name}. {items[activeIndex].role}.
      </p>
    </div>
  );
});
