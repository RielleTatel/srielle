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
  repositoryUrl?: string;
};

export const featuredProjects: Project[] = [
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
    repositoryUrl: "https://github.com/RielleTatel/autocare",
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
    repositoryUrl: "https://github.com/RielleTatel/council-of-organizations",
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
      src: "/projects/unyon-mindanao-cover.webp",
      alt: "Unyon Mindanao ‘Anchored in the Currents’ cover artwork",
      width: 1800,
      height: 1890,
      fit: "cover",
    },
    images: [
      {
        src: "/projects/unyon-mindanao-home.webp",
        alt: "Unyon Mindanao Confederation Portal home dashboard displayed on a desktop monitor",
        width: 1800,
        height: 1890,
        fit: "contain",
      },
      {
        src: "/projects/unyon-mindanao-events.webp",
        alt: "Unyon Mindanao Confederation Portal events calendar and event management screen displayed on a desktop monitor",
        width: 1800,
        height: 1890,
        fit: "contain",
      },
    ],
    imageBackground: "#5a7961",
    repositoryUrl: "https://github.com/RielleTatel/unyon-mindanao",
  },
];

export const projects: Project[] = [
  ...featuredProjects,
  {
    slug: "debately",
    title: "Debately",
    tagline: "Debate tournament management, built by a debater.",
    description:
      "Debately gives tournament organizers a workspace to manage institutions, teams, and adjudicators, track requests, and publish announcements. Organizers can import institution records from a CSV and see which institutions have claimed their registrations.",
    impact: {
      result: "Brings tournament registration and administration into one dashboard.",
    },
    services: ["Next.js", "Supabase", "Prisma", "PostgreSQL"],
    industry: "Debate tournaments",
    image: {
      src: "/projects/debately-cover.webp",
      alt: "Debately tournament dashboard showing the Institutions tab",
      width: 900,
      height: 563,
      fit: "contain",
    },
    imageBackground: "#e8e6f8",
    repositoryUrl: "https://github.com/RielleTatel/debately",
  },
  {
    slug: "horario",
    title: "Horario",
    tagline: "Teaching load and timetable planning for a junior high school.",
    description:
      "Built for Ateneo de Zamboanga University Junior High School, Horario lets department chairs review teaching assignments and lets administrators generate and approve regular and special timetables.",
    impact: {
      result: "Gives department chairs and administrators one place to review teaching loads and publish schedules.",
    },
    services: ["Laravel", "Alpine.js", "Tailwind", "MySQL"],
    industry: "Academic scheduling",
    image: {
      src: "/projects/horario-cover.webp",
      alt: "Horario sign-in screen with calendar and timetable illustrations",
      width: 900,
      height: 563,
      fit: "contain",
    },
    imageBackground: "#17167f",
    repositoryUrl: "https://github.com/RielleTatel/load-and-scheduling-system",
  },
  {
    slug: "osa-activity-tracking",
    title: "OSA Activity Tracking",
    tagline: "Online activity requests and document tracking for student organizations.",
    description:
      "The Office of Student Affairs system lets organization officers submit activity requests and track their documents. Moderators can endorse requests, and office staff can verify requirements and update the status as each request moves through approval.",
    impact: {
      result: "Makes it easier for student organizations to see what’s submitted, what’s missing, and what’s next.",
    },
    services: ["Laravel", "PHP", "Tailwind", "MySQL"],
    industry: "Student affairs",
    image: {
      src: "/projects/osa-cover.webp",
      alt: "OSA request dashboard with approval stages and a document checklist",
      width: 900,
      height: 563,
      fit: "contain",
    },
    imageBackground: "#d8e3f7",
    repositoryUrl: "https://github.com/RielleTatel/osa-system",
  },
];
