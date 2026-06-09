"use client";

import { useRef, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { BUSINESS_STEPS } from "@/lib/constants";

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
        <div
          className="mb-10 md:mb-16 text-left max-w-[36rem] transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <h2
            id="business-title"
            className="font-heading font-semibold text-xl leading-[1.1] text-[var(--fg-primary)] tracking-[-0.01em] mb-2 md:mb-4 md:text-3xl lg:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="font-body text-sm md:text-base leading-[1.45] text-[var(--fg-muted)]">
            {t("description")}
          </p>
        </div>

        {/* Cards — vertical stack, no GSAP sticky */}
        <div className="relative flex flex-col gap-4 md:gap-6">
          {BUSINESS_STEPS.map((step, i) => {
            const cardBg = step.featured
              ? "bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-primary-hover)] text-[var(--bg-base)] shadow-[var(--shadow-glow)]"
              : "bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-elevated)] border border-[var(--border-subtle)]";
            const labelColor = step.featured ? "text-[var(--bg-base)]/60" : "text-[var(--fg-muted)]";
            const lineBg = step.featured ? "bg-[var(--bg-base)]/20" : "bg-[var(--border-subtle)]";
            const titleColor = step.featured ? "text-[var(--bg-base)]" : "text-[var(--fg-primary)]";
            const descColor = step.featured ? "text-[var(--bg-base)]/80" : "text-[var(--fg-secondary)]";

            return (
              <div
                key={step.id}
                className="transition-all duration-500 ease-out"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transitionDelay: `${150 + i * 80}ms`,
                }}
              >
                <div className={`rounded-2xl p-8 md:p-10 lg:p-12 transition-shadow duration-300 ${cardBg}`}>
                  <div className="flex flex-col gap-2 md:gap-3 max-w-[480px]">
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-[10px] md:text-xs font-semibold tracking-[0.06em] ${labelColor}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className={`h-[1px] flex-1 ${lineBg}`} />
                    </div>
                    <h3 className={`font-heading font-semibold text-base md:text-xl tracking-[-0.01em] ${titleColor}`}>
                      {t(step.titleKey)}
                    </h3>
                    <p className={`font-body text-xs md:text-sm leading-[1.5] md:leading-[1.6] ${descColor}`}>
                      {t(step.descriptionKey)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className="mt-8 md:mt-12 flex justify-start transition-all duration-500 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "600ms",
          }}
        >
          <Link
            href={`/${locale}/business`}
            className="inline-flex items-center gap-2 bg-[var(--accent-primary)] text-[var(--bg-base)] font-body font-semibold text-sm px-6 py-3 min-h-[44px] rounded-[0.5rem] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[var(--shadow-glow-subtle)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[var(--shadow-md)] hover:scale-[1.02] active:scale-[0.98]"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
