"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, UserPlus, GraduationCap, DollarSign } from "lucide-react";

const steps = [
  {
    id: "register",
    number: "01",
    titleKey: "steps.register.title",
    descriptionKey: "steps.register.description",
    icon: UserPlus,
    gradient:
      "linear-gradient(135deg, rgba(180, 230, 50, 0.15) 0%, transparent 100%)",
  },
  {
    id: "training",
    number: "02",
    titleKey: "steps.training.title",
    descriptionKey: "steps.training.description",
    icon: GraduationCap,
    gradient:
      "linear-gradient(135deg, rgba(100, 150, 255, 0.15) 0%, transparent 100%)",
  },
  {
    id: "income",
    number: "03",
    titleKey: "steps.income.title",
    descriptionKey: "steps.income.description",
    icon: DollarSign,
    gradient:
      "linear-gradient(135deg, rgba(200, 100, 180, 0.15) 0%, transparent 100%)",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function BusinessSection() {
  const locale = useLocale();
  const t = useTranslations("business");

  return (
    <section className="py-24 md:py-32" aria-labelledby="business-title">
      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="business-title"
            className="font-heading font-semibold text-3xl leading-[1.1] text-[var(--fg-primary)] tracking-[-0.02em] mb-4 md:text-4xl lg:text-5xl"
          >
            {t("title")}
          </h2>
          <p className="font-body text-lg leading-[1.625] text-[var(--fg-muted)] max-w-[40rem] mx-auto">
            {t("description")}
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 gap-6 mb-16 md:grid-cols-3 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.id}
                className="relative rounded-2xl p-8 overflow-hidden cursor-default bg-[linear-gradient(135deg,oklch(1_0_0/0.08)_0%,oklch(1_0_0/0.02)_100%)] border border-[oklch(1_0_0/0.1)] shadow-[inset_0_1px_0_oklch(1_0_0/0.15),inset_0_-1px_0_oklch(0_0_0/0.05),0_8px_32px_oklch(0_0_0/0.3)] transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:scale-[1.02] hover:border-[oklch(0.82_0.22_135/0.25)] hover:bg-[linear-gradient(135deg,oklch(0.82_0.22_135/0.08)_0%,oklch(1_0_0/0.04)_100%)] hover:shadow-[inset_0_1px_0_oklch(1_0_0/0.2),inset_0_-1px_0_oklch(0_0_0/0.08),0_20px_60px_oklch(0_0_0/0.4),0_0_30px_oklch(0.82_0.22_135/0.1)] [&:hover_.card-glow]:opacity-100 [&:hover_.card-glow]:scale-[1.1] [&:hover_.card-icon]:scale-[1.15] [&:hover_.card-icon]:rotate-[-5deg] [&:hover_.card-icon]:bg-[oklch(0.82_0.22_135/0.15)] [&:hover_.card-icon]:shadow-[0_0_20px_oklch(0.82_0.22_135/0.2)] [&:hover_.card-number]:opacity-[0.08] [&:hover_.card-number]:scale-[1.1] [&:hover_.card-line]:opacity-60 [&:hover_.card-line]:w-full"
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                {/* Glow */}
                <div
                  className="card-glow absolute inset-0 opacity-0 transition-all duration-400 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,oklch(0.82_0.22_135/0.1)_0%,transparent_70%)]"
                  style={{ background: step.gradient }}
                />

                {/* Number */}
                <span className="card-number absolute top-4 right-4 font-mono text-4xl font-bold text-[var(--fg-primary)] opacity-[0.05] leading-none pointer-events-none transition-all duration-250 md:text-5xl">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="card-icon w-16 h-16 flex items-center justify-center bg-[oklch(0.82_0.22_135/0.1)] rounded-lg mb-6 text-[var(--accent-primary)] transition-all duration-250 border border-[oklch(0.82_0.22_135/0.15)]">
                  <Icon size={32} />
                </div>

                {/* Content */}
                <div className="relative z-1">
                  <h3 className="font-heading font-semibold text-xl leading-[1.1] text-[var(--fg-primary)] mb-3 tracking-[-0.02em]">
                    {t(step.titleKey)}
                  </h3>
                  <p className="font-body text-base leading-[1.625] text-[var(--fg-muted)]">
                    {t(step.descriptionKey)}
                  </p>
                </div>

                {/* Line */}
                <div className="card-line absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-0 transition-all duration-400" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href={`/${locale}/business`}
            className="inline-flex items-center gap-3 bg-[var(--accent-primary)] text-[var(--bg-base)] font-body font-semibold text-base px-8 py-4 rounded-[0.375rem] transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_0_20px_oklch(0.82_0.22_135/0.3),0_0_40px_oklch(0.82_0.22_135/0.15)] hover:bg-[var(--accent-primary-hover)] hover:scale-[1.02] active:scale-[0.98] [&:hover_svg]:translate-x-1"
          >
            {t("cta")}
            <ArrowRight
              size={20}
              className="transition-transform duration-250"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
