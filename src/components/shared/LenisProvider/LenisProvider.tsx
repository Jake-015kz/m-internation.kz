'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

// Check if device is touch/mobile — Lenis causes jank on weak devices
function shouldEnableSmoothScroll(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Disable on touch devices (mobile, tablets)
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return false;
  
  // Disable on low-end devices (less than 4 cores or low memory)
  const cores = navigator.hardwareConcurrency || 4;
  if (cores < 4) return false;
  
  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  
  return true;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Skip smooth scroll on mobile/touch devices for better performance
    if (!shouldEnableSmoothScroll()) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      // Performance optimizations
      syncTouch: false,
      touchMultiplier: 1,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
