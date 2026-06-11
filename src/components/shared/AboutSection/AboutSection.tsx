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
          <div className="mb-10 md:mb-16 text-center max-w-[36rem] mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-subtle)] mb-4"
                 style={{ background: "oklch(1 0 0 / 0.60)", backdropFilter: "blur(12px)" }}>
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span className="font-mono text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--accent-primary)]">
                Our Journey
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
            <div className="mt-4 mx-auto h-[2px] w-12 rounded-full bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-40" />
          </div>
        </ScrollReveal>

        {/* Timeline — centered vertical line, alternating sides */}
        <div className="relative max-w-[48rem] mx-auto">
          {/* Vertical center line */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--accent-primary)]/30 to-transparent md:-translate-x-[0.5px]"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-8 md:gap-12">
            {TIMELINE_ITEMS.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <ScrollReveal key={item.year} delay={i * 0.08}>
                  <div className="relative flex items-start">
                    {/* Dot on center line */}
                    <div
                      className="absolute left-4 md:left-1/2 top-1.5 w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border-2 border-[var(--accent-primary)] bg-[var(--bg-base)] -translate-x-1/2 z-10"
                      style={{ boxShadow: "0 0 12px var(--accent-primary)" }}
                      aria-hidden="true"
                    />

                    {/* Content card — alternating sides */}
                    <div
                      className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${
                        isLeft
                          ? "md:mr-auto md:pr-8 md:text-right"
                          : "md:ml-auto md:pl-8 md:text-left"
                      }`}
                    >
                      <div
                        className="relative rounded-2xl px-5 py-4 border transition-all duration-300 hover:border-[var(--accent-primary)]/25 hover:shadow-[var(--shadow-sm)] group"
                        style={{
                          background: "oklch(1 0 0 / 0.60)",
                          backdropFilter: "blur(16px)",
                          WebkitBackdropFilter: "blur(16px)",
                          borderColor: "var(--border-subtle)",
                        }}
                      >
                        {/* Top accent line on hover */}
                        <div
                          className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: "linear-gradient(90deg, transparent, var(--accent-gold), transparent)" }}
                          aria-hidden="true"
                        />

                        <span className="font-mono font-bold text-base md:text-xl text-[var(--accent-primary)] leading-none tabular-nums block mb-1.5">
                          {item.year}
                        </span>
                        <h3 className="font-heading font-semibold text-sm md:text-base text-[var(--fg-primary)] tracking-[-0.01em] mb-1">
                          {t(item.titleKey)}
                        </h3>
                        <p className="font-body text-xs md:text-sm leading-[1.55] text-[var(--fg-secondary)]">
                          {t(item.descriptionKey)}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.3}>
          <div className="mt-10 md:mt-14 text-center">
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
