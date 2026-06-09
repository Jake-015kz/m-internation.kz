"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { CERTIFICATES } from "@/lib/constants";

function MarqueeRow({
  items,
  direction = "left",
  duration = 35,
}: {
  items: readonly (typeof CERTIFICATES)[number][];
  direction?: "left" | "right";
  duration?: number;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="marquee-fade overflow-hidden py-1">
      <div
        className={`marquee-track ${direction === "right" ? "marquee-track-reverse" : ""}`}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {doubled.map((cert, i) => (
          <div
            key={`${cert.id}-${i}`}
            className="flex-shrink-0 flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] transition-all duration-300 hover:border-[var(--accent-primary)]/20 hover:shadow-[var(--shadow-sm)] group"
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
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: cert.color }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CertificatesSection() {
  const t = useTranslations("certificates");
  const mid = Math.ceil(CERTIFICATES.length / 2);
  const row1 = CERTIFICATES.slice(0, mid);
  const row2 = CERTIFICATES.slice(mid);

  return (
    <section
      className="relative py-16 md:py-24 overflow-hidden"
      aria-labelledby="certificates-title"
    >
      {/* Gradient overlays for fade edges */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[var(--bg-base)] to-transparent z-[5] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[var(--bg-base)] to-transparent z-[5] pointer-events-none" />

      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-14">
          <h2
            id="certificates-title"
            className="font-heading font-semibold text-xl leading-[1.15] text-[var(--fg-primary)] tracking-normal mb-3 md:text-3xl lg:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="font-body text-sm md:text-base leading-[1.5] text-[var(--fg-muted)] max-w-[34rem] mx-auto">
            {t("description")}
          </p>
          <div className="mt-5 mx-auto h-[1px] w-16 rounded-full bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
        </div>

        {/* Marquee rows — CSS-only, GPU composited */}
        <div className="space-y-3 md:space-y-4">
          <MarqueeRow items={row1} direction="left" duration={35} />
          {row2.length > 0 && (
            <MarqueeRow items={row2} direction="right" duration={40} />
          )}
        </div>

        {/* Bottom trust line */}
        <div className="mt-10 md:mt-14 text-center">
          <p className="font-mono text-[10px] md:text-xs text-[var(--fg-muted)] uppercase tracking-[0.08em]">
            {t("certified")}
          </p>
        </div>
      </div>
    </section>
  );
}
