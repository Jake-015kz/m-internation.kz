"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Shield, Award, Leaf, BadgeCheck } from "lucide-react";
import { CERTIFICATES } from "@/lib/constants";

const CERT_ICONS: Record<string, React.ReactNode> = {
  halal: <Shield className="w-5 h-5 md:w-6 md:h-6" />,
  "ajl-license": <Award className="w-5 h-5 md:w-6 md:h-6" />,
  mesti: <BadgeCheck className="w-5 h-5 md:w-6 md:h-6" />,
  fda: <Award className="w-5 h-5 md:w-6 md:h-6" />,
  natural: <Leaf className="w-5 h-5 md:w-6 md:h-6" />,
  eac: <BadgeCheck className="w-5 h-5 md:w-6 md:h-6" />,
  vegan: <Leaf className="w-5 h-5 md:w-6 md:h-6" />,
  gmp: <BadgeCheck className="w-5 h-5 md:w-6 md:h-6" />,
  iso: <Award className="w-5 h-5 md:w-6 md:h-6" />,
};

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
    <div className="overflow-hidden py-1">
      <div
        className={`flex gap-3 md:gap-4 w-max ${direction === "right" ? "marquee-track-reverse" : "marquee-track"}`}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {doubled.map((cert, i) => (
          <div
            key={`${cert.id}-${i}`}
            className="flex-shrink-0 flex items-center gap-2.5 md:gap-3 px-4 md:px-5 py-2.5 md:py-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] transition-all duration-300 hover:border-[var(--accent-primary)]/25 hover:shadow-[var(--shadow-sm)] group cursor-default"
          >
            <div className="relative w-7 h-7 md:w-8 md:h-8 flex-shrink-0" style={{ aspectRatio: "1 / 1" }}>
              <Image
                src={cert.image}
                alt={cert.name}
                width={36}
                height={36}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-heading font-semibold text-[10px] md:text-xs whitespace-nowrap text-[var(--fg-primary)]">
                {cert.name}
              </span>
              <span className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.06em] text-[var(--fg-muted)] hidden md:block">
                {cert.color}
              </span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity duration-300" style={{ background: cert.color }} />
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
      className="relative py-14 md:py-22 overflow-hidden"
      aria-labelledby="certificates-title"
    >
      {/* Subtle gradient overlays */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[var(--bg-base)] to-transparent z-[5] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[var(--bg-base)] to-transparent z-[5] pointer-events-none" />

      {/* Side fades for marquee */}
      <div className="absolute top-0 left-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-[var(--bg-base)] to-transparent z-[5] pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-[var(--bg-base)] to-transparent z-[5] pointer-events-none" />

      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] mb-4 md:mb-6">
            <Shield className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span className="font-mono text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--accent-primary)]">
              Certified Quality
            </span>
          </div>
          <h2
            id="certificates-title"
            className="font-heading font-semibold text-xl leading-[1.1] text-[var(--fg-primary)] tracking-normal mb-2 md:mb-3 md:text-3xl lg:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="font-body text-sm md:text-base leading-[1.5] text-[var(--fg-muted)] max-w-[34rem] mx-auto">
            {t("description")}
          </p>
          <div className="mt-4 mx-auto h-[2px] w-12 rounded-full bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-40" />
        </div>

        {/* Marquee rows */}
        <div className="space-y-3 md:space-y-4">
          <MarqueeRow items={row1} direction="left" duration={35} />
          {row2.length > 0 && (
            <MarqueeRow items={row2} direction="right" duration={40} />
          )}
        </div>

        {/* Bottom trust line */}
        <div className="mt-8 md:mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-[var(--fg-muted)]">
            <BadgeCheck className="w-3.5 h-3.5" />
            <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.08em]">
              {t("certified")}
            </p>
            <BadgeCheck className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </section>
  );
}
