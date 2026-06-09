"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { gsap } from "gsap";
import { prefersReducedMotion, EASING } from "@/lib/gsap-animations";

const STATS = [
  { value: "10 000+", key: "customers" },
  { value: "50+", key: "countries" },
  { value: "15", key: "years" },
] as const;

export function HeroSectionA() {
  const locale = useLocale();
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: EASING.gentle as unknown as gsap.EaseFunction },
      });

      tl.fromTo(labelRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.3")
        .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
        .fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .fromTo(productRef.current, { opacity: 0, y: 50, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.9 }, "-=0.5")
        .fromTo(statsRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.4");

      // Subtle glow pulse
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.15,
          scale: 1.05,
          duration: 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[95dvh] flex items-center pt-16 pb-8 md:pt-24 md:pb-16 overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-base)] via-[var(--bg-surface)] to-[var(--bg-base)]" />

      {/* Subtle grid — hidden on mobile */}
      <div
        className="hidden md:block absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow behind product — hidden on mobile to save GPU */}
      <div
        className="hidden md:block absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: "var(--accent-primary)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 w-full relative z-10 overflow-hidden">
        <div className="grid grid-cols-1 gap-8 md:gap-10 items-center lg:grid-cols-2 lg:gap-16">
          {/* Left — Text */}
          <div className="text-left order-1 lg:order-1">
            <span
              ref={labelRef}
              className="inline-block mb-4 md:mb-6 font-mono font-semibold text-[10px] md:text-xs uppercase tracking-[0.1em] text-[var(--accent-primary)]"
            >
              {t("label")}
            </span>

            <h1
              ref={titleRef}
              id="hero-title"
              className="font-heading font-bold tracking-normal mb-4 md:mb-6 text-[clamp(2rem,5vw,3.75rem)] leading-[1.08] md:leading-[1.08] text-[var(--fg-primary)]"
            >
              {t("title")}
            </h1>

            <p
              ref={subtitleRef}
              className="font-body text-sm md:text-lg leading-[1.55] md:leading-[1.65] max-w-[32rem] mb-6 md:mb-10 text-[var(--fg-secondary)]"
            >
              {t("subtitle")}
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link
                href={`/${locale}/catalog`}
                className="inline-flex items-center justify-center bg-[var(--accent-primary)] text-[var(--bg-base)] font-body font-semibold text-sm md:text-base px-7 py-3.5 min-h-[44px] md:min-h-[48px] md:px-9 md:py-4 rounded-[0.5rem] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[var(--shadow-glow-subtle)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[var(--shadow-md)] hover:scale-[1.02] active:scale-[0.98]"
              >
                {t("cta")}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center justify-center border border-[var(--border)] text-[var(--fg-primary)] font-body font-medium text-sm md:text-base px-7 py-3.5 min-h-[44px] md:min-h-[48px] md:px-9 md:py-4 rounded-[0.5rem] transition-all duration-300 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:shadow-[var(--shadow-sm)]"
              >
                {t("aboutLink")}
              </Link>
            </div>
          </div>

          {/* Right — Product with glassmorphism card */}
          <div
            ref={productRef}
            className="relative flex justify-center items-center order-2 lg:order-2"
          >
            <div className="relative w-full" style={{ maxWidth: "400px", aspectRatio: "1 / 1" }}>
              {/* Animated glow ring — subtler */}
              <div
                ref={glowRef}
                className="absolute inset-0 -m-6 md:-m-10 rounded-full opacity-[0.08] blur-2xl"
                style={{ background: "var(--accent-primary)" }}
                aria-hidden="true"
              />

              {/* Glass card */}
              <div className="relative glass-card rounded-2xl md:rounded-3xl p-6 md:p-10 h-full flex items-center justify-center">
                <Image
                  src="/products/greenmax/main.png"
                  alt="GreenMAX — flagship product of M-International"
                  width={420}
                  height={420}
                  priority
                  className="w-full max-w-[220px] sm:max-w-[280px] md:max-w-[360px] lg:max-w-[400px] h-auto object-contain relative z-10 drop-shadow-2xl"
                  style={{ aspectRatio: "1 / 1" }}
                />

                {/* Floating badge — refined */}
                <div
                  className="absolute -top-2 -right-2 md:-top-3 md:-right-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[var(--accent-primary)] text-white font-mono font-bold text-[9px] md:text-[10px] uppercase tracking-[0.06em] shadow-[var(--shadow-md)]"
                >
                  #1 Best Seller
                </div>
              </div>

              {/* Shadow under product */}
              <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-6 blur-xl rounded-full z-0"
                style={{ background: "var(--accent-primary)", opacity: 0.06 }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Stats row — premium style */}
        <div
          ref={statsRef}
          className="mt-10 md:mt-16 pt-6 md:pt-10 border-t border-[var(--border-subtle)]"
          style={{ minHeight: "80px" }}
        >
          <div className="grid grid-cols-3 gap-4 md:gap-12">
            {STATS.map((stat) => (
              <div key={stat.key} className="text-center md:text-left">
                <p className="font-heading font-bold text-xl md:text-3xl lg:text-4xl text-[var(--accent-primary)] tracking-tight" style={{ minHeight: "clamp(1.5rem, 4vw, 3rem)" }}>
                  {stat.value}
                </p>
                <p className="font-body text-[10px] md:text-sm text-[var(--fg-muted)] mt-1">
                  {t(`stat.${stat.key}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
