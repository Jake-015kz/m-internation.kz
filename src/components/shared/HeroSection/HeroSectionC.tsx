"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { gsap } from "gsap";
import { prefersReducedMotion, EASING } from "@/lib/gsap-animations";

export function HeroSectionC() {
  const locale = useLocale();
  const t = useTranslations("hero");
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.6 })
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: EASING.gentle as any }, "-=0.4")
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: EASING.gentle as any }, "-=0.5")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: EASING.gentle as any }, "-=0.5")
        .to(productRef.current, { opacity: 1, y: 0, duration: 1, ease: EASING.gentle as any }, "-=0.4")
        .to(trustRef.current, { opacity: 1, duration: 0.6 }, "-=0.3");
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative min-h-screen md:min-h-[100dvh] flex items-center pt-16 pb-8 md:pt-24 md:pb-16 overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Dark cinematic background */}
      <div className="absolute inset-0 bg-[var(--bg-base)]" />

      {/* Radial gradient overlay — desktop only */}
      <div
        className="hidden md:block absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.52 0.14 145 / 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 grid-pattern" />

      <div className="mx-auto max-w-[80rem] px-3 md:px-6 lg:px-8 w-full relative z-10">
        {/* Centered layout */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Label */}
          <div ref={labelRef} className="opacity-0" style={{ transform: "translateY(20px)" }}>
            <span className="inline-block mb-4 md:mb-8 font-mono font-semibold text-[10px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.2em] text-[var(--accent-primary)]">
              {t("label")}
            </span>
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            id="hero-title"
            className="font-heading font-bold tracking-[-0.01em] md:tracking-[-0.04em] mb-4 md:mb-6 text-[clamp(1.75rem,8vw,5rem)] leading-[1.1] md:leading-[1.05] text-[var(--fg-primary)] opacity-0 break-words"
            style={{ transform: "translateY(30px)" }}
          >
            {t("title")}
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="font-body text-sm md:text-xl leading-[1.5] max-w-[32rem] mx-auto mb-6 md:mb-10 text-[var(--fg-secondary)] opacity-0"
            style={{ transform: "translateY(30px)" }}
          >
            {t("subtitle")}
          </p>

          {/* CTA */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 opacity-0"
            style={{ transform: "translateY(30px)" }}
          >
            <Link
              href={`/${locale}/catalog`}
              className="inline-flex items-center justify-center bg-[var(--accent-primary)] text-white font-body font-medium text-sm md:text-base px-8 py-3 md:px-10 md:py-4 rounded-[var(--radius-sm)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[var(--shadow-md)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[var(--shadow-lg)] hover:scale-[1.02] active:scale-[0.98]"
            >
              {t("cta")}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center justify-center border border-[var(--border)] text-[var(--fg-primary)] font-body font-medium text-sm md:text-base px-8 py-3 md:px-10 md:py-4 rounded-[var(--radius-sm)] transition-all duration-300 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
            >
              {t("aboutLink")}
            </Link>
          </div>
        </div>

        {/* Product image - centered below text */}
        <div
          ref={productRef}
          className="mt-10 md:mt-16 relative flex justify-center opacity-0"
          style={{ transform: "translateY(50px)" }}
        >
          <div className="relative">
            {/* Glow behind product — desktop only */}
            <div
              className="hidden md:block absolute inset-0 -m-16 bg-[var(--accent-primary)] opacity-[0.08] rounded-full blur-3xl"
              aria-hidden="true"
            />

            {/* Glass card frame */}
            <div className="glass-card p-4 md:p-8 lg:p-12">
              <Image
                src="/products/greenmax/main.png"
                alt="GreenMAX — flagship product of M-International"
                width={380}
                height={380}
                priority
                className="w-full max-w-[200px] md:max-w-[350px] h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bottom trust line */}
        <div ref={trustRef} className="mt-10 md:mt-16 text-center opacity-0">
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 items-center">
            <p className="font-mono text-[10px] md:text-xs text-[var(--fg-muted)] tracking-[0.05em]">
              Trusted by 10,000+ customers across 50 countries
            </p>
            <div className="hidden md:block w-px h-4 bg-[var(--border)]" />
            <div className="flex gap-2 md:gap-3">
              {["GMP", "ISO", "HALAL", "EAC"].map((cert) => (
                <span
                  key={cert}
                  className="font-mono text-[0.5rem] md:text-[0.6rem] font-medium uppercase tracking-[0.08em] md:tracking-[0.1em] text-[var(--fg-dim)] px-1.5 py-0.5 md:px-2 md:py-1 border border-[var(--border-subtle)] rounded"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
