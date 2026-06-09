"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, EASING } from "@/lib/gsap-animations";
import { CERTIFICATES } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

function MarqueeRow({
  items,
  direction = "left",
  speed = 30,
}: {
  items: readonly { readonly id: string; readonly name: string; readonly descriptionKey: string; readonly image: string; readonly color: string }[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !rowRef.current) return;

    const el = rowRef.current;
    const width = el.scrollWidth / 2;

    const anim = gsap.to(el, {
      x: direction === "left" ? -width : width,
      duration: speed,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((val) => parseFloat(val) % width),
      },
    });

    return () => { anim.kill(); };
  }, [direction, speed]);

  // Duplicate items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden py-1">
      <div ref={rowRef} className="flex items-center gap-4 md:gap-6 will-change-transform">
        {doubled.map((cert, i) => (
          <div
            key={`${cert.id}-${i}`}
            className="flex-shrink-0 flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4 rounded-full border border-[var(--border-subtle)] bg-[var(--glass-bg)] backdrop-blur-sm transition-all duration-300 hover:border-[var(--accent-primary)]/30 hover:shadow-[0_0_20px_oklch(0.78_0.22_135_/_0.08)] group"
          >
            <div className="relative w-7 h-7 md:w-9 md:h-9 flex-shrink-0" style={{ aspectRatio: "1 / 1" }}>
              <Image
                src={cert.image}
                alt={cert.name}
                width={36}
                height={36}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="font-heading font-semibold text-[10px] md:text-xs whitespace-nowrap text-[var(--fg-primary)]">
              {cert.name}
            </span>
            {/* Dot glow */}
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: cert.color, boxShadow: `0 0 8px ${cert.color}` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CertificatesSection() {
  const t = useTranslations("certificates");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduce = prefersReducedMotion();
    if (reduce) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(headerRef.current, { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.6,
          ease: EASING.gentle as unknown as gsap.EaseFunction,
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        });
      }

      // Subtle parallax on background text
      if (bgTextRef.current && sectionRef.current) {
        gsap.to(bgTextRef.current, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // Split certificates into two rows
  const mid = Math.ceil(CERTIFICATES.length / 2);
  const row1: readonly (typeof CERTIFICATES)[number][] = CERTIFICATES.slice(0, mid);
  const row2: readonly (typeof CERTIFICATES)[number][] = CERTIFICATES.slice(mid);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-28 overflow-hidden"
      aria-labelledby="certificates-title"
    >
      {/* Large background text — "CERTIFICATES" */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          ref={bgTextRef}
          className="font-heading font-bold text-[clamp(3.5rem,14vw,11rem)] leading-none tracking-[-0.04em] text-[var(--fg-primary)]/[0.035] whitespace-nowrap"
        >
          {t("title").toUpperCase()}
        </span>
      </div>

      {/* Gradient overlays for fade edges */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[var(--bg-base)] to-transparent z-[5] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--bg-base)] to-transparent z-[5] pointer-events-none" />

      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-8 md:mb-14">
          <h2
            id="certificates-title"
            className="font-heading font-semibold text-2xl leading-[1.15] text-[var(--fg-primary)] tracking-normal mb-3 md:text-3xl lg:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="font-body text-sm md:text-base leading-[1.5] text-[var(--fg-muted)] max-w-[34rem] mx-auto">
            {t("description")}
          </p>
          <div className="mt-5 mx-auto h-[2px] w-20 rounded-full bg-gradient-to-r from-[var(--accent-gold)] via-[var(--accent-primary)] to-[var(--accent-gold)]" />
        </div>

        {/* Marquee rows — fixed min-height prevents CLS */}
        <div className="space-y-3 md:space-y-5" style={{ minHeight: "clamp(120px, 20vw, 200px)" }}>
          <MarqueeRow items={row1} direction="left" speed={35} />
          {row2.length > 0 && (
            <MarqueeRow items={row2} direction="right" speed={40} />
          )}
        </div>

        {/* Bottom trust line */}
        <div className="mt-10 md:mt-14 text-center">
          <p className="font-mono text-[10px] md:text-xs text-[var(--fg-dim)] uppercase tracking-[0.15em]">
            {t("certified")}
          </p>
        </div>
      </div>
    </section>
  );
}
