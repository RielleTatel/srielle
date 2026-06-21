export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  url?: string;
};

export const projects: Project[] = [
  {
    slug: "placeholder-one",
    title: "Project Name",
    description:
      "One-sentence description of the problem, what you built, and the impact.",
    tags: ["Next.js", "TypeScript", "AI"],
    year: "2025",
  },
  {
    slug: "placeholder-two",
    title: "Another Project",
    description:
      "A short, confident summary that highlights the outcome rather than the stack.",
    tags: ["React", "Postgres"],
    year: "2025",
  },
  {
    slug: "placeholder-three",
    title: "Community Platform",
    description:
      "Built for a student community — what it enabled, how many people use it.",
    tags: ["Full-Stack", "Community"],
    year: "2024",
  },
  {
    slug: "placeholder-four",
    title: "Internal Tool",
    description:
      "Replace these placeholders with your actual work in src/data/projects.ts.",
    tags: ["Tooling"],
    year: "2024",
  },
];
