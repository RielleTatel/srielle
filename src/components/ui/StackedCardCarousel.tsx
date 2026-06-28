"use client";

import { motion, type PanInfo } from "motion/react";
import { useEffect, useRef, useState, startTransition } from "react";

export type StackedCardItem = {
  image: { src: string; alt?: string };
  title: string;
  category: string;
};

type FontStyle = {
  fontSize: string;
  variant?: string;
  letterSpacing?: string;
  lineHeight?: string;
};

type StackedCardCarouselProps = {
  cards?: StackedCardItem[];
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  backgroundColor?: string;
  cardBackground?: string;
  textColor?: string;
  metadataColor?: string;
  categoryBackground?: string;
  categoryTextColor?: string;
  titleFont?: FontStyle;
  metadataFont?: FontStyle;
  categoryFont?: FontStyle;
  scrollSensitivity?: number;
  scrollDirection?: "natural" | "reverse";
  cardBorderRadius?: number;
  cardSpacing?: number;
  scaleReduction?: number;
  animationSpeed?: number;
  dragThreshold?: number;
  cardPadding?: number;
  imageBorderRadius?: number;
  contentPadding?: number;
  forceMobileView?: boolean;
};

export const STACKED_CARD_DEFAULTS: StackedCardItem[] = [
  {
    image: {
      src: "./aboutSection/blueCode.jpg",
      alt: "Abstract gradient 1",
    },
    title:
      "Exploring the intersection of artificial intelligence and creative design systems. How machine learning algorithms are reshaping the future of digital product development and user experience optimization.",
    category: "AI & Design",
  },
  {
    image: {
      src: "./awards/awards2.jpg",
      alt: "Abstract gradient 2",
    },
    title:
      "Neural networks and deep learning architectures are revolutionizing how we approach complex computational problems. Discover the latest breakthroughs in transformer models and attention mechanisms.",
    category: "Deep Learning",
  },
  {
    image: {
      src: "./debate/debate1.jpg",
      alt: "Abstract gradient 3",
    },

    title:
      "/speaker/speaker2.jpg",
    category: "NLP",
  },
  {
    image: {
      src: "./speaker/speaker1.jpg",
      alt: "Abstract gradient 4",
    },

    title:
      "Computer vision and image recognition technologies are powering autonomous systems, medical diagnostics, and augmented reality experiences. The future of visual AI is here.",
    category: "Computer Vision",
  },
];

