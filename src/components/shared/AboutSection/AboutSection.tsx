"use client";

import { useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, EASING } from "@/lib/gsap-animations";
import { TIMELINE_ITEMS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const locale = useLocale();
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduce = prefersReducedMotion();
    if (reduce || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header fade-in
      if (headerRef.current) {
        gsap.fromTo(headerRef.current, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.6, ease: EASING.gentle as any,
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        });
      }

      // Timeline line draw
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 60%",
              scrub: 1,
            },
          },
        );
      }

      // Timeline items stagger
      itemRefs.current.forEach((item) => {
        if (!item) return;
        gsap.fromTo(item, { opacity: 0, x: -20 }, {
          opacity: 1, x: 0, duration: 0.5, ease: EASING.gentle as any,
          scrollTrigger: { trigger: item, start: "top 90%" },
        });
      });

      // CTA fade-in
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current, { opacity: 0, y: 16 }, {
          opacity: 1, y: 0, duration: 0.5, ease: EASING.gentle as any,
          scrollTrigger: { trigger: ctaRef.current, start: "top 90%" },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
      aria-labelledby="about-title"
    >
      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8">
        {/* Header — left-aligned */}
        <div ref={headerRef} className="mb-20 text-left max-w-[36rem]" style={{ opacity: 1 }}>
          <h2
            id="about-title"
            className="font-heading font-semibold text-2xl leading-[1.1] text-[var(--fg-primary)] tracking-[-0.02em] mb-5 md:text-3xl lg:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="font-body text-base leading-[1.45] text-[var(--fg-muted)]">
            {t("description")}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pl-8 md:pl-12 deco-frame">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-2 top-0 bottom-0 w-[1px] bg-[var(--border-subtle)] origin-top md:left-3"
          />

          {/* Timeline items */}
          <div className="flex flex-col gap-12 md:gap-16">
            {TIMELINE_ITEMS.map((item, index) => (
              <div
                key={item.year}
                ref={(el) => { itemRefs.current[index] = el; }}
                className="relative"
                style={{ opacity: 1 }}
              >
                {/* Dot */}
                <div className="absolute -left-8 top-1 w-3 h-3 bg-[var(--bg-base)] border-2 border-[var(--accent-primary)] rounded-full md:-left-12" />

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <span className="font-mono font-bold text-3xl text-[var(--fg-primary)] opacity-[0.12] leading-none md:text-4xl">
                    {item.year}
                  </span>
                  <h3 className="font-heading font-semibold text-lg text-[var(--fg-primary)] tracking-[-0.01em]">
                    {t(item.titleKey)}
                  </h3>
                  <p className="font-body text-sm leading-[1.45] text-[var(--fg-muted)] max-w-[32rem]">
                    {t(item.descriptionKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-16" style={{ opacity: 1 }}>
          <Link
            href={`/${locale}/about`}
            className="inline-flex items-center gap-2 font-body font-medium text-sm text-[var(--accent-primary)] transition-all duration-250 hover:gap-3"
          >
            {t("learnMore")}
            <span className="text-base">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
