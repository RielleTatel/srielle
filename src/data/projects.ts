export type Project = {
  slug: string;
  title: string;
  description: string;
  highlight?: string;
  services: string[];
  industry?: string;
  year: string;
  image: { src: string; alt: string };
  imageBackground: string;
  url?: string;
};

export const projects: Project[] = [
  {
    slug: "milksha",
    title: "MILKSHA",
    description:
      "Reached out on a Monday. Live website with ordering and store discovery 14 days later.",
    highlight: "First contact to live in 14 days",
    services: ["UI/UX Design", "Website Development"],
    industry: "Food & Beverage",
    year: "2025",
    image: {
      src: "/projects/milksha.jpg",
      alt: "Milksha brand visual",
    },
    imageBackground: "#cfdfa9",
    url: "#",
  },
  {
    slug: "placeholder-two",
    title: "ANOTHER PROJECT",
    description:
      "A short, confident summary that highlights the outcome rather than the stack.",
    highlight: "Shipped in under a month",
    services: ["React", "Postgres"],
    industry: "SaaS",
    year: "2025",
    image: {
      src: "/projects/placeholder.jpg",
      alt: "Project visual",
    },
    imageBackground: "#e8d5c4",
  },
];
