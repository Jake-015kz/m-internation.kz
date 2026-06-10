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
      {/* ===== MESH GRADIENT BACKGROUND ===== */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Base layer */}
        <div className="absolute inset-0" style={{ background: "var(--bg-base)" }} />

        {/* Mesh gradient orbs — soft, organic, premium */}
        <div
          className="absolute inset-0 hero-mesh-gradient"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 10% 20%, oklch(0.72 0.19 148 / 0.12) 0%, transparent 50%),
              radial-gradient(ellipse 50% 40% at 85% 75%, oklch(0.82 0.12 82 / 0.08) 0%, transparent 45%),
              radial-gradient(ellipse 40% 35% at 50% 50%, oklch(0.65 0.16 250 / 0.04) 0%, transparent 50%)
            `,
          }}
        />

        {/* Animated mesh blobs — GPU-composited */}
        <div
          className="absolute top-[10%] left-[5%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full opacity-[0.07] hero-blob-1"
          style={{
            background: "radial-gradient(circle, var(--accent-primary), transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-[10%] right-[5%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full opacity-[0.05] hero-blob-2"
          style={{
            background: "radial-gradient(circle, var(--accent-gold), transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute top-[40%] right-[20%] w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full opacity-[0.04] hero-blob-3"
          style={{
            background: "radial-gradient(circle, oklch(0.65 0.16 250), transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(oklch(1 0 0 / 0.1) 1px, transparent 1px),
              linear-gradient(90deg, oklch(1 0 0 / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div
        className="mx-auto max-w-[80rem] px-5 md:px-8 lg:px-10 w-full pt-10 pb-12 md:pt-16 md:pb-20 relative z-10"
        style={{ paddingBottom: "max(48px, env(safe-area-inset-bottom))" }}
      >
        <div className="grid grid-cols-1 gap-10 md:gap-14 items-center lg:grid-cols-2 lg:gap-16">
          {/* Left — Text content */}
          <div className="text-left order-1 lg:order-1">
            {/* Trust badge — glassmorphism */}
            <span
              className="inline-flex items-center gap-2 mb-6 md:mb-8 px-4 py-2 rounded-full font-mono font-bold text-[10px] md:text-[11px] tracking-[0.03em] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hero-glass-badge"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                color: "var(--accent-primary)",
                background: "oklch(0.72 0.19 148 / 0.08)",
                border: "1px solid oklch(0.72 0.19 148 / 0.15)",
                backdropFilter: "blur(12px) saturate(140%)",
                WebkitBackdropFilter: "blur(12px) saturate(140%)",
                ...sectionStyles.label,
              }}
            >
              {CERTIFICATES.join(" • ")}
            </span>

            {/* H1 — gradient text, tight, premium */}
            <h1
              id="hero-title"
              className="font-heading font-extrabold mb-4 md:mb-5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hero-gradient-text"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                fontSize: "clamp(2.4rem, 6.5vw, 4rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                background: "linear-gradient(135deg, var(--fg-primary) 0%, var(--accent-primary) 50%, var(--accent-gold) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                ...sectionStyles.title,
              }}
            >
              {t("title")}
            </h1>

            {/* Lead — accent color, bold */}
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
                className="inline-flex items-center justify-center hero-glass-btn font-body font-semibold text-base md:text-lg px-8 py-4 min-h-[56px] md:min-h-[60px] md:px-10 rounded-2xl transition-all duration-300 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:shadow-[var(--shadow-md)] hover:translate-y-[-2px] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)] focus-visible:outline-offset-2 w-full sm:w-auto"
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
              {/* Animated conic glow ring */}
              <div
                className="absolute inset-0 rounded-3xl hero-conic-glow"
                style={{
                  background: "conic-gradient(from 0deg, var(--accent-primary), var(--accent-gold), var(--accent-primary))",
                  opacity: 0.1,
                  filter: "blur(24px)",
                  transform: "scale(1.1)",
                }}
                aria-hidden="true"
              />

              {/* Glass card — enhanced */}
              <div className="relative glass-card-premium rounded-2xl md:rounded-3xl p-6 md:p-10 h-full flex items-center justify-center overflow-hidden">
                {/* Inner glow spots */}
                <div
                  className="absolute top-0 left-0 w-24 h-24 opacity-30"
                  style={{
                    background: "radial-gradient(circle at 0% 0%, var(--accent-primary), transparent 70%)",
                  }}
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-0 right-0 w-32 h-32 opacity-20"
                  style={{
                    background: "radial-gradient(circle at 100% 100%, var(--accent-gold), transparent 70%)",
                  }}
                  aria-hidden="true"
                />

                {/* Glass shine overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, oklch(1 0 0 / 0.08) 0%, transparent 50%)",
                    borderRadius: "inherit",
                  }}
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

        {/* Stats row — glassmorphism cards */}
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
                className="relative text-center md:text-left rounded-xl md:rounded-2xl px-2 py-4 md:px-6 md:py-5 border overflow-hidden group hero-stat-card"
                style={{
                  background: "linear-gradient(135deg, var(--bg-surface), var(--bg-elevated))",
                  borderColor: "var(--border-subtle)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-glow)";
                  e.currentTarget.style.borderColor = "var(--accent-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                }}
              >
                {/* Top accent line on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(90deg, transparent, var(--accent-primary), transparent)",
                  }}
                  aria-hidden="true"
                />

                {/* Inner glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 50% 0%, oklch(0.72 0.19 148 / 0.06), transparent 70%)",
                  }}
                  aria-hidden="true"
                />

                <p
                  className="font-heading font-black text-base sm:text-xl md:text-3xl lg:text-4xl tracking-tight whitespace-nowrap tabular-nums relative z-10"
                  style={{
                    background: "linear-gradient(135deg, var(--accent-primary), var(--accent-gold))",
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
