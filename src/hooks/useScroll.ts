"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Lenis from "lenis";

declare global {
  // eslint-disable-next-line no-var
  var __lenis: Lenis | undefined;
}

interface UseScrollOptions {
  threshold?: number;
}

export function useScroll({ threshold = 50 }: UseScrollOptions = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const lastScrollYRef = useRef(0);

  const getScrollY = useCallback(() => {
    if (globalThis.__lenis) {
      return globalThis.__lenis.scroll;
    }
    return window.scrollY;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = getScrollY();
      setIsScrolled(currentScrollY > threshold);
      setScrollDirection(currentScrollY > lastScrollYRef.current ? "down" : "up");
      lastScrollYRef.current = currentScrollY;
    };

    // Set initial state
    handleScroll();

    // Listen to both window scroll and Lenis scroll events
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Also listen to Lenis scroll event
    globalThis.__lenis?.on("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      globalThis.__lenis?.off("scroll", handleScroll);
    };
  }, [threshold, getScrollY]);

  return { isScrolled, scrollDirection };
}
