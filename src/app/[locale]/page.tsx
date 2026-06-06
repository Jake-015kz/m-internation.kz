"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { HeroSection } from "@shared/HeroSection";
import { CertificatesSection } from "@shared/CertificatesSection";
import { ProductShowcase } from "@shared/ProductShowcase";
import { AboutSection } from "@shared/AboutSection";
import { BusinessSection } from "@shared/BusinessSection";

export default function HomePage() {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <main className="min-h-screen">
      <HeroSection />
      <CertificatesSection />
      <ProductShowcase />
      <AboutSection />
      <BusinessSection />

      {/* Split Screen CTA Section */}
      <section
        className="border-t border-[var(--border-subtle)] relative overflow-hidden"
        aria-labelledby="cta-title"
      >
        <div className="split-cta min-h-[60vh]">
          {/* Left — Text */}
          <div className="flex flex-col justify-center px-8 py-16 md:px-16 lg:px-20">
            <h2
              id="cta-title"
              className="font-heading font-semibold text-3xl leading-[1.1] text-[var(--fg-primary)] tracking-[-0.02em] mb-4 md:text-4xl lg:text-5xl"
            >
              {t("cta.title")}
            </h2>
            <p className="font-body text-lg leading-[1.625] text-[var(--fg-secondary)] mb-8 max-w-[32rem]">
              {t("cta.description")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/contacts`}
                className="inline-flex items-center justify-center bg-[var(--accent-primary)] text-[var(--bg-base)] font-body font-semibold text-base px-8 py-4 rounded-[0.375rem] transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_0_20px_oklch(0.82_0.22_135/0.3),0_0_40px_oklch(0.82_0.22_135/0.15)] hover:bg-[var(--accent-primary-hover)] hover:scale-[1.02] hover:shadow-[0_0_24px_oklch(0.82_0.22_135/0.4)] active:scale-[0.98]"
              >
                {t("cta.contact")}
              </Link>
              <Link
                href={`/${locale}/catalog`}
                className="inline-flex items-center justify-center bg-transparent border border-[var(--border)] text-[var(--fg-primary)] font-body font-medium text-base px-8 py-4 rounded-[0.375rem] transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[var(--accent-primary)] hover:bg-[oklch(0.82_0.22_135/0.08)]"
              >
                {t("cta.catalog")}
              </Link>
            </div>
          </div>

          {/* Right — Visual */}
          <div className="relative flex items-center justify-center bg-gradient-to-br from-[oklch(0.82_0.22_135/0.05)] to-transparent overflow-hidden">
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.82_0.22_135/0.08)_0%,transparent_70%)]"
              aria-hidden="true"
            />
            <div className="relative z-10 text-center">
              <span className="font-mono font-bold text-[clamp(4rem,12vw,10rem)] text-[var(--fg-primary)] opacity-[0.04] tracking-[0.1em]">
                M
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
