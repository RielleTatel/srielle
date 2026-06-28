import type { ReactNode } from "react";
import { Network, Sparkles } from "lucide-react";

type TechItem = {
  name: string;
  icon: ReactNode;
};

// Brand glyphs via Simple Icons CDN (no install needed). Generic concepts
// without a brand mark fall back to lucide-react icons.
const simpleIcon = (slug: string, color: string, label: string) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={`https://cdn.simpleicons.org/${slug}/${color}`}
    alt={label}
    width={20}
    height={20}
    loading="lazy"
  />
);

const TECH: TechItem[] = [
  { name: "React", icon: simpleIcon("react", "61DAFB", "React") },
  { name: "Next.js", icon: simpleIcon("nextdotjs", "FFFFFF", "Next.js") },
  { name: "TypeScript", icon: simpleIcon("typescript", "3178C6", "TypeScript") },
  { name: "Node.js", icon: simpleIcon("nodedotjs", "5FA04E", "Node.js") },
  { name: "Python", icon: simpleIcon("python", "3776AB", "Python") },
  { name: "Django", icon: simpleIcon("django", "0C4B33", "Django") },
  { name: "PostgreSQL", icon: simpleIcon("postgresql", "4169E1", "PostgreSQL") },
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
      className="relative w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <ul
        className="flex w-max items-center gap-3"
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
