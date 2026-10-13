export type Role = {
  id: string;
  company: string;
  title: string;
  kind?: string;
  logo?: { src: string; alt: string };
  period?: string;
  city?: string;
  location?: string;
  highlights: string[];
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
    highlights: [
      "Enhanced and maintained production-ready web and mobile applications using Next.js, React Native, TypeScript, REST APIs, and RevenueCat.",
      "Built a high-performance XLSX bulk import module capable of processing 100,000+ records, implementing hierarchical parent-child data mapping, validation, and optimized import workflows.",
      "Resolved application defects, integrated new mobile features, and enhanced payment and subscription flows to improve application stability and user experience.",
    ],
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
    highlights: [
      "Developed and deployed an Activity Request & Document Tracking System for 40+ student organizations and hundreds of officers to cut approval turnaround by ~50% and eliminate repeat office visits through real-time tracking across a 5-stage approval chain.",
      "Built and deployed a Teaching Load & Scheduling System centralizing the loads of 75 teachers across 7 departments and 36 sections to cut manual encoding time by ~70% and auto-validate all 242 section assignments against load caps.",
    ],
  },
  {
    id: "freelance",
    company: "Independent projects",
    title: "Freelance Software Developer",
    kind: "Freelance",
    logo: { src: "/logo-optimized.webp", alt: "Srielle logo" },
    highlights: ["Independent software development for client projects."],
  },
];
