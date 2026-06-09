"use client";

import { useEffect, useRef, useCallback } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });

  const updatePosition = useCallback(() => {
    const glow = glowRef.current;
    if (!glow) return;
    glow.style.transform = `translate3d(${targetRef.current.x}px, ${targetRef.current.y}px, 0)`;
    rafRef.current = null;
  }, []);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    // Check if device can handle cursor effects
    if (typeof window !== "undefined") {
      if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const cores = navigator.hardwareConcurrency || 4;
      if (cores < 4) return;
    }

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      // Throttle via rAF — max 1 DOM update per frame
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updatePosition);
      }
      glow.style.opacity = "1";
    };

    const onLeave = () => {
      glow.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updatePosition]);

  return (
    <div
      ref={glowRef}
      className="cursor-glow"
      aria-hidden="true"
    />
  );
}
