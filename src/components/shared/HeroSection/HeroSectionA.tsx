"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ShieldCheck, Award, Leaf } from "lucide-react";

const STATS = [
  { value: "10 000+", key: "customers" },
  { value: "50+", key: "countries" },
  { value: "15", key: "years" },
] as const;

const CERTIFICATES = ["GMP", "ISO", "HALAL"] as const;

const sectionStyles = {
  label: { transitionDelay: "100ms" },
  title: { transitionDelay: "200ms" },
  subtitle: { transitionDelay: "350ms" },
  actions: { transitionDelay: "500ms" },
  product: { transitionDelay: "400ms" },
  stats: { transitionDelay: "700ms" },
} as const;

export function HeroSectionA() {
  const locale = useLocale();
  const t = useTranslations("hero");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      className="relative min-h-[95dvh] flex items-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Premium radial gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 15% 20%, var(--hero-radial-1) 0%, transparent 45%),
            radial-gradient(ellipse at 85% 75%, var(--hero-radial-2) 0%, transparent 40%),
            var(--bg-base)
          `,
        }}
        aria-hidden="true"
      />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(var(--border-subtle) 1px, transparent 1px),
            linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 w-full pt-20 pb-12 md:pt-28 md:pb-16 relative z-10">
        <div className="grid grid-cols-1 gap-8 md:gap-10 items-center lg:grid-cols-2 lg:gap-16">
          {/* Left — Text content */}
          <div className="text-left order-1 lg:order-1">
            {/* Eyebrow with gold accent dot */}
            <span
              className="inline-flex items-center gap-2.5 mb-5 md:mb-6 font-mono font-semibold text-[10px] md:text-xs uppercase tracking-[0.12em] text-[var(--accent-primary)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                ...sectionStyles.label,
              }}
            >
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{
                  background: "var(--accent-gold)",
                  boxShadow: "0 0 0 4px var(--hero-radial-2)",
                }}
                aria-hidden="true"
              />
              {t("label")}
            </span>

            {/* H1 — premium, tight, balanced */}
            <h1
              id="hero-title"
              className="font-heading font-bold tracking-[-0.03em] mb-5 md:mb-6 text-[clamp(2rem,5vw,3.75rem)] leading-[1.08] md:leading-[1.1] text-[var(--fg-primary)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                ...sectionStyles.title,
              }}
            >
              {t("title")}
            </h1>

            {/* Description — more breathing room */}
            <p
              className="font-body text-sm md:text-base leading-[1.65] md:leading-[1.7] max-w-[32rem] mb-7 md:mb-10 text-[var(--fg-secondary)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                ...sectionStyles.subtitle,
              }}
            >
              {t("subtitle")}
            </p>

            {/* CTA buttons — premium style */}
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
                className="inline-flex items-center justify-center bg-[var(--accent-primary)] text-white font-body font-semibold text-sm md:text-base px-7 py-3.5 min-h-[52px] md:min-h-[56px] md:px-9 md:py-4 rounded-xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[var(--hero-btn-shadow)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[var(--hero-btn-hover-shadow)] hover:translate-y-[-2px] active:translate-y-0 active:shadow-none focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)] focus-visible:outline-offset-2"
              >
                {t("cta")}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center justify-center backdrop-blur-sm border border-[var(--border)] text-[var(--fg-primary)] font-body font-medium text-sm md:text-base px-7 py-3.5 min-h-[52px] md:min-h-[56px] md:px-9 md:py-4 rounded-xl transition-all duration-300 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:bg-[var(--bg-surface)] hover:shadow-[var(--shadow-sm)] focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)] focus-visible:outline-offset-2"
              >
                {t("aboutLink")}
              </Link>
            </div>

            {/* Certificate badges — premium pill style */}
            <div
              className="flex flex-wrap gap-2.5 mt-7 md:mt-9"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 600ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) 600ms",
              }}
            >
              {CERTIFICATES.map((cert) => (
                <span
                  key={cert}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] md:text-xs font-semibold tracking-wide"
                  style={{
                    color: "var(--accent-primary)",
                    background: "var(--hero-radial-1)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <ShieldCheck size={12} aria-hidden="true" />
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Product with premium glass card */}
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

                {/* Floating badge — premium gold style */}
                <div
                  className="absolute -top-2 -right-2 md:-top-3 md:-right-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full font-mono font-bold text-[9px] md:text-[10px] uppercase tracking-[0.06em] shadow-[var(--shadow-md)]"
                  style={{
                    background: "var(--accent-gold)",
                    color: "var(--bg-base)",
                  }}
                >
                  #1 Best Seller
                </div>
              </div>

              {/* Soft glow under product */}
              <div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2/3 h-8 rounded-full z-0"
                style={{
                  background: "var(--accent-primary)",
                  opacity: 0.05,
                  filter: "blur(16px)",
                }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Stats row — cleaner, more premium */}
        <div
          className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-[var(--border-subtle)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            ...sectionStyles.stats,
          }}
        >
          <div className="grid grid-cols-3 gap-4 md:gap-12">
            {STATS.map((stat) => (
              <div key={stat.key} className="text-center md:text-left">
                <p className="font-heading font-bold text-xl md:text-3xl lg:text-4xl tracking-tight" style={{ color: "var(--accent-gold)" }}>
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
