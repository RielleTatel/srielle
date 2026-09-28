"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const SmoothScrollReadyContext = createContext(false);

export function useSmoothScrollReady() {
  return useContext(SmoothScrollReadyContext);
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 0.6,
      smoothTouch: 0.1,
    });

    const readyFrame = window.requestAnimationFrame(() => setIsReady(true));

    return () => {
      window.cancelAnimationFrame(readyFrame);
      smoother.kill();
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;

    let frame = 0;
    const syncScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        const smoother = ScrollSmoother.get();
        if (!smoother) return;

        const hash = decodeURIComponent(window.location.hash.slice(1));
        const target = hash ? document.getElementById(hash) : null;
        if (target) {
          smoother.scrollTo(
            Math.max(0, smoother.offset(target, "top top") - 64),
            false,
          );
        } else if (!hash) {
          smoother.scrollTo(0, false);
        }
      });
    };

    syncScroll();
    window.addEventListener("hashchange", syncScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", syncScroll);
    };
  }, [isReady, pathname]);

  return (
    <SmoothScrollReadyContext.Provider value={isReady}>
      <div id="smooth-wrapper">
        <div id="smooth-content" className="pt-16">{children}</div>
      </div>
    </SmoothScrollReadyContext.Provider>
  );
}
