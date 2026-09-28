import type { Metadata } from "next";
import Link from "next/link";
import { About } from "@/components/sections/About";

export const metadata: Metadata = {
  title: "About Gabrielle Tatel",
  description:
    "Learn about Gabrielle Tatel's work in technology communities, entrepreneurship, debate, and education.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <About />
      <nav
        aria-label="Explore more"
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 border-t border-border px-6 py-10 text-sm sm:px-10 lg:px-15"
      >
        <p className="text-muted">Explore the work behind these stories.</p>
        <div className="flex flex-wrap gap-6">
          <Link
            href="/#projects"
            className="font-medium text-foreground underline decoration-accent/70 underline-offset-4 transition-colors hover:text-accent focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            View projects
          </Link>
          <Link
            href="/#contact"
            className="font-medium text-foreground underline decoration-accent/70 underline-offset-4 transition-colors hover:text-accent focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Get in touch
          </Link>
        </div>
      </nav>
    </main>
  );
}
