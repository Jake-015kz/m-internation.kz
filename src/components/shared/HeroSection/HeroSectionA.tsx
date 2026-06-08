"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { gsap } from "gsap";
import { prefersReducedMotion, EASING } from "@/lib/gsap-animations";

export function HeroSectionA() {
  const locale = useLocale();
  const t = useTranslations("hero");
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        opacity: 1, y: 0, duration: 0.8, ease: EASING.gentle as any,
      });
      gsap.to(imageRef.current, {
        opacity: 1, scale: 1, duration: 1, delay: 0.2, ease: EASING.gentle as any,
      });
      gsap.to(badgesRef.current, {
        opacity: 1, duration: 0.6, delay: 0.5,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative min-h-screen md:min-h-[100dvh] flex items-center pt-16 pb-8 md:pt-24 md:pb-16 overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-base)] via-[var(--bg-surface)] to-[var(--bg-elevated)]" />

      {/* Decorative orbs — desktop only */}
      <div className="hidden md:block absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[oklch(0.52_0.14_145/0.08)] blur-3xl" />
      <div className="hidden md:block absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-[oklch(0.62_0.12_85/0.06)] blur-3xl" />

      <div className="mx-auto max-w-[80rem] px-3 md:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2 lg:gap-16">
          {/* Left — Text */}
          <div
            ref={textRef}
            className="text-left opacity-0"
            style={{ transform: "translateY(30px)" }}
          >
            <span className="inline-block mb-4 md:mb-6 font-mono font-semibold text-[10px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.15em] text-[var(--accent-primary)]">
              {t("label")}
            </span>

            <h1
              id="hero-title"
              className="font-heading font-bold tracking-[-0.01em] md:tracking-[-0.04em] mb-4 md:mb-8 text-[clamp(1.75rem,7vw,4.5rem)] leading-[1.1] md:leading-[1.05] text-[var(--fg-primary)] break-words"
            >
              {t("title")}
            </h1>

            <p className="font-body text-sm md:text-lg leading-[1.5] max-w-[28rem] mb-6 md:mb-8 text-[var(--fg-secondary)]">
              {t("subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link
                href={`/${locale}/catalog`}
                className="inline-flex items-center justify-center bg-[var(--accent-primary)] text-white font-body font-medium text-sm md:text-base px-6 py-3 md:px-8 md:py-4 rounded-[var(--radius-sm)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[var(--shadow-md)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[var(--shadow-lg)] hover:scale-[1.02] active:scale-[0.98]"
              >
                {t("cta")}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center justify-center border border-[var(--border)] text-[var(--fg-primary)] font-body font-medium text-sm md:text-base px-6 py-3 md:px-8 md:py-4 rounded-[var(--radius-sm)] transition-all duration-300 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
              >
                {t("aboutLink")}
              </Link>
            </div>
          </div>

          {/* Right — Product with glass card */}
          <div
            ref={imageRef}
            className="relative flex justify-center items-center opacity-0"
            style={{ transform: "scale(0.95)" }}
          >
            <div className="relative">
              {/* Glass card behind product */}
              <div className="absolute inset-0 -m-4 md:-m-8 glass-card rounded-2xl md:rounded-3xl" />

              <Image
                src="/products/greenmax/main.png"
                alt="GreenMAX — flagship product of M-International"
                width={420}
                height={420}
                priority
                className="w-full max-w-[260px] md:max-w-[380px] lg:max-w-[420px] h-auto object-contain relative z-10"
              />

              {/* Glow under product */}
              <div
                className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 md:h-12 bg-[var(--accent-primary)] opacity-[0.15] blur-xl md:blur-2xl rounded-full z-0"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div
          ref={badgesRef}
          className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-[var(--border-subtle)] opacity-0"
        >
          <div className="flex flex-wrap gap-4 md:gap-8 items-center">
            <p className="font-mono text-[10px] md:text-xs text-[var(--fg-muted)] tracking-[0.05em]">
              Trusted by 10,000+ customers across 50 countries
            </p>
            <div className="flex gap-2 md:gap-4">
              {["GMP", "ISO", "HALAL"].map((cert) => (
                <span
                  key={cert}
                  className="font-mono text-[0.55rem] md:text-[0.65rem] font-medium uppercase tracking-[0.08em] md:tracking-[0.1em] text-[var(--fg-dim)] px-2 md:px-3 py-0.5 md:py-1 border border-[var(--border-subtle)] rounded-full"
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
