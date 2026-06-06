"use client";

import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BUSINESS_STEPS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export function BusinessSection() {
  const locale = useLocale();
  const t = useTranslations("business");
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Sticky-stack animation for cards
  useEffect(() => {
    if (reduce || !sectionRef.current) return;

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
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-[var(--bg-elevated)]"
      aria-labelledby="business-title"
    >
      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-20 text-left max-w-[36rem]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="business-title"
            className="font-heading font-semibold text-2xl leading-[1.1] text-[var(--fg-primary)] tracking-[-0.02em] mb-5 md:text-3xl lg:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="font-body text-base leading-[1.45] text-[var(--fg-muted)]">
            {t("description")}
          </p>
        </motion.div>

        {/* Sticky-stack cards */}
        <div className="relative">
          {BUSINESS_STEPS.map((step) => (
            <div key={step.id} className="stack-card sticky top-24 mb-6">
              <div
                className={`card-clean p-8 md:p-10 rounded-[var(--radius-xl)] ${
                  step.featured
                    ? "bg-[var(--accent-primary)] text-white"
                    : "bg-[var(--bg-surface)]"
                }`}
              >
                <div className="flex flex-col gap-4 max-w-[480px]">
                  <h3
                    className={`font-heading font-semibold text-xl tracking-[-0.01em] ${
                      step.featured ? "text-white" : "text-[var(--fg-primary)]"
                    }`}
                  >
                    {t(step.titleKey)}
                  </h3>
                  <p
                    className={`font-body text-sm leading-[1.625] ${
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
        <motion.div
          className="mt-16 flex justify-start"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href={`/${locale}/business`}
            className="inline-flex items-center gap-2 bg-[var(--accent-primary)] text-white font-body font-medium text-sm px-6 py-3 rounded-[var(--radius-sm)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[var(--shadow-md)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[var(--shadow-lg)] hover:scale-[1.02] active:scale-[0.98]"
          >
            {t("cta")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
