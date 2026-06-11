"use client";

import { useEffect, useState, useRef, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { MagneticButton } from "@shared/MagneticButton";

const STATS = [
  { value: "10K+", key: "customers" },
  { value: "50+", key: "countries" },
  { value: "6", key: "years" },
] as const;

/* ═══════════════════════════════════════════
   APPLE-STYLE LINE REVEAL
   Each line slides up from below with blur
   ═══════════════════════════════════════════ */
function LineReveal({ 
  children, 
  className = "", 
  delay = 0,
  duration = 0.8,
}: { 
  children: ReactNode; 
  className?: string; 
  delay?: number;
  duration?: number;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "110%", filter: "blur(6px)" }}
        animate={{ y: "0%", filter: "blur(0px)" }}
        transition={{ 
          delay, 
          duration, 
          ease: [0.16, 1, 0.3, 1] as const,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   LINEAR-STYLE ANIMATED MESH (CSS-first)
   Pure CSS blobs for performance
   ═══════════════════════════════════════════ */
function LinearMeshGradient() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      {/* Base mesh layer */}
      <div
        className="absolute inset-0 hero-mesh-gradient"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 8% 15%, oklch(0.38 0.14 152 / 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 88% 78%, oklch(0.55 0.14 88 / 0.06) 0%, transparent 45%)
          `,
        }}
      />

      {/* CSS-animated blob 1 — Gold, large, slow */}
      <div
        className="absolute top-[5%] left-[0%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full opacity-[0.07] hero-blob-1"
        style={{ 
          background: "radial-gradient(circle, var(--accent-gold), transparent 70%)", 
          filter: "blur(80px)",
        }}
      />

      {/* CSS-animated blob 2 — Emerald, medium */}
      <div
        className="absolute bottom-[5%] right-[0%] w-[450px] h-[450px] md:w-[600px] md:h-[600px] rounded-full opacity-[0.05] hero-blob-2"
        style={{ 
          background: "radial-gradient(circle, var(--accent-emerald), transparent 70%)", 
          filter: "blur(70px)",
        }}
      />

      {/* Linear-style dot grid — 24px, subtle */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, oklch(0 0 0 / 0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Noise texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════
   PARTICLE FIELD (Canvas) — desktop only
   ═══════════════════════════════════════════ */
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
      x: number; y: number; vx: number; vy: number; size: number; opacity: number;
    }

    const particles: Particle[] = [];
    const count = Math.min(40, Math.floor((width * height) / 50000));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.2 + 0.4,
        opacity: Math.random() * 0.2 + 0.06,
      });
    }

    const connectionDist = 160;

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
        ctx.fillStyle = `oklch(0.55 0.14 88 / ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.05;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `oklch(0.55 0.14 88 / ${alpha})`;
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
      style={{ opacity: 0.4 }}
    />
  );
}

/* ═══════════════════════════════════════════
   REDUCED MOTION GUARD
   ═══════════════════════════════════════════ */
function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return prefersReduced;
}

/* ═══════════════════════════════════════════
   ANIMATED STAT CARD — Linear dashboard style
   ═══════════════════════════════════════════ */
function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className="relative text-center md:text-left rounded-2xl px-3 py-4 md:px-6 md:py-5 border overflow-hidden group hero-stat-card"
      style={{
        background: "oklch(1 0 0 / 0.65)",
        borderColor: "var(--border-subtle)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
      initial={reduced ? {} : { opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={reduced ? {} : { 
        y: -4, 
        borderColor: "var(--accent-gold)", 
        boxShadow: "0 12px 40px oklch(0 0 0 / 0.06), 0 0 24px oklch(0.55 0.14 88 / 0.03)" 
      }}
    >
      {/* Top accent line on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent-gold), transparent)" }}
        aria-hidden="true"
      />
      {/* Inner glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 0%, oklch(0.55 0.14 88 / 0.05), transparent 70%)" }}
        aria-hidden="true"
      />

      <motion.p
        className="font-heading font-black text-base sm:text-xl md:text-3xl lg:text-4xl tracking-tight whitespace-nowrap tabular-nums relative z-10"
        style={{
          background: "linear-gradient(135deg, var(--accent-emerald), oklch(0.32 0.16 152))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        initial={reduced ? {} : { opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.1, type: "spring", stiffness: 100 }}
      >
        {value}
      </motion.p>
      <p className="font-body text-[9px] sm:text-[10px] md:text-sm text-[var(--fg-muted)] mt-1 leading-tight relative z-10">
        {label}
      </p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN HERO — LINEAR GRID + APPLE REVEAL
   ═══════════════════════════════════════════ */
export function HeroSectionA() {
  const locale = useLocale();
  const t = useTranslations("hero");
  const heroRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.04]);

  return (
    <section
      ref={heroRef}
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: "calc(100dvh - 64px)" }}
      aria-labelledby="hero-title"
    >
      {/* ===== BACKGROUND LAYERS ===== */}
      <motion.div className="absolute inset-0" style={{ scale: reduced ? 1 : bgScale }} aria-hidden="true">
        <div className="absolute inset-0" style={{ background: "var(--bg-base)" }} />
        <LinearMeshGradient />
        {/* Particle field — desktop only */}
        <div className="absolute inset-0 hidden md:block">
          <ParticleField />
        </div>
      </motion.div>

      {/* ===== CONTENT ===== */}
      <motion.div
        style={reduced ? {} : { opacity: textOpacity, y: textY }}
        className="mx-auto max-w-[80rem] px-5 md:px-8 lg:px-10 w-full pt-8 pb-12 md:pt-12 md:pb-16 relative z-10"
      >
        <div className="grid grid-cols-1 gap-8 md:gap-12 items-center lg:grid-cols-2 lg:gap-20">

          {/* ── LEFT: Text ── */}
          <div className="text-left order-1 lg:order-1">
            {/* Cert badges — staggered spring entrance */}
            <motion.div
              initial={reduced ? {} : { opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-1.5 mb-6 md:mb-8"
            >
              {["GMP", "ISO", "HALAL"].map((label, i) => (
                <motion.span
                  key={label}
                  initial={reduced ? {} : { opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.3 + i * 0.08, 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 15 
                  }}
                  whileHover={reduced ? {} : { scale: 1.08 }}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[8px] md:text-[9px] font-bold tracking-[0.12em] uppercase cursor-default"
                  style={{
                    color: "var(--accent-gold)",
                    background: "oklch(0.55 0.14 88 / 0.08)",
                    border: "1px solid oklch(0.55 0.14 88 / 0.15)",
                  }}
                >
                  {label}
                </motion.span>
              ))}
            </motion.div>

            {/* H1 — Apple-style line-by-line reveal */}
            <h1
              id="hero-title"
              className="font-heading font-extrabold mb-4 md:mb-5"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
                lineHeight: 1.1,
                letterSpacing: "normal",
                color: "var(--fg-primary)",
              }}
            >
              {t("title").split("\n").map((line, i) => (
                <LineReveal key={i} delay={0.3 + i * 0.2} duration={0.8}>
                  <span className="hero-gradient-text">{line}</span>
                </LineReveal>
              ))}
            </h1>

            {/* Lead — punchy subtitle */}
            <LineReveal delay={0.7} duration={0.6}>
              <p
                className="font-heading font-semibold text-base md:text-lg lg:text-xl leading-[1.3] mb-3 md:mb-4"
                style={{ color: "var(--accent-emerald)" }}
              >
                {t("lead")}
              </p>
            </LineReveal>

            {/* Body */}
            <LineReveal delay={0.85} duration={0.6}>
              <p
                className="font-body text-sm md:text-base leading-[1.6] md:leading-[1.65] max-w-[28rem] mb-8 md:mb-10 text-[var(--fg-secondary)]"
              >
                {t("subtitle")}
              </p>
            </LineReveal>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 md:gap-4"
              initial={reduced ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
            >
              <MagneticButton>
                <Link href={`/${locale}/catalog`}>
                  {t("cta")}
                </Link>
              </MagneticButton>
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center justify-center hero-glass-btn font-body font-semibold text-base md:text-lg px-8 py-4 min-h-[56px] md:min-h-[60px] md:px-10 rounded-2xl transition-all duration-300 hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] hover:shadow-[var(--shadow-md)] hover:translate-y-[-2px] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)] focus-visible:outline-offset-2 w-full sm:w-auto"
              >
                {t("aboutLink")}
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT: Floating Product ── */}
          <motion.div
            className="relative flex justify-center items-center order-2 lg:order-2"
            initial={reduced ? {} : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reduced ? {} : { duration: 1.2, delay: 0.5, type: "spring", stiffness: 80, damping: 20 }}
          >
            <div
              className="relative floating-product w-full"
              style={{ maxWidth: "400px", aspectRatio: "1 / 1", ["--float-duration" as string]: "6s", ["--float-distance" as string]: "14px" }}
            >
              {/* Conic glow ring */}
              <div
                className="absolute inset-0 rounded-3xl hero-conic-glow"
                style={{
                  background: "conic-gradient(from 0deg, var(--accent-gold), var(--accent-emerald), var(--accent-gold))",
                  opacity: 0.05,
                  filter: "blur(24px)",
                  transform: "scale(1.12)",
                }}
                aria-hidden="true"
              />

              {/* Glass card */}
              <div className="relative glass-card-premium rounded-3xl p-6 md:p-10 h-full flex items-center justify-center overflow-hidden">
                {/* Inner glow spots */}
                <div
                  className="absolute top-0 left-0 w-36 h-36 opacity-15"
                  style={{ background: "radial-gradient(circle at 0% 0%, var(--accent-gold), transparent 70%)" }}
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-0 right-0 w-40 h-40 opacity-10"
                  style={{ background: "radial-gradient(circle at 100% 100%, var(--accent-emerald), transparent 70%)" }}
                  aria-hidden="true"
                />

                <Image
                  src="/products/greenmax/main.png"
                  alt="GreenMAX — premium detox supplement by M-International"
                  width={400}
                  height={400}
                  priority
                  sizes="(max-width: 640px) 200px, (max-width: 1024px) 260px, 360px"
                  className="w-full max-w-[200px] sm:max-w-[260px] md:max-w-[340px] lg:max-w-[360px] h-auto object-contain relative z-10 drop-shadow-[0_8px_32px_oklch(0.38_0.14_152_/0.10)]"
                />

                {/* Floating badge */}
                <motion.div
                  className="absolute -top-2 -right-2 md:-top-3 md:-right-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full font-mono font-bold text-[9px] md:text-[10px] uppercase tracking-[0.06em] shadow-[var(--shadow-lg)]"
                  style={{
                    background: "linear-gradient(135deg, var(--accent-emerald), oklch(0.32 0.16 152))",
                    color: "white",
                  }}
                  initial={reduced ? {} : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2, type: "spring", stiffness: 200 }}
                >
                  #1 Best Seller
                </motion.div>
              </div>

              {/* Soft natural shadow */}
              <div
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-3/4 h-10 rounded-full z-0"
                style={{ background: "oklch(0.38 0.14 152 / 0.05)", filter: "blur(20px)" }}
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </div>

        {/* ── STATS ROW ── */}
        <motion.div
          className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-[var(--border-subtle)]"
          initial={reduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <div className="grid grid-cols-3 gap-3 md:gap-6">
            {STATS.map((stat, i) => (
              <AnimatedStat
                key={stat.key}
                value={stat.value}
                label={t(`stat.${stat.key}`)}
                delay={0.1 + i * 0.12}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
