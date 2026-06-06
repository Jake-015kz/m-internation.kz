"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function HeroSectionC() {
  const t = useTranslations("hero");

  return (
    <section
      className="relative min-h-[100dvh] flex items-center pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Dark cinematic background */}
      <div className="absolute inset-0 bg-[var(--bg-base)]" />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.52 0.14 145 / 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 grid-pattern" />

      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 w-full relative z-10">
        {/* Centered layout */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block mb-8 font-mono font-semibold text-xs uppercase tracking-[0.2em] text-[var(--accent-primary)]">
              {t("label")}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            id="hero-title"
            className="font-heading font-bold tracking-[-0.04em] mb-6 text-[clamp(2.5rem,7vw,5rem)] leading-[1.05] text-[var(--fg-primary)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {t("title")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="font-body text-lg md:text-xl leading-[1.5] max-w-[32rem] mx-auto mb-10 text-[var(--fg-secondary)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {t("subtitle")}
          </motion.p>

          {/* CTA */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center bg-[var(--accent-primary)] text-white font-body font-medium text-base px-10 py-4 rounded-[var(--radius-sm)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[var(--shadow-md)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[var(--shadow-lg)] hover:scale-[1.02] active:scale-[0.98]"
            >
              {t("cta")}
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center border border-[var(--border)] text-[var(--fg-primary)] font-body font-medium text-base px-10 py-4 rounded-[var(--radius-sm)] transition-all duration-300 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
            >
              {t("aboutLink")}
            </Link>
          </motion.div>
        </div>

        {/* Product image - centered below text */}
        <motion.div
          className="mt-16 relative flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative">
            {/* Glow behind product */}
            <div
              className="absolute inset-0 -m-16 bg-[var(--accent-primary)] opacity-[0.08] rounded-full blur-3xl"
              aria-hidden="true"
            />

            {/* Glass card frame */}
            <div className="glass-card p-8 md:p-12">
              <Image
                src="/products/greenmax/main.png"
                alt="GreenMAX — flagship product of M-International"
                width={380}
                height={380}
                priority
                className="w-full max-w-[280px] md:max-w-[350px] h-auto object-contain"
              />
            </div>
          </div>
        </motion.div>

        {/* Bottom trust line */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex flex-wrap justify-center gap-6 items-center">
            <p className="font-mono text-xs text-[var(--fg-muted)] tracking-[0.05em]">
              Trusted by 10,000+ customers across 50 countries
            </p>
            <div className="hidden md:block w-px h-4 bg-[var(--border)]" />
            <div className="flex gap-3">
              {["GMP", "ISO", "HALAL", "EAC"].map((cert) => (
                <span
                  key={cert}
                  className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.1em] text-[var(--fg-dim)] px-2 py-1 border border-[var(--border-subtle)] rounded"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
