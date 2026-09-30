export type ProjectImage = {
  src: string;
  alt: string;
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

// The first three projects are the featured work shown before the landing-page toggle.
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
      src: "/projects/autocare-cover.webp",
      alt: "AutoCare+ cover showing three mobile screens for vehicle details, the service dashboard, and booking",
      fit: "contain",
    },
    images: [
      {
        src: "/projects/autocare-booking-services.webp",
        alt: "AutoCare+ service booking screen with service options and a vehicle maintenance illustration",
      },
      {
        src: "/projects/autocare-booking-roadside.webp",
        alt: "AutoCare+ booking flow showing appointment times and roadside assistance options",
      },
      {
        src: "/projects/autocare-dashboard.webp",
        alt: "AutoCare+ home dashboard and vehicle details screens",
      },
      {
        src: "/projects/autocare-vehicle-overview.webp",
        alt: "AutoCare+ vehicle overview with odometer, specifications, and service booking",
      },
    ],
    imageBackground: "#801d1d",
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
      fit: "contain",
    },
    images: [
      {
        src: "/projects/coa-z-homepage.webp",
        alt: "COA-Z homepage introducing the council's work empowering student organizations",
      },
      {
        src: "/projects/coa-z-organizations.webp",
        alt: "COA-Z organization directory with search, category filters, and student organization cards",
      },
      {
        src: "/projects/coa-z-cms-organizations.webp",
        alt: "COA-Z staff content workspace listing organization pages and publishing status",
      },
      {
        src: "/projects/coa-z-cms-events.webp",
        alt: "COA-Z staff content workspace listing event stories and publishing status",
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
      fit: "contain",
    },
    imageBackground: "#eef0d9",
  },
  {
    slug: "magis-directory",
    title: "Magis AI Campus Guide",
    tagline: "Helping students find their place in campus life.",
    description:
      "Students can discover organizations by name or interest instead of searching through scattered updates. A searchable directory and source-citing handbook assistant make campus information easier to find, helping students choose where to get involved with more confidence.",
    impact: {
      result:
        "Puts organization discovery and source-backed campus answers within easier reach.",
    },
    services: ["Next.js", "React", "TypeScript", "AI Integration", "PostgreSQL"],
    industry: "Education",
    year: "2025",
    image: {
      src: "/projects/magis.png",
      alt: "Magis AI Campus Guide interface",
    },
    imageBackground: "#c9d8e8",
  },
  {
    slug: "ateneo-health-management-system",
    title: "AdZU Health Management System",
    tagline: "Making campus healthcare easier to navigate for students and staff.",
    description:
      "Bringing medical records, consultations, and health monitoring into one system gives campus health staff a clearer view of each student's care. It reduces time spent piecing together records and helps the clinic respond with the right context.",
    impact: {
      result:
        "Helps clinic staff respond with the student's care history in view.",
    },
    services: ["Django", "PostgreSQL", "Python", "REST API"],
    industry: "Healthcare",
    year: "2025",
    image: {
      src: "/projects/uhms.png",
      alt: "AdZU Health Management System dashboard",
    },
    imageBackground: "#cfdfa9",
  },
];
