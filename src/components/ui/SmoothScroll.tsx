"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import {
  loadGsap,
  loadScrollSmoother,
  loadScrollTrigger,
} from "@/lib/gsap";
import { scrollToAnchor } from "@/lib/scroll";

type ScrollSmootherPlugin = Awaited<ReturnType<typeof loadScrollSmoother>>;
type ScrollTriggerPlugin = Awaited<ReturnType<typeof loadScrollTrigger>>;

const SmoothScrollReadyContext = createContext(false);

export function useSmoothScrollReady() {
  return useContext(SmoothScrollReadyContext);
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();
  const useNativeScroll = pathname === "/about";
  const smootherPlugin = useRef<ScrollSmootherPlugin | null>(null);
  const scrollTriggerPlugin = useRef<ScrollTriggerPlugin | null>(null);

  useEffect(() => {
    const touchOrSmallScreen = window.matchMedia(
      "(max-width: 767px), (pointer: coarse)",
    );
    let readyFrame = 0;
    let disposed = false;

    const configureScroll = async () => {
      window.cancelAnimationFrame(readyFrame);
      smootherPlugin.current?.get()?.kill();

      if (useNativeScroll || touchOrSmallScreen.matches) {
        setIsReady(true);
        return;
      }

      setIsReady(false);
      const [gsap, ScrollTrigger, ScrollSmoother] = await Promise.all([
        loadGsap(),
        loadScrollTrigger(),
        loadScrollSmoother(),
      ]);
      if (disposed || useNativeScroll || touchOrSmallScreen.matches) return;

      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
      smootherPlugin.current = ScrollSmoother;
      scrollTriggerPlugin.current = ScrollTrigger;
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 0.6,
        smoothTouch: 0.1,
      });
      readyFrame = window.requestAnimationFrame(() => setIsReady(true));
    };

    const handleScrollModeChange = () => void configureScroll();
    void configureScroll();
    touchOrSmallScreen.addEventListener("change", handleScrollModeChange);

    return () => {
      disposed = true;
      touchOrSmallScreen.removeEventListener("change", handleScrollModeChange);
      window.cancelAnimationFrame(readyFrame);
      smootherPlugin.current?.get()?.kill();
    };
  }, [useNativeScroll]);

  useEffect(() => {
    if (!isReady) return;

    let frame = 0;
    const syncScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        scrollTriggerPlugin.current?.refresh();
        const smoother = smootherPlugin.current?.get();
        const hash = decodeURIComponent(window.location.hash.slice(1));
        const target = hash ? document.getElementById(hash) : null;
        if (target) {
          if (smoother) {
            smoother.scrollTo(
              Math.max(0, smoother.offset(target, "top top") - 64),
              false,
            );
          } else {
            scrollToAnchor(target);
          }
        } else if (!hash) {
          if (smoother) smoother.scrollTo(0, false);
          else window.scrollTo(0, 0);
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
