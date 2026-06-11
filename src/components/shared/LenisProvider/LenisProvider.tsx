"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  // eslint-disable-next-line no-var
  var __lenis: Lenis | undefined;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

interface LenisProviderProps {
  children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    // Only enable on desktop — mobile uses native scroll
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mq = window.matchMedia("(min-width: 768px)");
    if (!mq.matches) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 2,
      infinite: false,
    });

    globalThis.__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Ensure proper sizing after all content loads
    const handleResize = () => lenis.resize();
    window.addEventListener("load", handleResize);
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", () => setTimeout(handleResize, 100));

    // Resize on DOM mutations (images loading, etc.)
    const observer = new MutationObserver(() => lenis.resize());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("load", handleResize);
      window.removeEventListener("resize", handleResize);
      globalThis.__lenis = undefined;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
