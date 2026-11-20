import type { Metadata } from "next";
import { Projects } from "@/components/sections/Projects";

export const metadata: Metadata = {
  title: "Projects — Gabrielle Tatel",
  description:
    "Explore Gabrielle Tatel’s projects in vehicle care, campus life, university workflows, and debate tournament management.",
};

export default function ProjectsPage() {
  return (
    <main>
      <Projects showAll />
    </main>
  );
}
