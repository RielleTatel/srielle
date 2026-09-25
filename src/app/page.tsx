import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { ParallaxPills } from "@/components/sections/ParallaxPills";
import { Projects } from "@/components/sections/Projects";
import { StatementHeading } from "@/components/sections/StatementHeading";
import { TechStack } from "@/components/sections/TechStack";

export default function Home() {
  return (
    <main>
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
