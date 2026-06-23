import type { CSSProperties, ReactNode } from "react";

type BlurDirection = "left" | "right" | "both";

type BlurTextEffectProps = {
  text: string;
  blurDirection?: BlurDirection;
  /** Max blur in px applied to the most-blurred character. */
  blurIntensity?: number;
  /** Percent of the string (0–100) over which the blur ramps from max to 0. */
  blurWidth?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export function BlurTextEffect({
  text,
  blurDirection = "right",
  blurIntensity = 8,
  blurWidth = 50,
  className,
  style,
}: BlurTextEffectProps) {
  const chars = Array.from(text);
  const total = chars.length;
  const threshold = blurWidth / 100;

  return (
    <span className={className} style={style}>
      {chars.map((char, i) => {
        const t = total <= 1 ? 0 : i / (total - 1);
        const dist =
          blurDirection === "both"
            ? Math.min(t, 1 - t)
            : blurDirection === "right"
              ? 1 - t
              : t;

        const blur =
          blurIntensity > 0 && threshold > 0 && dist <= threshold
            ? blurIntensity * (1 - dist / threshold)
            : 0;

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              filter: blur > 0 ? `blur(${blur}px)` : undefined,
              willChange: blur > 0 ? "filter" : undefined,
            }}
          >
            {char === " " ? " " : char}
          </span>
        );
      })}
    </span>
  );
}
