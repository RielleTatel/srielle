export type Affiliation = {
  id: string;
  name: string;
  role: string;
  label: string;
  logo: { src: string; alt: string };
};

export const affiliations: Affiliation[] = [
  {
    id: "gdg",
    name: "GDG on Campus Blue Eagle",
    role: "Member, former President",
    label: "GDG Blue Eagle",
    logo: {
      src: "/affiliations/gdg-logo.jpg",
      alt: "GDG on Campus Blue Eagle logo",
    },
  },
  {
    id: "aicg",
    name: "Ateneo Informatics Computing Guild",
    role: "Member, former Internal Vice-President",
    label: "Computing Guild",
    logo: {
      src: "/affiliations/aicg-logo.jpg",
      alt: "Ateneo Informatics Computing Guild logo",
    },
  },
  {
    id: "debate",
    name: "Ateneo Debate Union",
    role: "Member",
    label: "Debate Union",
    logo: {
      src: "/affiliations/debate-logo.jpg",
      alt: "Ateneo Debate Union logo",
    },
  },
  {
    id: "rotaract",
    name: "Rotaract Club of Zamboanga City West",
    role: "Member",
    label: "Rotaract",
    logo: {
      src: "/affiliations/rotaract-logo.jpeg",
      alt: "Rotaract Club of Zamboanga City West logo",
    },
  },
  {
    id: "council",
    name: "El Consejo Atenista Judicial Council",
    role: "Senior Associate Justice",
    label: "Judicial Council",
    logo: {
      src: "/affiliations/council-logo.jpg",
      alt: "El Consejo Atenista Judicial Council logo",
    },
  },
];
