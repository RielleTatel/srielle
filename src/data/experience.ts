export type Role = {
  company: string;
  title: string;
  period: string;
  summary: string;
};

export const experience: Role[] = [
  {
    company: "Organization Name",
    title: "Role Title",
    period: "2024 — Present",
    summary:
      "One-sentence description of what you owned and the impact you delivered.",
  },
  {
    company: "Previous Organization",
    title: "Role Title",
    period: "2023 — 2024",
    summary:
      "Replace these entries in src/data/experience.ts with real experience.",
  },
  {
    company: "Earlier Organization",
    title: "Role Title",
    period: "2022 — 2023",
    summary: "Short, outcome-focused line about your contribution.",
  },
];
