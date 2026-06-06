"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import {
  ArrowRight,
  Rocket,
  Globe,
  Award,
  Users,
  Sparkles,
} from "lucide-react";

const timelineItems = [
  {
    year: "2018",
    titleKey: "timeline.2018.title",
    descriptionKey: "timeline.2018.description",
    icon: Rocket,
  },
  {
    year: "2019",
    titleKey: "timeline.2019.title",
    descriptionKey: "timeline.2019.description",
    icon: Sparkles,
  },
  {
    year: "2020",
    titleKey: "timeline.2020.title",
    descriptionKey: "timeline.2020.description",
    icon: Globe,
  },
  {
    year: "2022",
    titleKey: "timeline.2022.title",
    descriptionKey: "timeline.2022.description",
    icon: Award,
  },
  {
    year: "2024",
    titleKey: "timeline.2024.title",
    descriptionKey: "timeline.2024.description",
    icon: Users,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function AboutSection() {
  const locale = useLocale();
  const t = useTranslations("about");

  return (
    <section
      className="py-24 relative overflow-hidden md:py-32"
      aria-labelledby="about-title"
    >
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
            id="about-title"
            className="font-heading font-semibold text-3xl leading-[1.1] text-[var(--fg-primary)] tracking-[-0.02em] mb-6 md:text-4xl lg:text-5xl"
          >
            {t("title")}
          </h2>
          <p className="font-body text-lg leading-[1.625] text-[var(--fg-muted)] max-w-[40rem] mx-auto">
            {t("description")}
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative py-8 md:py-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-[var(--border-subtle)] rounded-full overflow-hidden md:left-1/2 md:-translate-x-1/2">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[var(--accent-primary)] via-[oklch(0.75_0.2_100)] to-[var(--accent-gold)] shadow-[0_0_12px_oklch(0.82_0.22_135/0.5)]"
              style={{ height: "100%" }}
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          {/* Timeline items */}
          {timelineItems.map((item, index) => {
            const Icon = item.icon;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={item.year}
                className="relative mb-12 pl-15 md:pl-0 md:mb-16 md:flex md:justify-center"
                variants={itemVariants}
              >
                {/* Dot */}
                <div className="absolute left-3 top-0 w-[18px] h-[18px] bg-[var(--bg-base)] border-2 border-[var(--border)] rounded-full flex items-center justify-center z-2 transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] md:left-1/2 md:-translate-x-1/2 group-hover:border-[var(--accent-primary)] group-hover:shadow-[0_0_16px_oklch(0.82_0.22_135/0.4)]">
                  <motion.div
                    className="w-2 h-2 bg-[var(--accent-primary)] rounded-full shadow-[0_0_12px_oklch(0.82_0.22_135/0.5)] transition-all duration-250"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  />
                </div>

                {/* Card — Glassmorphism 2.0 */}
                <div
                  className={`glass-card rounded-2xl p-6 cursor-default max-w-[400px] md:max-w-[350px] ${isLeft ? "md:mr-[calc(50%+40px)]" : "md:ml-[calc(50%+40px)]"}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono font-semibold text-2xl text-[var(--accent-primary)] leading-none shadow-[0_0_16px_oklch(0.82_0.22_135/0.4)] transition-shadow duration-250">
                      {item.year}
                    </span>
                    <Icon
                      size={24}
                      className="text-[var(--accent-primary)] opacity-70 transition-all duration-250"
                    />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-[var(--fg-primary)] mb-2 tracking-[-0.02em] leading-[1.1]">
                    {t(item.titleKey)}
                  </h3>
                  <p className="font-body text-base leading-[1.625] text-[var(--fg-muted)]">
                    {t(item.descriptionKey)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href={`/${locale}/about`}
            className="inline-flex items-center gap-3 bg-transparent border border-[var(--border)] text-[var(--fg-primary)] font-body font-medium text-sm px-6 py-3 rounded-[0.375rem] transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[var(--accent-primary)] hover:bg-[oklch(0.82_0.22_135/0.08)] [&:hover_svg]:translate-x-1"
          >
            {t("learnMore")}
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
