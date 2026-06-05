'use client';

import { useEffect, useRef } from 'react';
import styles from './ClickSpark.module.scss';

interface Spark {
  x: number;
  y: number;
  angle: number;
  createdAt: number;
}

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
}

// Check if device can handle canvas animations
function shouldEnableSparks(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Disable on touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return false;
  
  // Disable on low-end devices
  const cores = navigator.hardwareConcurrency || 4;
  if (cores < 4) return false;
  
  // Check for reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  
  return true;
}

export function ClickSpark({
  sparkColor = 'oklch(0.92 0.2 128)',
  sparkSize = 8,
  sparkRadius = 12,
  sparkCount = 6,
  duration = 350,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animationRef = useRef<number | null>(null);
  const lastClickTimeRef = useRef(0);

  useEffect(() => {
    // Skip on mobile/touch devices
    if (!shouldEnableSparks()) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentTime = Date.now();
      
      // Limit max sparks for performance
      if (sparksRef.current.length > 30) {
        sparksRef.current = sparksRef.current.slice(-30);
      }

      sparksRef.current = sparksRef.current.filter((spark) => {
        const delta = currentTime - spark.createdAt;
        if (delta >= duration) return false;

        const progress = delta / duration;
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        const distance = easedProgress * sparkRadius;
        const lineLength = sparkSize * (1 - easedProgress);

        const x1 = spark.x + Math.cos(spark.angle) * distance;
        const y1 = spark.y + Math.sin(spark.angle) * distance;
        const x2 = spark.x + Math.cos(spark.angle) * (distance + lineLength);
        const y2 = spark.y + Math.sin(spark.angle) * (distance + lineLength);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2 * (1 - easedProgress);
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      if (sparksRef.current.length > 0) {
        animationRef.current = requestAnimationFrame(draw);
      } else {
        animationRef.current = null;
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Throttle: max 1 spark event per 50ms
      const now = Date.now();
      if (now - lastClickTimeRef.current < 50) return;
      lastClickTimeRef.current = now;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newSparks: Spark[] = [];

      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount;
        newSparks.push({ x, y, angle, createdAt: now });
      }

      sparksRef.current = [...sparksRef.current, ...newSparks];
      
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('click', handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration]);

  // Don't render canvas on mobile
  if (typeof window !== 'undefined' && !shouldEnableSparks()) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden="true"
    />
  );
}
