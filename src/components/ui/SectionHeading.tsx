import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  heading?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  heading: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <header className={twMerge("mb-16 flex flex-col gap-4", className)}>
      {eyebrow ? (
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          {eyebrow}
        </span>
      ) : null}
      <Heading className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl">
        {title}
      </Heading>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