export function StackedCardCarousel({
  cards = STACKED_CARD_DEFAULTS,
  activeIndex: controlledActiveIndex,
  onActiveIndexChange,
  backgroundColor = "transparent",
  cardBackground = "color-mix(in srgb, var(--background) 60%, transparent)",
  textColor = "var(--foreground)",
  metadataColor = "var(--muted)",
  categoryBackground = "color-mix(in srgb, var(--foreground) 6%, transparent)",
  categoryTextColor = "var(--muted)",
  titleFont = {
    fontSize: "22px",
    variant: "Semibold",
    letterSpacing: "-0.01em",
    lineHeight: "1.4em",
  },
  metadataFont = {
    fontSize: "13px",
    variant: "Medium",
    letterSpacing: "0em",
    lineHeight: "1.4em",
  },
  categoryFont = {
    fontSize: "13px",
    variant: "Medium",
    letterSpacing: "-0.01em",
    lineHeight: "1em",
  },
  scrollSensitivity = 1,
  scrollDirection = "reverse",
  cardBorderRadius = 16,
  cardSpacing = 40,
  scaleReduction = 0.08,
  animationSpeed = 260,
  dragThreshold = 50,
  cardPadding = 32,
  imageBorderRadius = 20,
  contentPadding = 40,
  forceMobileView = false,
}: StackedCardCarouselProps) {
  const isControlled = controlledActiveIndex !== undefined;
  const [internalActiveIndex, setInternalActiveIndex] = useState(0);
  const activeIndex = isControlled ? controlledActiveIndex : internalActiveIndex;
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateActiveIndex = (next: number) => {
    if (!isControlled) {
      startTransition(() => setInternalActiveIndex(next));
    }
    onActiveIndexChange?.(next);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => {
      startTransition(() => {
        setIsMobile(forceMobileView || window.innerWidth < 768);
      });
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [forceMobileView]);

  // Wheel-to-navigate: accumulate deltaY, advance on settle.
  // Disabled in controlled mode — the parent (e.g. ScrollTrigger) owns scroll.
  useEffect(() => {
    if (isControlled) return;
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout: number | undefined;
    let accumulatedDelta = 0;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling) return;
      accumulatedDelta += e.deltaY;

      if (scrollTimeout) window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        if (Math.abs(accumulatedDelta) > scrollSensitivity) {
          setIsScrolling(true);
          const scrollDown = accumulatedDelta > 0;
          const shouldAdvance =
            scrollDirection === "natural" ? scrollDown : !scrollDown;

          if (shouldAdvance && activeIndex < cards.length - 1) {
            updateActiveIndex(activeIndex + 1);
          } else if (!shouldAdvance && activeIndex > 0) {
            updateActiveIndex(activeIndex - 1);
          }
          window.setTimeout(() => setIsScrolling(false), 600);
        }
        accumulatedDelta = 0;
      }, 50);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, cards.length, isScrolling, scrollSensitivity, scrollDirection, isControlled]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    setIsDragging(false);
    if (info.offset.x > dragThreshold && activeIndex > 0) {
      updateActiveIndex(activeIndex - 1);
    } else if (
      info.offset.x < -dragThreshold &&
      activeIndex < cards.length - 1
    ) {
      updateActiveIndex(activeIndex + 1);
    }
  };

  const handleCardClick = (index: number) => {
    if (index !== activeIndex && !isDragging) {
      updateActiveIndex(index);
    }
  };

  const getCardStyle = (index: number) => {
    const offset = index - activeIndex;
    const isViewed = index < activeIndex;
    const isActive = offset === 0;

    // Viewed cards exit downward — drives the "slide away" motion when a card
    // is dismissed. Position kept off-screen so they stay hidden at rest.
    if (isViewed) {
      return {
        x: 0,
        y: isMobile ? 600 : 800,
        scale: 0.9,
        opacity: 0,
        zIndex: cards.length + index + 100,
        rotateX: 15,
        rotateZ: 0,
      };
    }

    if (isActive) {
      return {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        zIndex: cards.length,
        rotateX: 0,
        rotateZ: 0,
      };
    }

    // Queued (future) cards: stacked upward in their resting offset so the
    // next-active card animates in *from* the stack position, giving the
    // original stacking transition — but opacity 0 keeps them invisible.
    if (isMobile) {
      const mobileReduction = offset * (offset * 0.05 * 0.625);
      return {
        x: 0,
        y: offset * (cardSpacing * -0.2),
        scale: Math.max(0.7, 1 - mobileReduction),
        opacity: 0,
        zIndex: cards.length - offset,
        rotateX: 0,
        rotateZ: 0,
      };
    }

    const desktopReduction = offset * (offset * scaleReduction);
    return {
      x: 0,
      y: offset * -cardSpacing,
      scale: Math.max(0.6, 1 - desktopReduction),
      opacity: 0,
      zIndex: cards.length - offset,
      rotateX: 0,
      rotateZ: 0,
    };
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        padding: isMobile ? "20px" : "10px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          maxWidth: isMobile ? "100%" : "1500px",
          maxHeight: isMobile ? "100%" : "600px",
          perspective: "1500px",
        }}
      >
        {cards.map((card, index) => {
          const style = getCardStyle(index);
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={index}
              drag={isActive ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
              onClick={() => handleCardClick(index)}
              animate={style}
              transition={{
                type: "spring",
                stiffness: animationSpeed,
                damping: 30,
              }}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: cardBackground,
                border: "2px solid var(--border)",
                borderRadius: `${cardBorderRadius}px`,
                cursor: isActive ? "grab" : "default",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                userSelect: "none",
                pointerEvents: isActive ? "auto" : "none",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "60%",
                  padding: isMobile
                    ? `${cardPadding * 0.625}px ${cardPadding * 0.625}px 0 ${cardPadding * 0.625}px`
                    : `${cardPadding}px ${cardPadding}px 0 ${cardPadding}px`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: isMobile
                      ? `${imageBorderRadius * 0.8}px`
                      : `${imageBorderRadius}px`,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.image?.src}
                    alt={card.image?.alt || "Card image"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  height: "40%",
                  padding: isMobile
                    ? `${contentPadding * 0.625}px`
                    : `${contentPadding}px`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                }} 
              >

                
                <div>  

                  <span
                    style={{
                      backgroundColor: categoryBackground,
                      color: categoryTextColor,
                      padding: isMobile ? "6px 14px" : "8px 16px",
                      borderRadius: "20px",
                      ...categoryFont,
                      fontSize: isMobile
                        ? `${parseFloat(categoryFont.fontSize) * 0.85}px`
                        : categoryFont.fontSize,
                    }}
                  >
                    {card.category}
                  </span> 
                  <p
                    style={{
                      margin: 0,
                      color: metadataColor,
                      ...metadataFont,
                      fontSize: isMobile
                        ? `${parseFloat(metadataFont.fontSize) * 0.85}px`
                        : metadataFont.fontSize,
                      marginBottom: isMobile ? "12px" : "16px",
                    }}
                  >
   
                  </p>
                  <h2
                    style={{
                      margin: 0,
                      color: textColor,
                      ...titleFont,
                      fontSize: isMobile
                        ? `${parseFloat(titleFont.fontSize) * 0.7}px`
                        : titleFont.fontSize,
                      lineHeight: "1.4",
                    }}
                  >
                    {card.title}
                  </h2> 

                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: isMobile ? "12px" : "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
          zIndex: 1000,
        }}
      >
        {cards.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => updateActiveIndex(index)}
            style={{
              width: index === activeIndex ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              backgroundColor: index === activeIndex ? textColor : metadataColor,
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s",
              opacity: index === activeIndex ? 1 : 0.4,
            }}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
