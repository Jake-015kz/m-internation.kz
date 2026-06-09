"use client";

import { useRef, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { TIMELINE_ITEMS } from "@/lib/constants";

function useAboutAnimations(sectionRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null;
    let cancelled = false;

    import("gsap").then((gsapMod) => {
      const gsap = gsapMod.gsap;
      return import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        return import("gsap/CustomEase").then(({ CustomEase }) => {
          if (cancelled) return;
          gsap.registerPlugin(ScrollTrigger, CustomEase);

          const section = sectionRef.current;
          if (!section) return;

          ctx = gsap.context(() => {
            // Vertical line scale
            const line = section.querySelector("[data-timeline-line]") as HTMLElement;
            if (line) {
              gsap.fromTo(
                line,
                { scaleY: 0 },
                {
                  scaleY: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                    end: "bottom 60%",
                    scrub: 1,
                  },
                },
              );
            }

            // Header fade-in
            const header = section.querySelector("[data-anim-header]") as HTMLElement;
            if (header) {
              gsap.fromTo(header, { opacity: 0, y: 20 }, {
                opacity: 1, y: 0, duration: 0.6, ease: "power2.out" as unknown as gsap.EaseFunction,
                scrollTrigger: { trigger: header, start: "top 85%" },
              });
            }

            // Timeline items stagger
            const items = section.querySelectorAll("[data-anim-item]");
            items.forEach((item) => {
              gsap.fromTo(item, { opacity: 0, x: -20 }, {
                opacity: 1, x: 0, duration: 0.5, ease: "power2.out" as unknown as gsap.EaseFunction,
                scrollTrigger: { trigger: item, start: "top 90%" },
              });
            });

            // CTA
            const cta = section.querySelector("[data-anim-cta]") as HTMLElement;
            if (cta) {
              gsap.fromTo(cta, { opacity: 0, y: 16 }, {
                opacity: 1, y: 0, duration: 0.5, ease: "power2.out" as unknown as gsap.EaseFunction,
                scrollTrigger: { trigger: cta, start: "top 90%" },
              });
            }
          }, section);
        });
      });
    });

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
    };
  }, [sectionRef]);
}

export function AboutSection() {
  const locale = useLocale();
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLElement>(null);
  useAboutAnimations(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
      aria-labelledby="about-title"
    >
      <div className="mx-auto max-w-[80rem] px-3 md:px-6 lg:px-8">
        {/* Header */}
        <div data-anim-header className="mb-12 md:mb-20 text-left max-w-[36rem]" style={{ opacity: 1 }}>
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
            data-timeline-line
            className="absolute left-1.5 top-0 bottom-0 w-[1px] bg-[var(--border-subtle)] origin-top md:left-3"
          />

          {/* Timeline items */}
          <div className="flex flex-col gap-8 md:gap-16">
            {TIMELINE_ITEMS.map((item) => (
              <div
                key={item.year}
                data-anim-item
                className="relative"
                style={{ opacity: 1 }}
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
        <div data-anim-cta className="mt-10 md:mt-16" style={{ opacity: 1 }}>
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
