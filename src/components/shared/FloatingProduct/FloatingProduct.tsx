"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface FloatingProductProps {
  children: React.ReactNode;
  duration?: number;
  distance?: number;
  className?: string;
}

export function FloatingProduct({
  children,
  duration = 6,
  distance = 20,
  className = "",
}: FloatingProductProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: -distance,
        duration,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    });
    return () => ctx.revert();
  }, [duration, distance]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
