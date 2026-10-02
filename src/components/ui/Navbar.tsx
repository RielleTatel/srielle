"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { loadScrollSmoother, loadScrollTrigger } from "@/lib/gsap";
import { scrollToAnchor } from "@/lib/scroll";

const NAV_LINKS = [
  { href: "/#hero", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/#tech-stack", label: "Tools", desktopOnly: true },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const handleHomeAnchor = async (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (
      !href.startsWith("/#") ||
      window.location.pathname !== "/" ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) return;

    const target = document.getElementById(href.slice(2));
    if (!target) return;

    event.preventDefault();
    if (window.location.pathname + window.location.hash !== href) {
      window.history.pushState(null, "", href);
    }

    if (window.matchMedia("(max-width: 767px), (pointer: coarse)").matches) {
      scrollToAnchor(target);
      return;
    }

    const [ScrollTrigger, ScrollSmoother] = await Promise.all([
      loadScrollTrigger(),
      loadScrollSmoother(),
    ]);
    ScrollTrigger.refresh();
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(Math.max(0, smoother.offset(target, "top top") - 64), false);
    } else {
      scrollToAnchor(target);
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md transition-colors duration-[1600ms]">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" aria-label="Srielle home" className="inline-flex items-center">
          <Image
            src="/logo-optimized.webp"
            alt="Srielle logo"
            width={40}
            height={40}
            sizes="40px"
            priority
          />
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-3 sm:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={link.href === "/about" ? false : undefined}
              onClick={(event) => handleHomeAnchor(event, link.href)}
              className={`text-xs text-muted transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-sm ${link.desktopOnly ? "hidden sm:inline" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
