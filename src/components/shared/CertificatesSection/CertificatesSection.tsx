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
    <div className="overflow-hidden marquee-container">
      <div ref={rowRef} className="flex items-center gap-4 md:gap-6 will-change-transform">
        {doubled.map((cert, i) => (
          <div
            key={`${cert.id}-${i}`}
            className="flex-shrink-0 flex items-center gap-2 md:gap-3 px-3 md:px-5 py-2 md:py-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
          >
            <div className="relative w-6 h-6 md:w-8 md:h-8 flex-shrink-0">
              <Image
                src={cert.image}
                alt={cert.name}
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-heading font-semibold text-[10px] md:text-xs whitespace-nowrap text-[var(--fg-primary)]">
              {cert.name}
            </span>
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
  const bgTextRef = useRef<HTMLDivElement>(null);

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

      // Background text parallax
      if (bgTextRef.current && sectionRef.current) {
        gsap.fromTo(bgTextRef.current, { opacity: 0 }, {
          opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
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
      className="relative py-12 md:py-20 overflow-hidden"
      aria-labelledby="certificates-title"
    >
      {/* Large background text */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-0"
        aria-hidden="true"
      >
        <span
          className="font-heading font-bold text-[clamp(3rem,12vw,10rem)] leading-none tracking-[-0.04em] text-[var(--fg-primary)]/[0.03] whitespace-nowrap"
          style={{ WebkitTextStroke: "1px var(--border-subtle)" }}
        >
          {t("title").toUpperCase()}
        </span>
      </div>

      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-8 md:mb-12" style={{ opacity: 1 }}>
          <h2
            id="certificates-title"
            className="font-heading font-semibold text-2xl leading-[1.15] text-[var(--fg-primary)] tracking-[-0.02em] mb-3 md:text-3xl lg:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="font-body text-sm md:text-base leading-[1.5] text-[var(--fg-muted)] max-w-[32rem] mx-auto">
            {t("description")}
          </p>
          <div className="mt-4 mx-auto h-[2px] w-16 rounded-full bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-primary)]" />
        </div>

        {/* Marquee rows */}
        <div className="space-y-3 md:space-y-4">
          <MarqueeRow items={row1} direction="left" speed={35} />
          {row2.length > 0 && (
            <MarqueeRow items={row2} direction="right" speed={40} />
          )}
        </div>

        {/* Bottom trust line */}
        <div className="mt-8 md:mt-12 text-center">
          <p className="font-mono text-[10px] md:text-xs text-[var(--fg-dim)] uppercase tracking-[0.15em]">
            {t("certified")}
          </p>
        </div>
      </div>
    </section>
  );
}
