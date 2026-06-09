"use client";

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
  distance = 12,
  className = "",
}: FloatingProductProps) {
  return (
    <div
      className={cn("floating-product", className)}
      style={{
        ["--float-duration" as string]: `${duration}s`,
        ["--float-distance" as string]: `${distance}px`,
      }}
    >
      {children}
    </div>
  );
}
