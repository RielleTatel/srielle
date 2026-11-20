import type { Metadata } from "next";
import { FadeIn } from "@/components/ui/FadeIn";
import { FadeText } from "@/components/ui/FadeText";
import { ProjectGrid } from "@/components/ui/ProjectGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects — Gabrielle Tatel",
  description:
    "Explore Gabrielle Tatel’s projects in vehicle care, campus life, university workflows, and debate tournament management.",
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-16 pt-15 sm:px-10 lg:px-15">
      <FadeIn>
        <SectionHeading
          heading="h1"
          title={<FadeText>Projects.</FadeText>}
          description="Software I’ve built for local businesses, campuses, and communities."
          className="mb-8"
        />
      </FadeIn>

      <ProjectGrid projects={projects} cardHeading="h2" />
    </main>
  );
}
