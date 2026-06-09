"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

const STATS = [
  { value: "10 000+", key: "customers" },
  { value: "50+", key: "countries" },
  { value: "15", key: "years" },
] as const;

const sectionStyles = {
  label: {
    transitionDelay: "100ms",
  },
  title: {
    transitionDelay: "200ms",
  },
  subtitle: {
    transitionDelay: "350ms",
  },
  actions: {
    transitionDelay: "500ms",
  },
  product: {
    transitionDelay: "400ms",
  },
  stats: {
    transitionDelay: "700ms",
  },
} as const;

export function HeroSectionA() {
  const locale = useLocale();
  const t = useTranslations("hero");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Use rAF instead of setTimeout for immediate paint
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      className="relative min-h-[95dvh] flex items-center pt-16 pb-8 md:pt-24 md:pb-16 overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-base)] via-[var(--bg-surface)] to-[var(--bg-base)]" />

      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 w-full relative z-10 overflow-hidden">
        <div className="grid grid-cols-1 gap-8 md:gap-10 items-center lg:grid-cols-2 lg:gap-16">
          {/* Left — Text */}
          <div className="text-left order-1 lg:order-1">
            <span
              className="inline-block mb-4 md:mb-6 font-mono font-medium text-[10px] md:text-xs uppercase tracking-[0.06em] text-[var(--accent-primary)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                ...sectionStyles.label,
              }}
            >
              {t("label")}
            </span>

            <h1
              id="hero-title"
              className="font-heading font-bold tracking-normal mb-4 md:mb-6 text-[clamp(2rem,5vw,3.75rem)] leading-[1.1] md:leading-[1.12] text-[var(--fg-primary)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                ...sectionStyles.title,
              }}
            >
              {t("title")}
            </h1>

            <p
              className="font-body text-sm md:text-lg leading-[1.6] md:leading-[1.65] max-w-[32rem] mb-6 md:mb-10 text-[var(--fg-secondary)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                ...sectionStyles.subtitle,
              }}
            >
              {t("subtitle")}
            </p>

            <div
              className="flex flex-col sm:flex-row gap-3 md:gap-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                ...sectionStyles.actions,
              }}
            >
              <Link
                href={`/${locale}/catalog`}
                className="inline-flex items-center justify-center bg-[var(--accent-primary)] text-[var(--bg-base)] font-body font-semibold text-sm md:text-base px-7 py-3.5 min-h-[44px] md:min-h-[48px] md:px-9 md:py-4 rounded-[0.5rem] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[var(--shadow-glow-subtle)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[var(--shadow-md)] hover:scale-[1.02] active:scale-[0.98]"
              >
                {t("cta")}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center justify-center backdrop-blur-sm border border-[var(--border)] text-[var(--fg-primary)] font-body font-medium text-sm md:text-base px-7 py-3.5 min-h-[44px] md:min-h-[48px] md:px-9 md:py-4 rounded-[0.5rem] transition-all duration-300 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:shadow-[var(--shadow-sm)]"
              >
                {t("aboutLink")}
              </Link>
            </div>
          </div>

          {/* Right — Product with glass card */}
          <div
            className="relative flex justify-center items-center order-2 lg:order-2 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.96)",
              ...sectionStyles.product,
            }}
          >
            <div className="relative w-full" style={{ maxWidth: "400px", aspectRatio: "1 / 1" }}>
              <div className="relative glass-card rounded-2xl md:rounded-3xl p-6 md:p-10 h-full flex items-center justify-center">
                <Image
                  src="/products/greenmax/main.png"
                  alt="GreenMAX — детокс добавка для очищения кишечника, восстановления микрофлоры и защиты печени от M-International"
                  width={420}
                  height={420}
                  priority
                  sizes="(max-width: 640px) 220px, (max-width: 1024px) 280px, 400px"
                  className="w-full max-w-[220px] sm:max-w-[280px] md:max-w-[360px] lg:max-w-[400px] h-auto object-contain relative z-10"
                />

                {/* Floating badge */}
                <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[var(--accent-primary)] text-white font-mono font-bold text-[9px] md:text-[10px] uppercase tracking-[0.04em] shadow-[var(--shadow-md)]">
                  #1 Best Seller
                </div>
              </div>

              {/* Shadow under product */}
              <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-6 blur-xl rounded-full z-0"
                style={{ background: "var(--accent-primary)", opacity: 0.04 }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          className="mt-10 md:mt-16 pt-6 md:pt-10 border-t border-[var(--border-subtle)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            ...sectionStyles.stats,
          }}
        >
          <div className="grid grid-cols-3 gap-4 md:gap-12">
            {STATS.map((stat) => (
              <div key={stat.key} className="text-center md:text-left">
                <p className="font-heading font-bold text-xl md:text-3xl lg:text-4xl text-[var(--accent-primary)] tracking-tight">
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
