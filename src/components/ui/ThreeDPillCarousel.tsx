"use client";

import { motion } from "motion/react";
import {
  useEffect,
  useState,
  startTransition,
  type CSSProperties,
} from "react";

export type ThreeDPillItem = {
  image: { src: string; alt?: string };
  link?: string;
};

type ThreeDPillCarouselProps = {
  items?: ThreeDPillItem[];
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  backgroundColor?: string;
  cardBorderRadius?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  style?: CSSProperties;
  cardShadow?: string;
  transitionDuration?: number;
  hoverScale?: number;
  hoverBrightness?: number;
  activeBorderWidth?: number;
  activeBorderColor?: string;
};

const DEFAULT_ITEMS: ThreeDPillItem[] = [
  {
    image: {
      src: "./aboutSection/blueCode2.jpg",
      alt: "Image 1",
    },
    link: "",
  },
  {
    image: {
      src: "/awards/awards.jpeg",
      alt: "Image 2",
    },
    link: "",
  },
  {
    image: {
      src: "./debate/debate2.jpeg",
      alt: "Image 3",
    },
    link: "",
  },
  {
    image: {
      src: "./speaker/speaker2.jpeg",
      alt: "Image 4",
    },
    link: "",
  },
];

export function ThreeDPillCarousel({
  items = DEFAULT_ITEMS,
  activeIndex: controlledActiveIndex,
  onActiveIndexChange,
  backgroundColor = "#6B2C2C",
  cardBorderRadius = 200,
  autoPlay = true,
  autoPlayInterval = 3000,
  style,
  cardShadow = "0 20px 60px rgba(0, 0, 0, 0.3)",
  transitionDuration = 0.6,
  hoverScale = 1.05,
  hoverBrightness = 1.15,
  activeBorderWidth = 6,
  activeBorderColor = "#FFFFFF",
}: ThreeDPillCarouselProps) {
  const isControlled = controlledActiveIndex !== undefined;
  const [internalIndex, setInternalIndex] = useState(0);
  const currentIndex = isControlled ? controlledActiveIndex : internalIndex;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [containerHovered, setContainerHovered] = useState(false);

  const validItems = items.filter((item) => item?.image?.src);

  const updateIndex = (next: number) => {
    if (!isControlled) {
      startTransition(() => setInternalIndex(next));
    }
    onActiveIndexChange?.(next);
  };

  // Arrow keys advance the carousel only while the cursor is over it — keeps
  // page-level keyboard navigation working when the user isn't focused on this.
  useEffect(() => {
    if (!containerHovered || validItems.length <= 1) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        updateIndex((currentIndex + 1) % validItems.length);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        updateIndex(
          (currentIndex - 1 + validItems.length) % validItems.length,
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerHovered, validItems.length, currentIndex]);

  // Auto-play is disabled in controlled mode — the parent drives the index.
  useEffect(() => {
    if (isControlled || !autoPlay || validItems.length <= 1) return;
    const interval = window.setInterval(() => {
      startTransition(() => {
        setInternalIndex((prev) => (prev + 1) % validItems.length);
      });
    }, autoPlayInterval);
    return () => window.clearInterval(interval);
  }, [autoPlay, autoPlayInterval, validItems.length, isControlled]);

  const handleCardClick = (index: number) => {
    updateIndex(index);
  };

  const getCardStyle = (index: number): CSSProperties => {
    const diff = (index - currentIndex + validItems.length) % validItems.length;
    const isHovered = hoveredIndex === index;

    if (diff === 0) {
      return {
        transform: "translateX(-50%) translateY(-50%) scale(1)",
        zIndex: 50,
        opacity: 1,
        left: "50%",
        top: "50%",
        filter: "blur(0px) brightness(1)",
      };
    }
    if (diff === 1 || diff === -validItems.length + 1) {
      return {
        transform: `translateX(-50%) translateY(-50%) scale(${isHovered ? 0.85 * hoverScale : 0.85})`,
        zIndex: 40,
        opacity: isHovered ? 1 : 0.95,
        left: "88%",
        top: "34%",
        filter: `blur(0.5px) brightness(${isHovered ? hoverBrightness : 1})`,
      };
    }
    if (diff === 2 || diff === -validItems.length + 2) {
      return {
        transform: `translateX(-50%) translateY(-50%) scale(${isHovered ? 0.7 * hoverScale : 0.7})`,
        zIndex: 30,
        opacity: isHovered ? 0.9 : 0.85,
        left: "122%",
        top: "22%",
        filter: `blur(1.5px) brightness(${isHovered ? hoverBrightness : 1})`,
      };
    }
    if (diff === validItems.length - 1 || diff === -1) {
      return {
        transform: `translateX(-50%) translateY(-50%) scale(${isHovered ? 0.85 * hoverScale : 0.85})`,
        zIndex: 40,
        opacity: isHovered ? 1 : 0.95,
        left: "12%",
        top: "66%",
        filter: `blur(0.5px) brightness(${isHovered ? hoverBrightness : 1})`,
      };
    }
    if (diff === validItems.length - 2 || diff === -2) {
      return {
        transform: `translateX(-50%) translateY(-50%) scale(${isHovered ? 0.7 * hoverScale : 0.7})`,
        zIndex: 30,
        opacity: isHovered ? 0.9 : 0.85,
        left: "-22%",
        top: "78%",
        filter: `blur(1.5px) brightness(${isHovered ? hoverBrightness : 1})`,
      };
    }
    return {
      transform: "translateX(-50%) translateY(-50%) scale(0.5)",
      zIndex: 10,
      opacity: 0,
      left: "50%",
      top: "50%",
      filter: "blur(3px) brightness(1)",
    };
  };

  if (validItems.length === 0) {
    return (
      <div
        style={{
          ...style,
          position: "relative",
          width: "100%",
          height: "100%",
          backgroundColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFFFFF",
          fontSize: "16px",
        }}
      >
        Add images to the carousel
      </div>
    );
  }

  return (
    <div
      style={{
        ...style,
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor,
        overflow: "hidden",
      }}
      onMouseEnter={() => setContainerHovered(true)}
      onMouseLeave={() => setContainerHovered(false)}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "280px",
          height: "100%",
        }}
      >
        {validItems.map((item, index) => {
          const cardStyle = getCardStyle(index);
          const isCenter =
            (index - currentIndex + validItems.length) % validItems.length === 0;

          return (
            <motion.div
              key={index}
              style={{
                position: "absolute",
                width: "100%",
                height: "60%",
                ...cardStyle,
                transition: `all ${transitionDuration}s cubic-bezier(0.4, 0, 0.2, 1)`,
                cursor: isCenter ? "default" : "pointer",
              }}
              onClick={() => !isCenter && handleCardClick(index)}
              onMouseEnter={() => !isCenter && setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  borderRadius: `${cardBorderRadius}px`,
                  overflow: "hidden",

                  transition: "box-shadow 0.3s ease",
                  border: isCenter
                    ? `${activeBorderWidth}px solid ${activeBorderColor}`
                    : "none",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image?.src || ""}
                  alt={item.image?.alt || "Carousel image"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
