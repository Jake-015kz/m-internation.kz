"use client";

import { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";

// Check if device is touch/mobile — Lenis causes jank on weak devices
function shouldEnableSmoothScroll(): boolean {
  if (typeof window === "undefined") return false;

  // Disable on touch devices (mobile, tablets)
  if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return false;

  // Disable on low-end devices (less than 4 cores or low memory)
  const cores = navigator.hardwareConcurrency || 4;
  if (cores < 4) return false;

  // Check for reduced motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return false;

  return true;
}

export function LenisProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisOptions = {
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical" as const,
    gestureOrientation: "vertical" as const,
    smoothWheel: true,
    // Performance optimizations
    syncTouch: false,
    touchMultiplier: 1,
  };

  // If smooth scroll is disabled, render children without Lenis
  if (!shouldEnableSmoothScroll()) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
