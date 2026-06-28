export type Project = {
  slug: string;
  title: string;
  tagline?: string;
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
    slug: "ateneo-health-management-system",
    title: "Ateneo Health Management System",
    tagline: "A centralized health records platform for smarter campus healthcare.",
    description:
      "Developed a full-stack health management system that streamlines the management of student medical records, consultations, and health monitoring within Ateneo de Zamboanga University. The platform digitizes healthcare workflows, improving accessibility, data organization, and operational efficiency for both healthcare personnel and students.",
    services: ["Django", "PostgreSQL", "Python", "REST API"],
    industry: "Healthcare",
    year: "2025",
    image: {
      src: "/projects/uhms.png",
      alt: "Ateneo Health Management System dashboard",
    },
    imageBackground: "#cfdfa9",
  },
  {
    slug: "multi-branch-inventory-management-system",
    title: "Multi-Branch Inventory Management System",
    tagline: "Optimizing inventory operations across multiple business locations.",
    description:
      "Developed a full-stack inventory management platform built for multi-branch operations, providing centralized inventory management, stock transfers, analytics, and real-time reporting across locations. Designed to improve operational efficiency through accurate inventory visibility, streamlined inventory workflows, and scalable data management.",
    services: ["React", "Node.js", "PostgreSQL", "TypeScript"],
    industry: "Retail & Logistics",
    year: "2025",
    image: {
      src: "/projects/ims.png",
      alt: "Multi-branch inventory dashboard",
    },
    imageBackground: "#e8d5c4",
  },
  {
    slug: "magis-directory",
    title: "Magis Directory",
    tagline: "An intelligent campus directory designed to make information more accessible.",
    description:
      "Built an AI-powered organizational directory that helps students discover university organizations, leadership information, events, and opportunities within Ateneo de Zamboanga University. By combining structured organizational data with an AI-assisted search experience, the platform makes navigating campus life more intuitive while connecting students with organizations that match their interests.",
    services: ["Next.js", "React", "TypeScript", "AI Integration", "PostgreSQL"],
    industry: "Education",
    year: "2025",
    image: {
      src: "/projects/magis.png",
      alt: "Magis Directory interface",
    },
    imageBackground: "#c9d8e8",
  },
];
