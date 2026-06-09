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
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: EASING.gentle as unknown as gsap.EaseFunction },
      });

      tl.fromTo(labelRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo(titleRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.3")
        .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .fromTo(productRef.current, { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8 }, "-=0.4")
        .fromTo(statsRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.3");
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90dvh] flex items-center pt-14 pb-6 md:pt-20 md:pb-12 overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-base)] via-[var(--bg-surface)] to-[var(--bg-base)]" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 gap-6 md:gap-8 items-center lg:grid-cols-2 lg:gap-12">
          {/* Left — Text */}
          <div className="text-left order-1 lg:order-1">
            <span
              ref={labelRef}
              className="inline-block mb-3 md:mb-5 font-mono font-semibold text-[10px] md:text-xs uppercase tracking-[0.08em] md:tracking-[0.12em] text-[var(--accent-primary)]"
            >
              {t("label")}
            </span>

            <h1
              ref={titleRef}
              id="hero-title"
              className="font-heading font-semibold tracking-[-0.02em] mb-3 md:mb-5 text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.1] md:leading-[1.08] text-[var(--fg-primary)]"
            >
              {t("title")}
            </h1>

            <p
              ref={subtitleRef}
              className="font-body text-sm md:text-lg leading-[1.5] md:leading-[1.6] max-w-[30rem] mb-5 md:mb-8 text-[var(--fg-secondary)]"
            >
              {t("subtitle")}
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link
                href={`/${locale}/catalog`}
                className="inline-flex items-center justify-center bg-[var(--accent-primary)] text-white font-body font-semibold text-sm md:text-base px-6 py-3 md:px-8 md:py-4 rounded-[var(--radius-sm)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[var(--shadow-md)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[var(--shadow-lg)] hover:scale-[1.02] active:scale-[0.98]"
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

          {/* Right — Product image */}
          <div
            ref={productRef}
            className="relative flex justify-center items-center order-2 lg:order-2"
          >
            <div className="relative">
              {/* Glass card behind product */}
              <div className="absolute inset-0 -m-3 md:-m-6 glass-card rounded-2xl md:rounded-3xl" />

              <Image
                src="/products/greenmax/main.png"
                alt="GreenMAX — flagship product of M-International"
                width={420}
                height={420}
                priority
                className="w-full max-w-[200px] sm:max-w-[260px] md:max-w-[340px] lg:max-w-[380px] h-auto object-contain relative z-10"
              />

              {/* Glow under product */}
              <div
                className="absolute bottom-1 md:bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-6 md:h-10 blur-xl md:blur-2xl rounded-full z-0"
                style={{ background: "var(--accent-primary)", opacity: 0.1 }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          className="mt-8 md:mt-12 pt-5 md:pt-8 border-t border-[var(--border-subtle)]"
        >
          <div className="grid grid-cols-3 gap-3 md:gap-8">
            <div className="text-center md:text-left">
              <p className="font-heading font-bold text-lg md:text-2xl text-[var(--accent-primary)]">
                10 000+
              </p>
              <p className="font-body text-[10px] md:text-xs text-[var(--fg-muted)] mt-0.5">
                {t("stat.customers")}
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="font-heading font-bold text-lg md:text-2xl text-[var(--accent-primary)]">
                50+
              </p>
              <p className="font-body text-[10px] md:text-xs text-[var(--fg-muted)] mt-0.5">
                {t("stat.countries")}
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="font-heading font-bold text-lg md:text-2xl text-[var(--accent-primary)]">
                15
              </p>
              <p className="font-body text-[10px] md:text-xs text-[var(--fg-muted)] mt-0.5">
                {t("stat.years")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
