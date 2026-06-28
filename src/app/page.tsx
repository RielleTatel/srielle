import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { ParallaxPills } from "@/components/sections/ParallaxPills";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { StatementHeading } from "@/components/sections/StatementHeading";
import { TechStack } from "@/components/sections/TechStack";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <ParallaxPills />
      <About />
      <TechStack />
      <Projects />
      <StatementHeading />
      <Contact />
    </main>
  );
}
