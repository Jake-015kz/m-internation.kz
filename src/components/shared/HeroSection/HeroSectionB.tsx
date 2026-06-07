"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function HeroSectionB() {
  const locale = useLocale();
  const t = useTranslations("hero");

  return (
    <section
      className="relative min-h-[100dvh] flex items-center pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Split background */}
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-[var(--bg-base)]" />
        <div className="bg-[var(--bg-elevated)] hidden lg:block" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2 lg:gap-16">
          {/* Left — Text with large typography */}
          <motion.div
            className="text-left py-12 lg:py-0"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--bg-surface)]">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
              <span className="font-mono text-xs text-[var(--fg-muted)] tracking-wide">
                {t("label")}
              </span>
            </div>

            <h1
              id="hero-title"
              className="font-heading font-bold tracking-[-0.04em] mb-6 text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-[var(--fg-primary)]"
            >
              {t("title")}
            </h1>

            <p className="font-body text-lg leading-[1.5] max-w-[32rem] mb-8 text-[var(--fg-secondary)]">
              {t("subtitle")}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/catalog`}
                className="inline-flex items-center justify-center bg-[var(--accent-primary)] text-white font-body font-medium text-base px-8 py-4 rounded-[var(--radius-sm)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[var(--shadow-md)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[var(--shadow-lg)] hover:scale-[1.02] active:scale-[0.98]"
              >
                {t("cta")}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center justify-center border border-[var(--border)] text-[var(--fg-primary)] font-body font-medium text-base px-8 py-4 rounded-[var(--radius-sm)] transition-all duration-300 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
              >
                {t("aboutLink")}
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-12 flex gap-8">
              {[
                { value: "10K+", label: t("stats.clients") },
                { value: "50+", label: t("stats.countries") },
                { value: "8", label: t("stats.certificates") },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-heading font-bold text-2xl text-[var(--accent-primary)]">
                    {stat.value}
                  </div>
                  <div className="font-body text-xs text-[var(--fg-muted)] mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Product showcase */}
          <motion.div
            className="relative flex justify-center items-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute inset-0 -m-12 rounded-full border border-dashed border-[var(--border)] opacity-30" />
              <div className="absolute inset-0 -m-24 rounded-full border border-dashed border-[var(--border)] opacity-20" />

              {/* Product image */}
              <Image
                src="/products/greenmax/main.png"
                alt="GreenMAX — flagship product of M-International"
                width={420}
                height={420}
                priority
                className="w-full max-w-[350px] lg:max-w-[400px] h-auto object-contain relative z-10 drop-shadow-2xl"
              />

              {/* Floating badges */}
              <motion.div
                className="absolute top-8 -left-4 glass-card px-4 py-2 z-20"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="font-mono text-xs font-semibold text-[var(--accent-primary)]">
                  100% Natural
                </span>
              </motion.div>

              <motion.div
                className="absolute bottom-8 -right-4 glass-card px-4 py-2 z-20"
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="font-mono text-xs font-semibold text-[var(--accent-primary)]">
                  GMP Certified
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
