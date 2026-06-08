"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, EASING } from "@/lib/gsap-animations";
import { CERTIFICATES } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export function CertificatesSection() {
  const t = useTranslations("certificates");
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = prefersReducedMotion();
    if (reduce) return;

    const ctx = gsap.context(() => {
      // Header fade-in
      if (headerRef.current) {
        gsap.fromTo(headerRef.current, { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.6, ease: EASING.gentle as any,
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        });
      }

      // Cards stagger
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(cards, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: EASING.gentle as any,
          scrollTrigger: { trigger: cardsRef.current, start: "top 90%" },
        });
      }

      // Trust line fade
      if (trustRef.current) {
        gsap.fromTo(trustRef.current, { opacity: 0 }, {
          opacity: 1, duration: 0.5, delay: 0.3,
          scrollTrigger: { trigger: trustRef.current, start: "top 90%" },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative py-16 md:py-24 overflow-hidden"
      aria-labelledby="certificates-title"
    >
      {/* Subtle background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[oklch(0.52_0.14_145/0.04)] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16" style={{ opacity: 1 }}>
          <h2
            id="certificates-title"
            className="font-heading font-semibold text-2xl leading-[1.15] text-[var(--fg-primary)] tracking-[-0.02em] mb-4 md:text-3xl lg:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="font-body text-sm md:text-base leading-[1.5] text-[var(--fg-muted)] max-w-[32rem] mx-auto">
            {t("description")}
          </p>
          {/* Gold accent line */}
          <div className="mt-6 mx-auto h-[2px] w-16 rounded-full bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-primary)]" />
        </div>

        {/* Certificates Grid */}
        <div ref={cardsRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
          {CERTIFICATES.map((cert) => (
            <div
              key={cert.id}
              className="group relative flex flex-col items-center text-center p-4 md:p-6 rounded-[var(--radius-lg)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border)] transition-all duration-300 cursor-default h-full"
              style={{
                // @ts-expect-error CSS custom property
                "--cert-color": cert.color,
                opacity: 1,
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-[var(--radius-lg)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${cert.color}08 0%, transparent 70%)`,
                }}
                aria-hidden="true"
              />

              {/* Certificate icon */}
              <div className="relative w-16 h-16 md:w-20 md:h-20 mb-3 md:mb-4 flex-shrink-0">
                <Image
                  src={cert.image}
                  alt={cert.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Name */}
              <span
                className="font-heading font-semibold text-sm md:text-base leading-[1.2] tracking-[-0.01em] mb-1"
                style={{ color: "var(--fg-primary)" }}
              >
                {cert.name}
              </span>

              {/* Description */}
              <span className="font-body text-[11px] md:text-xs leading-[1.4] text-[var(--fg-muted)]">
                {t(cert.descriptionKey)}
              </span>

              {/* Bottom accent line on hover */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-1/2 rounded-full transition-all duration-300"
                style={{ backgroundColor: cert.color }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        {/* Bottom trust line */}
        <div ref={trustRef} className="mt-10 md:mt-14 text-center opacity-1">
          <p className="font-mono text-[10px] md:text-xs text-[var(--fg-dim)] uppercase tracking-[0.15em]">
            {t("certified")}
          </p>
        </div>
      </div>
    </section>
  );
}
