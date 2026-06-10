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

const CERTIFICATES = ["GMP", "ISO", "HALAL"] as const;

const sectionStyles = {
  label: { transitionDelay: "100ms" },
  title: { transitionDelay: "200ms" },
  subtitle: { transitionDelay: "350ms" },
  actions: { transitionDelay: "500ms" },
  product: { transitionDelay: "400ms" },
  stats: { transitionDelay: "700ms" },
  certs: { transitionDelay: "600ms" },
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
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: "calc(100dvh - 64px)" }}
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

      <div
        className="mx-auto max-w-[80rem] px-5 md:px-8 lg:px-10 w-full pt-10 pb-12 md:pt-16 md:pb-20 relative z-10"
        style={{ paddingBottom: "max(48px, env(safe-area-inset-bottom))" }}
      >
        <div className="grid grid-cols-1 gap-10 md:gap-14 items-center lg:grid-cols-2 lg:gap-16">
          {/* Left — Text content */}
          <div className="text-left order-1 lg:order-1">
            {/* Trust badge — compact, premium */}
            <span
              className="inline-flex items-center gap-2 mb-6 md:mb-8 px-3.5 py-1.5 rounded-full font-mono font-bold text-[10px] md:text-[11px] tracking-[0.03em] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                color: "var(--accent-primary)",
                background: "var(--hero-radial-1)",
                border: "1px solid var(--border-subtle)",
                ...sectionStyles.label,
              }}
            >
              {CERTIFICATES.join(" • ")}
            </span>

            {/* H1 — large, tight, premium */}
            <h1
              id="hero-title"
              className="font-heading font-bold tracking-[-0.03em] mb-4 md:mb-5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                color: "var(--fg-primary)",
                fontSize: "clamp(2.2rem, 6vw, 3.75rem)",
                lineHeight: 1.08,
                ...sectionStyles.title,
              }}
            >
              {t("title")}
            </h1>

            {/* Lead — one line, accent color */}
            <p
              className="font-heading font-semibold text-lg md:text-xl lg:text-2xl leading-[1.25] mb-4 md:mb-5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                color: "var(--accent-primary)",
                ...sectionStyles.subtitle,
              }}
            >
              {t("lead")}
            </p>

            {/* Body — short, muted */}
            <p
              className="font-body text-sm md:text-base leading-[1.6] md:leading-[1.65] max-w-[28rem] mb-8 md:mb-10 text-[var(--fg-secondary)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                ...sectionStyles.subtitle,
              }}
            >
              {t("subtitle")}
            </p>

            {/* CTA buttons */}
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
                className="inline-flex items-center justify-center bg-[var(--accent-primary)] text-white font-body font-bold text-base md:text-lg px-8 py-4 min-h-[56px] md:min-h-[60px] md:px-10 rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[var(--hero-btn-shadow)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[var(--hero-btn-hover-shadow)] hover:translate-y-[-2px] active:translate-y-0 active:shadow-none focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)] focus-visible:outline-offset-2 w-full sm:w-auto"
              >
                {t("cta")}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--fg-primary)] font-body font-semibold text-base md:text-lg px-8 py-4 min-h-[56px] md:min-h-[60px] md:px-10 rounded-2xl transition-all duration-300 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:shadow-[var(--shadow-md)] hover:translate-y-[-2px] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)] focus-visible:outline-offset-2 w-full sm:w-auto"
              >
                {t("aboutLink")}
              </Link>
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
              {/* Outer glow ring */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: "conic-gradient(from 0deg, var(--accent-primary), var(--accent-gold), var(--accent-primary))",
                  opacity: 0.08,
                  filter: "blur(20px)",
                  transform: "scale(1.08)",
                }}
                aria-hidden="true"
              />
              <div className="relative glass-card rounded-2xl md:rounded-3xl p-6 md:p-10 h-full flex items-center justify-center overflow-hidden">
                {/* Decorative corner accents */}
                <div
                  className="absolute top-0 left-0 w-16 h-16 opacity-20"
                  style={{
                    background: "radial-gradient(circle at 0% 0%, var(--accent-primary), transparent 70%)",
                  }}
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-0 right-0 w-20 h-20 opacity-15"
                  style={{
                    background: "radial-gradient(circle at 100% 100%, var(--accent-gold), transparent 70%)",
                  }}
                  aria-hidden="true"
                />
                <Image
                  src="/products/greenmax/main.png"
                  alt="GreenMAX — детокс добавка для очищения кишечника, восстановления микрофлоры и защиты печени от M-International"
                  width={420}
                  height={420}
                  priority
                  sizes="(max-width: 640px) 220px, (max-width: 1024px) 280px, 400px"
                  className="w-full max-w-[220px] sm:max-w-[280px] md:max-w-[360px] lg:max-w-[400px] h-auto object-contain relative z-10 drop-shadow-[0_8px_24px_oklch(0.42_0.18_148_/0.15)]"
                />

                {/* Floating badge */}
                <div
                  className="absolute -top-2 -right-2 md:-top-3 md:-right-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full font-mono font-bold text-[9px] md:text-[10px] uppercase tracking-[0.06em] shadow-[var(--shadow-md)]"
                  style={{
                    background: "linear-gradient(135deg, var(--accent-gold), oklch(0.88 0.14 82))",
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
                  opacity: 0.08,
                  filter: "blur(20px)",
                }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          className="mt-14 md:mt-20 pt-8 md:pt-10 border-t border-[var(--border-subtle)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            ...sectionStyles.stats,
          }}
        >
          <div className="grid grid-cols-3 gap-3 md:gap-6">
            {STATS.map((stat) => (
              <div
                key={stat.key}
                className="relative text-center md:text-left rounded-xl md:rounded-2xl px-2 py-4 md:px-6 md:py-5 border overflow-hidden group"
                style={{
                  background: "linear-gradient(135deg, var(--bg-surface), var(--bg-elevated))",
                  borderColor: "var(--border-subtle)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-glow-subtle)";
                  e.currentTarget.style.borderColor = "var(--accent-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(90deg, transparent, var(--accent-primary), transparent)",
                  }}
                  aria-hidden="true"
                />
                <p
                  className="font-heading font-black text-base sm:text-xl md:text-3xl lg:text-4xl tracking-tight whitespace-nowrap tabular-nums"
                  style={{
                    background: "linear-gradient(135deg, var(--accent-primary), var(--accent-gold))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </p>
                <p className="font-body text-[9px] sm:text-[10px] md:text-sm text-[var(--fg-muted)] mt-1 leading-tight">
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
