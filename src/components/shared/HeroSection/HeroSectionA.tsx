"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { gsap } from "gsap";
import { prefersReducedMotion, EASING } from "@/lib/gsap-animations";

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }

    const obj = { val: 0 };
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        once: true,
      },
    });

    tl.to(obj, {
      val: target,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => setValue(Math.round(obj.val)),
    });

    return () => { tl.kill(); };
  }, [target]);

  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>;
}

export function HeroSectionA() {
  const locale = useLocale();
  const t = useTranslations("hero");
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        opacity: 1, y: 0, duration: 0.8,
        ease: EASING.gentle as unknown as gsap.EaseFunction,
      });
      gsap.to(imageRef.current, {
        opacity: 1, scale: 1, duration: 1, delay: 0.15,
        ease: EASING.gentle as unknown as gsap.EaseFunction,
      });
      gsap.to(badgesRef.current, {
        opacity: 1, duration: 0.6, delay: 0.4,
      });
      if (statsRef.current) {
        gsap.fromTo(statsRef.current, { opacity: 0, y: 16 }, {
          opacity: 1, y: 0, duration: 0.5, delay: 0.6,
          ease: EASING.gentle as unknown as gsap.EaseFunction,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative min-h-[100dvh] flex items-center pt-14 pb-6 md:pt-20 md:pb-12 overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-base)] via-[var(--bg-surface)] to-[var(--bg-base)]" />

      {/* Animated gradient mesh — desktop only */}
      {!isMobile && (
        <>
          <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full opacity-[0.07]"
            style={{ background: "radial-gradient(circle, oklch(0.78 0.22 135), transparent 70%)" }} />
          <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full opacity-[0.05]"
            style={{ background: "radial-gradient(circle, oklch(0.85 0.16 85), transparent 70%)" }} />
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03]"
            style={{ background: "radial-gradient(circle, oklch(0.65 0.18 250), transparent 70%)" }} />
        </>
      )}

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)",
          backgroundSize: isMobile ? "30px 30px" : "60px 60px",
        }}
      />

      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 gap-6 md:gap-8 items-center lg:grid-cols-2 lg:gap-12">

          {/* Left — Text */}
          <div
            ref={textRef}
            className="text-left opacity-0 order-2 lg:order-1"
            style={{ transform: "translateY(30px)" }}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-3 md:mb-5 px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
              <span className="pulse-dot" />
              <span className="font-mono font-medium text-[10px] md:text-xs uppercase tracking-[0.08em] text-[var(--fg-secondary)]">
                {t("label")}
              </span>
            </div>

            <h1
              id="hero-title"
              className="font-heading font-bold tracking-[-0.02em] md:tracking-[-0.04em] mb-3 md:mb-5 text-[clamp(1.75rem,6vw,4rem)] leading-[1.1] md:leading-[1.05] text-[var(--fg-primary)]"
            >
              {t("title")}
            </h1>

            <p className="font-body text-sm md:text-lg leading-[1.5] md:leading-[1.6] max-w-[30rem] mb-5 md:mb-8 text-[var(--fg-secondary)]">
              {t("subtitle")}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link
                href={`/${locale}/catalog`}
                className="inline-flex items-center justify-center bg-[var(--accent-primary)] text-white font-body font-semibold text-sm md:text-base px-6 py-3 md:px-8 md:py-4 rounded-[var(--radius-sm)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[var(--shadow-glow)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[var(--shadow-xl)] hover:scale-[1.02] active:scale-[0.98]"
              >
                {t("cta")}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center justify-center border border-[var(--border)] text-[var(--fg-primary)] font-body font-medium text-sm md:text-base px-6 py-3 md:px-8 md:py-4 rounded-[var(--radius-sm)] transition-all duration-300 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:bg-[oklch(0.78_0.22_135/0.04)]"
              >
                {t("aboutLink")}
              </Link>
            </div>
          </div>

          {/* Right — Product image */}
          <div
            ref={imageRef}
            className="relative flex justify-center items-center opacity-0 order-1 lg:order-2"
            style={{ transform: "scale(0.95)" }}
          >
            <div className="relative">
              {/* Rotating ring behind product */}
              {!isMobile && (
                <div
                  className="absolute inset-0 -m-12 rounded-full opacity-[0.06]"
                  style={{
                    background: "conic-gradient(from 0deg, var(--accent-primary), var(--accent-gold), var(--accent-primary))",
                    filter: "blur(40px)",
                    animation: "spin 20s linear infinite",
                  }}
                />
              )}

              {/* Glass card behind product */}
              <div className="absolute inset-0 -m-3 md:-m-6 glass-card rounded-2xl md:rounded-3xl" />

              <Image
                src="/products/greenmax/main.png"
                alt="GreenMAX — flagship product of M-International"
                width={420}
                height={420}
                priority
                className="w-full max-w-[200px] sm:max-w-[260px] md:max-w-[360px] lg:max-w-[400px] h-auto object-contain relative z-10"
              />

              {/* Glow under product */}
              <div
                className="absolute bottom-1 md:bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-6 md:h-10 bg-[var(--accent-primary)] opacity-[0.12] blur-xl md:blur-2xl rounded-full z-0"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Trust badges + Stats */}
        <div
          ref={badgesRef}
          className="mt-8 md:mt-14 pt-5 md:pt-8 border-t border-[var(--border-subtle)] opacity-0"
        >
          {/* Stats row */}
          <div ref={statsRef} className="grid grid-cols-3 gap-3 md:gap-8 mb-5 md:mb-6">
            <div className="text-center md:text-left">
              <p className="font-heading font-bold text-lg md:text-2xl text-[var(--accent-primary)]">
                <AnimatedNumber target={10000} suffix="+" />
              </p>
              <p className="font-body text-[10px] md:text-xs text-[var(--fg-muted)] mt-0.5">
                {t("stat.customers")}
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="font-heading font-bold text-lg md:text-2xl text-[var(--accent-primary)]">
                <AnimatedNumber target={50} suffix="+" />
              </p>
              <p className="font-body text-[10px] md:text-xs text-[var(--fg-muted)] mt-0.5">
                {t("stat.countries")}
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="font-heading font-bold text-lg md:text-2xl text-[var(--accent-primary)]">
                <AnimatedNumber target={15} suffix="" />
              </p>
              <p className="font-body text-[10px] md:text-xs text-[var(--fg-muted)] mt-0.5">
                {t("stat.years")}
              </p>
            </div>
          </div>

          {/* Cert badges */}
          <div className="flex flex-wrap gap-2 md:gap-3 items-center">
            <p className="font-mono text-[10px] md:text-xs text-[var(--fg-muted)] tracking-[0.05em] mr-1">
              Certified:
            </p>
            {["GMP", "ISO 22000", "HALAL", "HACCP"].map((cert) => (
              <span
                key={cert}
                className="font-mono text-[0.5rem] md:text-[0.65rem] font-semibold uppercase tracking-[0.08em] md:tracking-[0.1em] text-[var(--fg-dim)] px-2 md:px-3 py-0.5 md:py-1 border border-[var(--border-subtle)] rounded-full"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
