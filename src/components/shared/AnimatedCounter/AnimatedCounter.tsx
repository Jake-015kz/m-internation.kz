"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  target: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  target,
  duration = 2000,
  className = "",
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated) return;
        setHasAnimated(true);

        // Parse the target: extract numeric part and suffix
        const match = target.match(/^(\d+)(.*)$/);
        if (!match) {
          setDisplayValue(target);
          return;
        }

        const endValue = parseInt(match[1], 10);
        const suffix = match[2] || "";
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(endValue * eased);

          setDisplayValue(`${current}${suffix}`);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setDisplayValue(target);
          }
        };

        requestAnimationFrame(animate);
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return (
    <div ref={ref} className={className}>
      {displayValue}
    </div>
  );
}
