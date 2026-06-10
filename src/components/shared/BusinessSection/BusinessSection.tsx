"use client";

import { useRef, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { UserPlus, GraduationCap, TrendingUp, ArrowRight } from "lucide-react";
import { BUSINESS_STEPS } from "@/lib/constants";
import { ScrollReveal } from "@shared/ScrollReveal";

const STEP_ICONS = [
  <UserPlus className="w-5 h-5" />,
  <GraduationCap className="w-5 h-5" />,
  <TrendingUp className="w-5 h-5" />,
] as const;

export function BusinessSection() {
  const locale = useLocale();
  const t = useTranslations("business");
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-[var(--bg-elevated)]"
      aria-labelledby="business-title"
    >
      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-8 md:mb-14 text-left max-w-[36rem]">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] mb-4"
                 style={{ background: "oklch(1 0 0 / 0.04)", backdropFilter: "blur(12px)" }}>
              <TrendingUp className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span className="font-mono text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--accent-primary)]">
                Business Opportunity
              </span>
            </div>
            <h2
              id="business-title"
              className="font-heading font-semibold text-xl leading-[1.1] text-[var(--fg-primary)] tracking-[-0.01em] mb-2 md:mb-3 md:text-3xl lg:text-4xl"
            >
              {t("title")}
            </h2>
            <p className="font-body text-sm md:text-base leading-[1.5] text-[var(--fg-muted)]">
              {t("description")}
            </p>
          </div>
        </ScrollReveal>

        {/* Bento Grid Steps */}
        <div className="grid auto-rows-[minmax(160px,auto)] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {BUSINESS_STEPS.map((step, i) => {
            const isFeatured = step.featured;
            return (
              <ScrollReveal
                key={step.id}
                delay={i * 0.1}
                className={`${isFeatured ? "md:col-span-2 lg:col-span-2" : ""} ${i === BUSINESS_STEPS.length - 1 && BUSINESS_STEPS.length % 2 === 1 ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                <div
                  className={`group relative h-full rounded-2xl overflow-hidden transition-all duration-400 ${
                    isFeatured
                      ? "bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-primary-hover)] shadow-[var(--shadow-glow)]"
                      : "border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/25"
                  }`}
                  style={
                    !isFeatured
                      ? {
                          background: "oklch(1 0 0 / 0.03)",
                          backdropFilter: "blur(20px)",
                          WebkitBackdropFilter: "blur(20px)",
                        }
                      : undefined
                  }
                >
                  {/* Hover glow effect */}
                  {!isFeatured && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                         style={{ background: "radial-gradient(circle at 50% 30%, var(--accent-primary)08 0%, transparent 70%)" }}
                         aria-hidden="true"
                    />
                  )}

                  <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
                    {/* Step number + icon */}
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${
                        isFeatured ? "bg-white/15" : "bg-[var(--accent-primary)]/8"
                      }`}>
                        <span className={isFeatured ? "text-white" : "text-[var(--accent-primary)]"}>
                          {STEP_ICONS[i]}
                        </span>
                      </div>
                      <span className={`font-mono text-[10px] md:text-xs font-bold tracking-[0.06em] ${
                        isFeatured ? "text-white/40" : "text-[var(--fg-muted)]"
                      }`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className={`font-heading font-semibold text-base md:text-xl tracking-[-0.01em] mb-2 ${
                      isFeatured ? "text-white" : "text-[var(--fg-primary)]"
                    }`}>
                      {t(step.titleKey)}
                    </h3>
                    <p className={`font-body text-xs md:text-sm leading-[1.55] md:leading-[1.6] flex-1 ${
                      isFeatured ? "text-white/80" : "text-[var(--fg-secondary)]"
                    }`}>
                      {t(step.descriptionKey)}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.4}>
          <div className="mt-8 md:mt-12 flex justify-start">
            <Link
              href={`/${locale}/business`}
              className="inline-flex items-center gap-2 bg-[var(--accent-primary)] text-white font-body font-semibold text-sm px-6 py-3 min-h-[44px] rounded-xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[var(--shadow-glow-subtle)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[var(--shadow-md)] hover:scale-[1.02] active:scale-[0.98] group"
            >
              {t("cta")}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
