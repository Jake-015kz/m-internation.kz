"use client";

import { useRef, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { TIMELINE_ITEMS } from "@/lib/constants";

export function AboutSection() {
  const locale = useLocale();
  const t = useTranslations("about");
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
      className="py-20 md:py-28 relative overflow-hidden"
      aria-labelledby="about-title"
    >
      <div className="mx-auto max-w-[80rem] px-3 md:px-6 lg:px-8">
        {/* Header */}
        <div
          className="mb-12 md:mb-20 text-left max-w-[36rem] transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <h2
            id="about-title"
            className="font-heading font-semibold text-xl leading-[1.1] text-[var(--fg-primary)] tracking-[-0.01em] mb-3 md:text-3xl lg:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="font-body text-sm md:text-base leading-[1.45] text-[var(--fg-muted)]">
            {t("description")}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pl-6 md:pl-12">
          {/* Vertical line */}
          <div
            className="absolute left-1.5 top-0 bottom-0 w-[1px] bg-[var(--border-subtle)] origin-top md:left-3 transition-transform duration-1000 ease-out"
            style={{
              transform: visible ? "scaleY(1)" : "scaleY(0)",
            }}
          />

          {/* Timeline items */}
          <div className="flex flex-col gap-8 md:gap-16">
            {TIMELINE_ITEMS.map((item, i) => (
              <div
                key={item.year}
                className="relative transition-all duration-500 ease-out"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-20px)",
                  transitionDelay: `${150 + i * 100}ms`,
                }}
              >
                {/* Dot */}
                <div className="absolute -left-6 top-1 w-2.5 h-2.5 bg-[var(--bg-base)] border-2 border-[var(--accent-primary)] rounded-full md:-left-12 md:w-3 md:h-3" />

                {/* Content */}
                <div className="flex flex-col gap-1.5 md:gap-2">
                  <span className="font-mono font-bold text-2xl md:text-4xl text-[var(--fg-primary)] leading-none select-none" style={{ opacity: 0.08 }}>
                    {item.year}
                  </span>
                  <h3 className="font-heading font-semibold text-base md:text-lg text-[var(--fg-primary)] tracking-[-0.01em]">
                    {t(item.titleKey)}
                  </h3>
                  <p className="font-body text-xs md:text-sm leading-[1.5] text-[var(--fg-secondary)] max-w-[32rem]">
                    {t(item.descriptionKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="mt-10 md:mt-16 transition-all duration-500 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "600ms",
          }}
        >
          <Link
            href={`/${locale}/about`}
            className="inline-flex items-center gap-2 font-body font-medium text-xs md:text-sm text-[var(--accent-primary)] transition-all duration-250 hover:gap-3"
          >
            {t("learnMore")}
            <span className="text-sm md:text-base">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
