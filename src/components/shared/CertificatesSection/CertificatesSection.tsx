"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Award,
  Shield,
  CheckCircle,
  BadgeCheck,
  FileCheck,
  Globe,
} from "lucide-react";

const certificates = [
  { id: "gmp", name: "GMP", icon: Award },
  { id: "iso", name: "ISO", icon: Globe },
  { id: "halal", name: "HALAL", icon: CheckCircle },
  { id: "mesti", name: "MESTI", icon: FileCheck },
  { id: "fda", name: "FDA", icon: Shield },
  { id: "eac", name: "EAC", icon: BadgeCheck },
];

const marqueeItems = [...certificates, ...certificates];

export function CertificatesSection() {
  const t = useTranslations("certificates");

  return (
    <section
      className="py-24 relative overflow-hidden md:py-32"
      aria-labelledby="certificates-title"
    >
      {/* Background text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="font-mono font-bold text-[clamp(4rem,15vw,12rem)] text-[var(--fg-primary)] opacity-[0.03] tracking-[0.1em] whitespace-nowrap">
          CERTIFIED
        </span>
      </div>

      <div className="relative z-2 mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-12 text-center relative z-2 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="certificates-title"
            className="font-heading font-semibold text-3xl leading-[1.1] text-[var(--fg-primary)] tracking-[-0.02em] mb-6 md:text-4xl lg:text-5xl"
          >
            {t("title")}
          </h2>
          <p className="font-body text-lg leading-[1.625] text-[var(--fg-muted)] max-w-[40rem] mx-auto">
            {t("description")}
          </p>
        </motion.div>

        {/* Marquee row 1 — right */}
        <div className="overflow-hidden relative my-4 md:my-6">
          <div className="absolute inset-y-0 left-0 w-20 z-2 pointer-events-none bg-gradient-to-r from-[var(--bg-base)] to-transparent" />
          <div className="absolute inset-y-0 right-0 w-20 z-2 pointer-events-none bg-gradient-to-l from-[var(--bg-base)] to-transparent" />
          <div className="flex gap-4 w-fit hover:[animation-play-state:paused] animate-[marqueeRight_30s_linear_infinite]">
            {marqueeItems.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <div
                  key={`row1-${cert.id}-${index}`}
                  className="flex items-center gap-3 px-5 py-3 rounded-full whitespace-nowrap cursor-default transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[linear-gradient(135deg,oklch(1_0_0/0.06)_0%,oklch(1_0_0/0.02)_100%)] backdrop-blur-[12px] border border-[oklch(1_0_0/0.08)] shadow-[inset_0_1px_0_oklch(1_0_0/0.1),0_4px_16px_oklch(0_0_0/0.2)] hover:bg-[linear-gradient(135deg,oklch(0.82_0.22_135/0.1)_0%,oklch(1_0_0/0.04)_100%)] hover:border-[oklch(0.82_0.22_135/0.25)] hover:scale-[1.05] hover:shadow-[inset_0_1px_0_oklch(1_0_0/0.15),0_8px_24px_oklch(0_0_0/0.25),0_0_16px_oklch(0.82_0.22_135/0.1)]"
                >
                  <Icon
                    size={20}
                    className="text-[var(--accent-primary)] flex-shrink-0 [&:hover]:drop-shadow-[0_0_8px_oklch(0.82_0.22_135/0.5)]"
                  />
                  <span className="font-mono font-semibold text-sm text-[var(--fg-primary)] tracking-[0.05em]">
                    {cert.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Marquee row 2 — left */}
        <div className="overflow-hidden relative my-4 md:my-6">
          <div className="absolute inset-y-0 left-0 w-20 z-2 pointer-events-none bg-gradient-to-r from-[var(--bg-base)] to-transparent" />
          <div className="absolute inset-y-0 right-0 w-20 z-2 pointer-events-none bg-gradient-to-l from-[var(--bg-base)] to-transparent" />
          <div className="flex gap-4 w-fit hover:[animation-play-state:paused] animate-[marqueeLeft_30s_linear_infinite]">
            {[...marqueeItems].reverse().map((cert, index) => {
              const Icon = cert.icon;
              return (
                <div
                  key={`row2-${cert.id}-${index}`}
                  className="flex items-center gap-3 px-5 py-3 rounded-full whitespace-nowrap cursor-default transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[linear-gradient(135deg,oklch(1_0_0/0.06)_0%,oklch(1_0_0/0.02)_100%)] backdrop-blur-[12px] border border-[oklch(1_0_0/0.08)] shadow-[inset_0_1px_0_oklch(1_0_0/0.1),0_4px_16px_oklch(0_0_0/0.2)] hover:bg-[linear-gradient(135deg,oklch(0.82_0.22_135/0.1)_0%,oklch(1_0_0/0.04)_100%)] hover:border-[oklch(0.82_0.22_135/0.25)] hover:scale-[1.05] hover:shadow-[inset_0_1px_0_oklch(1_0_0/0.15),0_8px_24px_oklch(0_0_0/0.25),0_0_16px_oklch(0.82_0.22_135/0.1)]"
                >
                  <Icon
                    size={20}
                    className="text-[var(--accent-primary)] flex-shrink-0"
                  />
                  <span className="font-mono font-semibold text-sm text-[var(--fg-primary)] tracking-[0.05em]">
                    {cert.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
