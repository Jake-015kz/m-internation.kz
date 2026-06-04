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

export function ClickSpark({
  sparkColor = 'oklch(0.92 0.2 128)',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentTime = Date.now();
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
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const now = Date.now();
      const newSparks: Spark[] = [];

      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount;
        newSparks.push({
          x,
          y,
          angle,
          createdAt: now,
        });
      }

      sparksRef.current = [...sparksRef.current, ...newSparks];
      draw();
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

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden="true"
    />
  );
}
