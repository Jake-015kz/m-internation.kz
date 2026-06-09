"use client";

import { useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, EASING } from "@/lib/gsap-animations";
import { BUSINESS_STEPS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export function BusinessSection() {
  const locale = useLocale();
  const t = useTranslations("business");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduce = prefersReducedMotion();

    if (!reduce && headerRef.current) {
      gsap.fromTo(headerRef.current, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6,
        ease: EASING.gentle as unknown as gsap.EaseFunction,
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
      });
    }

    if (!reduce && ctaRef.current) {
      gsap.fromTo(ctaRef.current, { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 0.5,
        ease: EASING.gentle as unknown as gsap.EaseFunction,
        scrollTrigger: { trigger: ctaRef.current, start: "top 90%" },
      });
    }

    // Mobile: stagger cards in
    if (!reduce) {
      const ctx = gsap.context(() => {
        cardRefs.current.forEach((card) => {
          if (!card) return;
          gsap.fromTo(card, { opacity: 0, y: 24 }, {
            opacity: 1, y: 0, duration: 0.5,
            ease: EASING.gentle as unknown as gsap.EaseFunction,
            scrollTrigger: { trigger: card, start: "top 90%" },
          });
        });
      }, sectionRef);
      return () => ctx.revert();
    }

    if (reduce || !sectionRef.current) return;
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;

    // Desktop: sticky stack
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      if (cards.length < 2) return;

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: cards[cards.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
        });

        gsap.to(card, {
          scale: 0.95,
          opacity: 0.6,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-[var(--bg-elevated)]"
      aria-labelledby="business-title"
    >
      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-10 md:mb-16 text-left max-w-[36rem]" style={{ opacity: 1 }}>
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

        {/* Cards — mobile: vertical stack with stagger, desktop: sticky stack */}
        <div className="relative flex flex-col gap-4 md:gap-6 lg:block">
          {BUSINESS_STEPS.map((step, i) => (
            <div
              key={step.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className={`stack-card lg:sticky lg:top-24 ${i > 0 ? "lg:mb-6" : ""}`}
              style={{ opacity: 1 }}
            >
              <div
                className={`rounded-[var(--radius-xl)] p-5 md:p-8 transition-all duration-300 ${
                  step.featured
                    ? "bg-[var(--accent-primary)] text-white shadow-[var(--shadow-glow)]"
                    : "card-clean"
                }`}
              >
                <div className="flex flex-col gap-2 md:gap-3 max-w-[480px]">
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-[10px] md:text-xs font-semibold ${step.featured ? "text-white/60" : "text-[var(--fg-muted)]"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className={`h-[1px] flex-1 ${step.featured ? "bg-white/20" : "bg-[var(--border-subtle)]"}`} />
                  </div>
                  <h3
                    className={`font-heading font-semibold text-base md:text-xl tracking-[-0.01em] ${
                      step.featured ? "text-white" : "text-[var(--fg-primary)]"
                    }`}
                  >
                    {t(step.titleKey)}
                  </h3>
                  <p
                    className={`font-body text-xs md:text-sm leading-[1.5] md:leading-[1.6] ${
                      step.featured ? "text-white/80" : "text-[var(--fg-muted)]"
                    }`}
                  >
                    {t(step.descriptionKey)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-8 md:mt-12 flex justify-start" style={{ opacity: 1 }}>
          <Link
            href={`/${locale}/business`}
            className="inline-flex items-center gap-2 bg-[var(--accent-primary)] text-white font-body font-semibold text-sm px-6 py-3 rounded-[var(--radius-sm)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[var(--shadow-md)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] active:scale-[0.98]"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
