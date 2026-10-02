import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { About } from "@/components/sections/About";
import "./about.css";

export const metadata: Metadata = {
  title: "About Gabrielle Tatel",
  description:
    "Learn about Gabrielle Tatel's work in technology communities, entrepreneurship, debate, and education.",
};

export default function AboutPage() {
  return (
    <main className="about-page">
      <div className="about-container">
        <About />
        <nav aria-label="Explore more" className="about-footer">
          <p>Explore the work behind these stories.</p>
          <div>
            <Link href="/#projects" className="about-link">
              View projects <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden />
            </Link>
            <Link href="/#contact" className="about-link">
              Get in touch <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden />
            </Link>
          </div>
        </nav>
      </div>
    </main>
  );
}
