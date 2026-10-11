import type { ReactNode } from "react";
import Image from "next/image";
import { Network, Sparkles } from "lucide-react";

type TechItem = {
  name: string;
  icon: ReactNode;
};

// Local Devicon assets avoid a CDN dependency and keep logos visible in both palettes.
const brandIcon = (slug: string) => (
  <Image
    src={`/brand-icons/${slug}.svg`}
    alt=""
    width={20}
    height={20}
    className="rounded-sm bg-[#fdfdfc] p-0.5"
  />
);

const TECH: TechItem[] = [
  { name: "React", icon: brandIcon("react") },
  { name: "Next.js", icon: brandIcon("nextjs") },
  { name: "TypeScript", icon: brandIcon("typescript") },
  { name: "Node.js", icon: brandIcon("nodejs") },
  { name: "Python", icon: brandIcon("python") },
  { name: "Django", icon: brandIcon("django") },
  { name: "PostgreSQL", icon: brandIcon("postgresql") },
  { name: "REST API", icon: <Network size={20} strokeWidth={1.75} /> },
  { name: "AI Integration", icon: <Sparkles size={20} strokeWidth={1.75} /> },
];

type TechMarqueeProps = {
  reverse?: boolean;
  durationSeconds?: number;
};

export function TechMarquee({
  reverse = false,
  durationSeconds = 35,
}: TechMarqueeProps = {}) {
  const loop = [...TECH, ...TECH];

  return (
    <div
      className="tech-marquee relative w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <ul
        className="tech-marquee-track flex w-max items-center gap-3"
        style={{
          animation: `marquee-scroll ${durationSeconds}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {loop.map((item, i) => (
          <li
            key={`${item.name}-${i}`}
            className="flex shrink-0 items-center gap-2.5 rounded-full border border-border bg-foreground/[0.04] px-5 py-2.5 text-sm font-medium text-foreground/80"
            aria-hidden={i >= TECH.length ? true : undefined}
          >
            <span className="flex h-5 w-5 items-center justify-center">
              {item.icon}
            </span>
            <span className="whitespace-nowrap">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
