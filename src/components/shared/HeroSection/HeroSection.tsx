"use client";

import { useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { FloatingProduct } from "@shared/FloatingProduct";
import { AnimatedCounter } from "@shared/AnimatedCounter";

export function HeroSection() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  useGSAP(() => {
    if (mounted.current) return;
    mounted.current = true;

    const tl = gsap.timeline({
      defaults: { duration: 0.8, ease: "power2.out" },
    });

    tl.from(labelRef.current, { autoAlpha: 0, y: 20 })
      .from(titleRef.current, { autoAlpha: 0, y: 30 }, "-=0.4")
      .from(descriptionRef.current, { autoAlpha: 0, y: 20 }, "-=0.3")
      .from(actionsRef.current, { autoAlpha: 0, y: 20 }, "-=0.3")
      .from(productRef.current, { autoAlpha: 0, x: 50, duration: 1 }, "-=0.5")
      .from(
        ".gsap-badge",
        { autoAlpha: 0, scale: 0.8, stagger: 0.15, duration: 0.6 },
        "-=0.6",
      )
      .from(
        ".gsap-stat",
        { autoAlpha: 0, y: 20, stagger: 0.1, duration: 0.5 },
        "-=0.8",
      );

    return () => {
      tl.kill();
    };
  }, [mounted]);

  const stats = [
    { value: "13+", label: t("stats.products") },
    { value: "8+", label: t("stats.certificates") },
    { value: "50+", label: t("stats.countries") },
    { value: "10K+", label: t("stats.clients") },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 w-full relative z-2">
        <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2 lg:gap-16">
          {/* Left — Text */}
          <div className="text-left">
            <span
              ref={labelRef}
              className="inline-block mb-6 text-[var(--accent-primary)] text-sm font-body font-semibold uppercase tracking-[0.12em] py-2 px-4 rounded-full bg-[linear-gradient(135deg,oklch(0.82_0.22_135/0.12)_0%,oklch(0.82_0.22_135/0.06)_100%)] backdrop-blur-[12px] border border-[oklch(0.82_0.22_135/0.2)] shadow-[inset_0_1px_0_oklch(1_0_0/0.1),0_4px_16px_oklch(0_0_0/0.2)]"
            >
              {t("label")}
            </span>

            <h1
              ref={titleRef}
              id="hero-title"
              className="font-heading font-bold mb-6 tracking-[-0.03em] editorial-title gradient"
            >
              <span className="block">{t("title")}</span>
            </h1>

            <p
              ref={descriptionRef}
              className="font-body text-lg leading-[1.625] max-w-[32rem] mb-8 text-[var(--fg-secondary)]"
            >
              {t("subtitle")}
            </p>

            <div ref={actionsRef} className="flex flex-wrap gap-4">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center bg-[var(--accent-primary)] text-[var(--bg-base)] font-body font-semibold text-base px-8 py-4 rounded-[0.375rem] transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_0_20px_oklch(0.82_0.22_135/0.3),0_0_40px_oklch(0.82_0.22_135/0.15)] hover:bg-[var(--accent-primary-hover)] hover:scale-[1.02] hover:shadow-[0_0_24px_oklch(0.82_0.22_135/0.4)] active:scale-[0.98]"
              >
                {t("cta")}
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center bg-transparent border border-[var(--border)] text-[var(--fg-primary)] font-body font-medium text-base px-8 py-4 rounded-[0.375rem] transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[var(--accent-primary)] hover:bg-[oklch(0.82_0.22_135/0.08)]"
              >
                {t("aboutLink")}
              </Link>
            </div>
          </div>

          {/* Right — Product */}
          <div
            ref={productRef}
            className="relative flex justify-center items-center min-h-[400px] lg:min-h-[500px]"
          >
            <FloatingProduct duration={6} distance={20}>
              <div className="relative w-full max-w-[400px] lg:max-w-[450px]">
                <img
                  src="/products/greenmax/main.png"
                  alt="GreenMAX — Main product of M-International"
                  className="w-full h-auto object-contain relative z-2 drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
                  loading="eager"
                />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-[var(--accent-primary)] blur-[80px] opacity-15 z-1"
                  aria-hidden="true"
                />
              </div>
            </FloatingProduct>

            {/* Floating badges */}
            {["GMP", "HALAL", "ISO"].map((text, i) => (
              <div
                key={text}
                ref={(el) => {
                  badgeRefs.current[i] = el;
                }}
                className={`gsap-badge absolute py-2 px-4 rounded-full z-3 animate-[float-badge_4s_ease-in-out_infinite] bg-[linear-gradient(135deg,oklch(1_0_0/0.1)_0%,oklch(1_0_0/0.04)_100%)] backdrop-blur-[16px] border border-[oklch(1_0_0/0.12)] shadow-[inset_0_1px_0_oklch(1_0_0/0.15),0_8px_32px_oklch(0_0_0/0.25)] ${i === 0 ? "top-[10%] right-[10%] lg:right-0" : i === 1 ? "bottom-[20%] left-[5%] lg:left-0 [animation-delay:1s]" : "top-[40%] right-0 [animation-delay:2s]"}`}
                aria-label={`${text} Certified`}
              >
                <span className="font-mono font-semibold text-xs text-[var(--accent-primary)] tracking-[0.05em]">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 gap-6 mt-16 pt-10 border-t border-[var(--border-subtle)] md:grid-cols-4 md:gap-0"
          role="list"
          aria-label="Company statistics"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="gsap-stat relative p-4 text-center md:text-left md:px-6 md:py-4"
              role="listitem"
            >
              <AnimatedCounter
                target={stat.value}
                className="font-mono font-semibold text-2xl text-[var(--accent-primary)] leading-none mb-2 [text-shadow:0_0_16px_oklch(0.82_0.22_135/0.4)] md:text-3xl"
              />
              <div className="font-body text-sm leading-normal text-[var(--fg-muted)]">
                {stat.label}
              </div>
              {index < stats.length - 1 && (
                <div
                  className="hidden absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-[var(--border-subtle)] md:block"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Background gradient */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,oklch(0.82_0.22_135/0.05)_0%,transparent_50%)] z-1 pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
