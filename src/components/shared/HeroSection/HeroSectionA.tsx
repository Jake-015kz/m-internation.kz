"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";

const STATS = [
  { value: "10 000+", key: "customers" },
  { value: "50+", key: "countries" },
  { value: "15", key: "years" },
] as const;

/* ── Animated Particle Field ── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth * 2);
    let height = (canvas.height = canvas.offsetHeight * 2);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }

    const particles: Particle[] = [];
    const count = Math.min(60, Math.floor((width * height) / 30000));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    const connectionDist = 200;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(0.82 0.10 88 / ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.08;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `oklch(0.82 0.10 88 / ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth * 2;
      height = canvas.height = canvas.offsetHeight * 2;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      style={{ opacity: 0.6 }}
    />
  );
}

/* ── Main Hero Section ── */
export function HeroSectionA() {
  const locale = useLocale();
  const t = useTranslations("hero");
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -40]);

  return (
    <section
      ref={heroRef}
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: "calc(100dvh - 64px)" }}
      aria-labelledby="hero-title"
    >
      {/* ===== BACKGROUND LAYERS ===== */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Base */}
        <div className="absolute inset-0" style={{ background: "var(--bg-base)" }} />

        {/* Premium mesh */}
        <div
          className="absolute inset-0 hero-mesh-gradient"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 8% 15%, oklch(0.62 0.16 152 / 0.10) 0%, transparent 50%),
              radial-gradient(ellipse 50% 40% at 88% 78%, oklch(0.82 0.10 88 / 0.08) 0%, transparent 45%),
              radial-gradient(ellipse 40% 35% at 45% 50%, oklch(0.62 0.14 250 / 0.04) 0%, transparent 50%)
            `,
          }}
        />

        {/* Animated blobs */}
        <div
          className="absolute top-[5%] left-[0%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full opacity-[0.08] hero-blob-1"
          style={{ background: "radial-gradient(circle, var(--accent-gold), transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute bottom-[5%] right-[0%] w-[450px] h-[450px] md:w-[600px] md:h-[600px] rounded-full opacity-[0.06] hero-blob-2"
          style={{ background: "radial-gradient(circle, var(--accent-emerald), transparent 70%)", filter: "blur(70px)" }}
        />
        <div
          className="absolute top-[35%] right-[15%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full opacity-[0.04] hero-blob-3"
          style={{ background: "radial-gradient(circle, oklch(0.82 0.10 88), transparent 70%)", filter: "blur(60px)" }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(oklch(1 0 0 / 0.1) 1px, transparent 1px),
              linear-gradient(90deg, oklch(1 0 0 / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Particle field */}
        <div className="absolute inset-0 hidden md:block">
          <ParticleField />
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="mx-auto max-w-[80rem] px-5 md:px-8 lg:px-10 w-full pt-8 pb-12 md:pt-12 md:pb-16 relative z-10"
      >
        <div className="grid grid-cols-1 gap-8 md:gap-12 items-center lg:grid-cols-2 lg:gap-16">
          {/* Left — Text */}
          <div className="text-left order-1 lg:order-1">
            {/* Cert badges */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-1.5 mb-6 md:mb-8"
            >
              {["GMP", "ISO", "HALAL"].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[8px] md:text-[9px] font-bold tracking-[0.12em] uppercase"
                  style={{
                    color: "var(--accent-gold)",
                    background: "oklch(0.82 0.10 88 / 0.05)",
                    border: "1px solid oklch(0.82 0.10 88 / 0.10)",
                  }}
                >
                  {label}
                </span>
              ))}
            </motion.div>

            {/* H1 — staggered reveal */}
            <motion.h1
              id="hero-title"
              className="font-heading font-extrabold mb-4 md:mb-5 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: "clamp(2.75rem, 7vw, 5rem)",
                lineHeight: 1.02,
              }}
            >
              {t("title").split("\n").map((line, i) => (
                <motion.span
                  key={i}
                  className="block"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
                  style={{
                    background: i === 0
                      ? "linear-gradient(135deg, var(--fg-primary) 0%, var(--accent-gold) 50%, var(--accent-emerald) 100%)"
                      : "linear-gradient(135deg, var(--fg-primary) 0%, var(--accent-gold) 60%, var(--accent-emerald) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    backgroundSize: "200% 200%",
                    animation: "gradient-shift 8s ease-in-out infinite",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {line}
                </motion.span>
              ))}
            </motion.h1>

            {/* Lead */}
            <motion.p
              className="font-heading font-semibold text-lg md:text-xl lg:text-2xl leading-[1.25] mb-4 md:mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              style={{ color: "var(--accent-gold)" }}
            >
              {t("lead")}
            </motion.p>

            {/* Body */}
            <motion.p
              className="font-body text-sm md:text-base leading-[1.6] md:leading-[1.65] max-w-[28rem] mb-8 md:mb-10 text-[var(--fg-secondary)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
            >
              {t("subtitle")}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 md:gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              <Link
                href={`/${locale}/catalog`}
                className="inline-flex items-center justify-center bg-[var(--accent-gold)] text-[var(--bg-base)] font-body font-bold text-base md:text-lg px-8 py-4 min-h-[56px] md:min-h-[60px] md:px-10 rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[var(--hero-btn-shadow)] hover:bg-[var(--accent-gold-hover)] hover:shadow-[var(--hero-btn-hover-shadow)] hover:translate-y-[-2px] active:translate-y-0 active:shadow-none focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)] focus-visible:outline-offset-2 w-full sm:w-auto"
              >
                {t("cta")}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center justify-center hero-glass-btn font-body font-semibold text-base md:text-lg px-8 py-4 min-h-[56px] md:min-h-[60px] md:px-10 rounded-2xl transition-all duration-300 hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] hover:shadow-[var(--shadow-md)] hover:translate-y-[-2px] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)] focus-visible:outline-offset-2 w-full sm:w-auto"
              >
                {t("aboutLink")}
              </Link>
            </motion.div>
          </div>

          {/* Right — Floating Product */}
          <motion.div
            className="relative flex justify-center items-center order-2 lg:order-2"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="relative floating-product w-full"
              style={{ maxWidth: "420px", aspectRatio: "1 / 1", ["--float-duration" as string]: "7s", ["--float-distance" as string]: "18px" }}
            >
              {/* Conic glow ring */}
              <div
                className="absolute inset-0 rounded-3xl hero-conic-glow"
                style={{
                  background: "conic-gradient(from 0deg, var(--accent-gold), var(--accent-emerald), var(--accent-gold))",
                  opacity: 0.08,
                  filter: "blur(30px)",
                  transform: "scale(1.15)",
                }}
                aria-hidden="true"
              />

              {/* Glass card */}
              <div className="relative glass-card-premium rounded-3xl p-6 md:p-10 h-full flex items-center justify-center overflow-hidden">
                {/* Inner glow spots */}
                <div
                  className="absolute top-0 left-0 w-40 h-40 opacity-30"
                  style={{ background: "radial-gradient(circle at 0% 0%, var(--accent-gold), transparent 70%)" }}
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-0 right-0 w-48 h-48 opacity-20"
                  style={{ background: "radial-gradient(circle at 100% 100%, var(--accent-emerald), transparent 70%)" }}
                  aria-hidden="true"
                />

                <Image
                  src="/products/greenmax/main.png"
                  alt="GreenMAX — premium detox supplement by M-International"
                  width={420}
                  height={420}
                  priority
                  sizes="(max-width: 640px) 220px, (max-width: 1024px) 280px, 400px"
                  className="w-full max-w-[220px] sm:max-w-[280px] md:max-w-[360px] lg:max-w-[400px] h-auto object-contain relative z-10 drop-shadow-[0_12px_40px_oklch(0.55_0.14_88_/0.15)]"
                />

                {/* Floating badge */}
                <motion.div
                  className="absolute -top-2 -right-2 md:-top-3 md:-right-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full font-mono font-bold text-[9px] md:text-[10px] uppercase tracking-[0.06em] shadow-[var(--shadow-lg)]"
                  style={{
                    background: "linear-gradient(135deg, var(--accent-gold), oklch(0.88 0.14 88))",
                    color: "var(--bg-base)",
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2, type: "spring", stiffness: 200 }}
                >
                  #1 Best Seller
                </motion.div>
              </div>

              {/* Deep glow */}
              <div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 rounded-full z-0"
                style={{ background: "var(--accent-gold)", opacity: 0.08, filter: "blur(30px)" }}
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-[var(--border-subtle)]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
        >
          <div className="grid grid-cols-3 gap-3 md:gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.key}
                className="relative text-center md:text-left rounded-2xl px-2 py-4 md:px-6 md:py-5 border overflow-hidden group hero-stat-card"
                style={{
                  background: "linear-gradient(135deg, oklch(1 0 0 / 0.03), oklch(1 0 0 / 0.01))",
                  borderColor: "var(--border-subtle)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                whileHover={{ y: -6, borderColor: "var(--accent-gold)", boxShadow: "0 16px 48px oklch(0 0 0 / 0.15), 0 0 30px oklch(0.82 0.10 88 / 0.06)" }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(90deg, transparent, var(--accent-gold), transparent)" }}
                  aria-hidden="true"
                />

                {/* Inner glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "radial-gradient(circle at 50% 0%, oklch(0.82 0.10 88 / 0.06), transparent 70%)" }}
                  aria-hidden="true"
                />

                <p
                  className="font-heading font-black text-base sm:text-xl md:text-3xl lg:text-4xl tracking-tight whitespace-nowrap tabular-nums relative z-10"
                  style={{
                    background: "linear-gradient(135deg, var(--accent-gold), var(--accent-emerald))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </p>
                <p className="font-body text-[9px] sm:text-[10px] md:text-sm text-[var(--fg-muted)] mt-1 leading-tight relative z-10">
                  {t(`stat.${stat.key}`)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
