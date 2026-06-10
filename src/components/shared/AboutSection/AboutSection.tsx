"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { TIMELINE_ITEMS } from "@/lib/constants";
import { ScrollReveal } from "@shared/ScrollReveal";

export function AboutSection() {
  const locale = useLocale();
  const t = useTranslations("about");

  return (
    <section
      className="py-14 md:py-22 relative overflow-hidden"
      aria-labelledby="about-title"
    >
      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-10 md:mb-16 text-left max-w-[36rem]">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] mb-4"
                 style={{ background: "oklch(1 0 0 / 0.60)", backdropFilter: "blur(12px)" }}>
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span className="font-mono text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--accent-primary)]">
                Our Story
              </span>
            </div>
            <h2
              id="about-title"
              className="font-heading font-semibold text-xl leading-[1.1] text-[var(--fg-primary)] tracking-[-0.01em] mb-2 md:mb-3 md:text-3xl lg:text-4xl"
            >
              {t("title")}
            </h2>
            <p className="font-body text-sm md:text-base leading-[1.5] text-[var(--fg-muted)]">
              {t("description")}
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative pl-8 md:pl-12">
          {/* Vertical line */}
          <div
            className="absolute left-[7px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-[var(--accent-primary)]/30 via-[var(--border-subtle)] to-transparent origin-top md:left-[11px]"
          />

          {/* Timeline items */}
          <div className="flex flex-col gap-6 md:gap-10">
            {TIMELINE_ITEMS.map((item, i) => (
              <ScrollReveal key={item.year} delay={i * 0.1} direction="left" distance={20}>
                <div className="relative">
                  {/* Dot */}
                  <div
                    className="absolute -left-8 top-1 w-3 h-3 md:absolute md:-left-12 md:w-3.5 md:h-3.5 rounded-full border-2 border-[var(--accent-primary)] bg-[var(--bg-base)] md:top-1.5"
                    style={{ boxShadow: "0 0 12px var(--accent-primary)" }}
                  />

                  {/* Content */}
                  <div className="flex flex-col gap-1 md:gap-1.5">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono font-bold text-lg md:text-2xl text-[var(--accent-primary)] leading-none tabular-nums">
                        {item.year}
                      </span>
                      <div className="h-[1px] flex-1 bg-[var(--border-subtle)]" />
                    </div>
                    <h3 className="font-heading font-semibold text-sm md:text-lg text-[var(--fg-primary)] tracking-[-0.01em]">
                      {t(item.titleKey)}
                    </h3>
                    <p className="font-body text-xs md:text-sm leading-[1.55] text-[var(--fg-secondary)] max-w-[32rem]">
                      {t(item.descriptionKey)}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.3}>
          <div className="mt-8 md:mt-12">
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center gap-2 font-body font-medium text-xs md:text-sm text-[var(--accent-primary)] transition-all duration-250 hover:gap-3 group"
            >
              {t("learnMore")}
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
