export type ProjectImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fit?: "contain" | "cover";
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  impact: {
    figure?: string;
    result: string;
  };
  services: string[];
  industry: string;
  year?: string;
  /** Gallery images shown in the project dialog, in presentation order. */
  images?: ProjectImage[];
  /** Project card cover image and fallback when no gallery images are set. */
  image?: ProjectImage;
  imageBackground: string;
  visualTitle?: string;
  visualLabel?: string;
  url?: string;
};

export const projects: Project[] = [
  {
    slug: "autocare-plus",
    title: "AutoCare+",
    tagline: "Connecting a local shop, its field team, and vehicle owners.",
    description:
      "Built for a dedicated vehicle-care shop in Zamboanga City, AutoCare+ brings inspections, maintenance plans, service progress, and roadside requests into one shared workflow. Customers can follow their vehicle's care while staff and field teams work from the same history, even when field connectivity drops.",
    impact: {
      figure: "1 staff console + 2 mobile apps",
      result:
        "Keeps customers, shop staff, and field crews in sync around each vehicle's care.",
    },
    services: ["NestJS", "Next.js", "Expo", "PostgreSQL"],
    industry: "Vehicle care",
    image: {
      src: "/projects/autocare-cover-v2.webp",
      alt: "A hand holding a phone with the AutoCare+ vehicle care dashboard",
      width: 1800,
      height: 1890,
      fit: "contain",
    },
    images: [
      {
        src: "/projects/autocare-dashboard-v2.webp",
        alt: "AutoCare+ vehicle overview and appointment screens shown on two phones",
        width: 1800,
        height: 1890,
      },
      {
        src: "/projects/autocare-booking-roadside-v2.webp",
        alt: "AutoCare+ roadside assistance request with issue selection and map location",
        width: 1800,
        height: 1890,
      },
      {
        src: "/projects/autocare-booking-services-v2.webp",
        alt: "A hand holding the AutoCare+ screen for choosing a vehicle service",
        width: 1800,
        height: 1890,
      },
    ],
    imageBackground: "#90433e",
  },
  {
    slug: "council-of-organizations",
    title: "COA-Z",
    tagline: "Opening more paths into campus life.",
    description:
      "The official Council of Organizations website gives students one place to explore organizations and find opportunities during Recruitment Week and beyond. A publishing workspace lets council staff keep stories, announcements, and organization updates current.",
    impact: {
      figure: "6,000+ students · 40+ organizations",
      result:
        "Makes organization discovery easier for students and publishing easier for council leaders.",
    },
    services: ["React", "TypeScript", "Supabase", "Tiptap"],
    industry: "Campus life",
    image: {
      src: "/projects/coa-z.jpeg",
      alt: "COA-Z website collage showing its homepage, organization directory, and updates",
      width: 1280,
      height: 1280,
      fit: "contain",
    },
    images: [
      {
        src: "/projects/coa-z-homepage-v2.webp",
        alt: "COA-Z homepage displayed on a laptop",
        width: 1800,
        height: 1890,
      },
      {
        src: "/projects/coa-z-organizations-v2.webp",
        alt: "COA-Z organization directory displayed on a laptop",
        width: 1800,
        height: 1890,
      },
      {
        src: "/projects/coa-z-cms-events-v2.webp",
        alt: "COA-Z event stories content workspace displayed on a laptop",
        width: 1800,
        height: 1890,
      },
      {
        src: "/projects/coa-z-cms-organizations-v2.webp",
        alt: "COA-Z organizations content workspace displayed on a laptop",
        width: 1800,
        height: 1890,
      },
    ],
    imageBackground: "#8dc5e9",
  },
  {
    slug: "unyon-mindanao-portal",
    title: "Unyon Mindanao Portal",
    tagline: "Making shared administration easier to account for.",
    description:
      "This member portal brings university records, verified invitations, role controls, and audit history into a protected workspace. It gives administrators a clearer way to manage access and trace changes across the network.",
    impact: {
      figure: "8+ member universities",
      result:
        "Creates one accountable place to manage member records and access across the network.",
    },
    services: ["Next.js", "Cloudflare D1", "Firebase Auth", "Cloudflare R2"],
    industry: "Member administration",
    image: {
      src: "/projects/unyon-mindanao.jpg",
      alt: "Unyon Mindanao Year 5 brand graphic",
      width: 2048,
      height: 2048,
      fit: "contain",
    },
    imageBackground: "#eef0d9",
  },
];
