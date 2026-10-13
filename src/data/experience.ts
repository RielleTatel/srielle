export type Metric = { figure: string; label: string };

export type Role = {
  id: string;
  company: string;
  title: string;
  kind?: string;
  logo?: { src: string; alt: string };
  period?: string;
  city?: string;
  location?: string;
  /** Headline numbers, shown first and largest. */
  metrics: Metric[];
  highlights: string[];
  stack?: string[];
  /** Slugs from data/projects.ts, listed on the card in this order. */
  projectSlugs?: string[];
};

export const experience: Role[] = [
  {
    id: "symph",
    company: "Symph Inc.",
    title: "Software Developer",
    logo: { src: "/experience/symph-logo.jpeg", alt: "Symph Inc. logo" },
    period: "May 2026 - July 2026",
    city: "Cebu City",
    location: "Cebu I.T. Park, Barangay Apas, Lahug, Cebu City",
    metrics: [{ figure: "100,000+", label: "records per XLSX bulk import" }],
    highlights: [
      "Built the bulk import: parent-child data mapping, validation, optimized workflows.",
      "Fixed defects and shipped mobile features across web and mobile apps.",
      "Improved payment and subscription flows for stability.",
    ],
    stack: ["Next.js", "React Native", "TypeScript", "REST APIs", "RevenueCat"],
  },
  {
    id: "cits",
    company: "Center for Information Technology Services AdZU",
    title: "System Developer (Contract)",
    kind: "Contract",
    logo: {
      src: "/experience/adzu-logo.jpg",
      alt: "Ateneo de Zamboanga University seal",
    },
    period: "July 2026 - September 2026",
    city: "Zamboanga City",
    location: "La Purisima St., Zamboanga City 7000",
    metrics: [
      { figure: "~50%", label: "faster approvals" },
      { figure: "~70%", label: "less manual encoding" },
      { figure: "242", label: "sections auto-validated" },
      { figure: "40+", label: "student orgs served" },
    ],
    highlights: [
      "Activity Request & Document Tracking: real-time status across a 5-stage approval chain, no repeat office visits.",
      "Teaching Load & Scheduling: 75 teachers, 7 departments, 36 sections in one place, checked against load caps.",
    ],
  },
  {
    id: "freelance",
    company: "Independent projects",
    title: "Freelance Software Developer",
    kind: "Freelance",
    logo: { src: "/logo-optimized.webp", alt: "Srielle logo" },
    metrics: [],
    highlights: [],
    projectSlugs: ["autocare-plus", "council-of-organizations", "unyon-mindanao-portal"],
  },
];
