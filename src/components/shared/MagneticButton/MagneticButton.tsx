"use client";

import { useMotionValue, useSpring, motion } from "framer-motion";
import { useRef, type ReactNode, type CSSProperties } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const style = {
    x: springX,
    y: springY,
    display: "inline-flex",
  } as unknown as CSSProperties;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`relative items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-gold-hover)] px-8 py-4 font-body font-bold text-[var(--bg-base)] shadow-[var(--hero-btn-shadow)] transition-shadow duration-300 hover:shadow-[var(--hero-btn-hover-shadow)] cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
}
