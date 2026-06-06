"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function HeroSectionA() {
  const t = useTranslations("hero");

  return (
    <section
      className="relative min-h-[100dvh] flex items-center pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-base)] via-[var(--bg-surface)] to-[var(--bg-elevated)]" />

      {/* Decorative orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[oklch(0.52_0.14_145/0.08)] blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-[oklch(0.62_0.12_85/0.06)] blur-3xl" />

      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2 lg:gap-16">
          {/* Left — Text */}
          <motion.div
            className="text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block mb-6 font-mono font-semibold text-xs uppercase tracking-[0.15em] text-[var(--accent-primary)]">
              {t("label")}
            </span>

            <h1
              id="hero-title"
              className="font-heading font-bold tracking-[-0.04em] mb-8 text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] text-[var(--fg-primary)]"
            >
              {t("title")}
            </h1>

            <p className="font-body text-lg leading-[1.5] max-w-[28rem] mb-8 text-[var(--fg-secondary)]">
              {t("subtitle")}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center bg-[var(--accent-primary)] text-white font-body font-medium text-base px-8 py-4 rounded-[var(--radius-sm)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[var(--shadow-md)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[var(--shadow-lg)] hover:scale-[1.02] active:scale-[0.98]"
              >
                {t("cta")}
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center border border-[var(--border)] text-[var(--fg-primary)] font-body font-medium text-base px-8 py-4 rounded-[var(--radius-sm)] transition-all duration-300 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
              >
                {t("aboutLink")}
              </Link>
            </div>
          </motion.div>

          {/* Right — Product with glass card */}
          <motion.div
            className="relative flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              {/* Glass card behind product */}
              <div className="absolute inset-0 -m-8 glass-card rounded-3xl" />

              <Image
                src="/products/greenmax/main.png"
                alt="GreenMAX — flagship product of M-International"
                width={420}
                height={420}
                priority
                className="w-full max-w-[380px] lg:max-w-[420px] h-auto object-contain relative z-10"
              />

              {/* Glow under product */}
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-[var(--accent-primary)] opacity-[0.15] blur-2xl rounded-full z-0"
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </div>

        {/* Trust badges */}
        <motion.div
          className="mt-16 pt-8 border-t border-[var(--border-subtle)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex flex-wrap gap-8 items-center">
            <p className="font-mono text-xs text-[var(--fg-muted)] tracking-[0.05em]">
              Trusted by 10,000+ customers across 50 countries
            </p>
            <div className="flex gap-4">
              {["GMP", "ISO", "HALAL"].map((cert) => (
                <span
                  key={cert}
                  className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.1em] text-[var(--fg-dim)] px-3 py-1 border border-[var(--border-subtle)] rounded-full"
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
