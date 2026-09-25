"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
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

  return (
    <SmoothScrollReadyContext.Provider value={isReady}>
      <div id="smooth-wrapper">
        <div id="smooth-content" className="pt-16">{children}</div>
      </div>
    </SmoothScrollReadyContext.Provider>
  );
}
