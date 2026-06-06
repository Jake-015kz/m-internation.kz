"use client";

import { useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { CERTIFICATES } from "@/lib/constants";

export function CertificatesSection() {
  const t = useTranslations("certificates");
  const [paused, setPaused] = useState(false);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  // Duplicate items for seamless loop
  const row1 = [...CERTIFICATES, ...CERTIFICATES];
  const row2 = [
    ...CERTIFICATES.slice(4),
    ...CERTIFICATES.slice(0, 4),
    ...CERTIFICATES.slice(4),
    ...CERTIFICATES.slice(0, 4),
  ];

  const togglePause = useCallback(() => {
    setPaused((p) => !p);
    [row1Ref, row2Ref].forEach((ref) => {
      if (ref.current) {
        ref.current.style.animationPlayState = paused ? "running" : "paused";
      }
    });
  }, [paused]);

  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      aria-labelledby="certificates-title"
    >
      {/* Header — title + subtitle side by side */}
      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 mb-12 md:mb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-8">
          {/* Title */}
          <h2
            id="certificates-title"
            className="font-heading font-semibold text-2xl leading-[1.1] text-[var(--fg-primary)] tracking-[-0.02em] md:text-3xl lg:text-4xl"
          >
            {t("title")}
          </h2>
          {/* Subtitle — right aligned on desktop, below on mobile */}
          <p className="font-body text-sm md:text-base leading-[1.45] text-[var(--fg-muted)] max-w-[28rem] md:text-right">
            {t("description")}
          </p>
        </div>
        {/* Decorative accent line */}
        <div className="mt-8 h-[2px] w-16 bg-[var(--accent-primary)] rounded-full" />
      </div>

      {/* Marquee Row 1 — left to right */}
      <div className="marquee-container mb-4">
        <div ref={row1Ref} className="marquee-track">
          {row1.map((cert, i) => (
            <div
              key={`r1-${cert.id}-${i}`}
              className="marquee-item mx-2 md:mx-3"
            >
              <div
                className="flex items-center gap-3 px-5 py-3 md:px-6 md:py-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] hover:border-[var(--border)] transition-colors duration-300 group cursor-pointer"
                onClick={togglePause}
              >
                {/* Icon badge */}
                <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-[oklch(0.52_0.14_145/0.1)] rounded-[var(--radius-sm)] flex-shrink-0 group-hover:bg-[oklch(0.52_0.14_145_/_0.18)] transition-colors duration-300">
                  <span className="font-mono font-bold text-xs text-[var(--accent-primary)]">
                    {cert.name.slice(0, 2)}
                  </span>
                </div>
                {/* Text */}
                <div className="min-w-0">
                  <span className="font-heading font-semibold text-sm md:text-base text-[var(--fg-primary)] tracking-[-0.01em] block">
                    {cert.name}
                  </span>
                  <span className="font-body text-xs text-[var(--fg-muted)] hidden md:block leading-tight">
                    {cert.description}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 — right to left (reverse) */}
      <div className="marquee-container">
        <div ref={row2Ref} className="marquee-track marquee-track-reverse">
          {row2.map((cert, i) => (
            <div
              key={`r2-${cert.id}-${i}`}
              className="marquee-item mx-2 md:mx-3"
            >
              <div
                className="flex items-center gap-3 px-5 py-3 md:px-6 md:py-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] hover:border-[var(--border)] transition-colors duration-300 group cursor-pointer"
                onClick={togglePause}
              >
                <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-[oklch(0.52_0.14_145/0.1)] rounded-[var(--radius-sm)] flex-shrink-0 group-hover:bg-[oklch(0.52_0.14_145_/_0.18)] transition-colors duration-300">
                  <span className="font-mono font-bold text-xs text-[var(--accent-primary)]">
                    {cert.name.slice(0, 2)}
                  </span>
                </div>
                <div className="min-w-0">
                  <span className="font-heading font-semibold text-sm md:text-base text-[var(--fg-primary)] tracking-[-0.01em] block">
                    {cert.name}
                  </span>
                  <span className="font-body text-xs text-[var(--fg-muted)] hidden md:block leading-tight">
                    {cert.description}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom label */}
      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 mt-8 md:mt-10">
        <p className="font-mono text-xs text-[var(--fg-dim)] uppercase tracking-[0.15em] text-center">
          {t("certified")}
        </p>
      </div>
    </section>
  );
}
