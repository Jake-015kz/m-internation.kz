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

      {/* CTA Section */}
      <section
        className="py-24 border-t border-[var(--border-subtle)] relative overflow-hidden bg-gradient-to-b from-transparent to-[oklch(0.82_0.22_135/0.02)] md:py-32"
        aria-labelledby="cta-title"
      >
        <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-[40rem] mx-auto relative z-2">
            <h2
              id="cta-title"
              className="font-heading font-semibold text-3xl leading-[1.1] text-[var(--fg-primary)] tracking-[-0.02em] mb-4 md:text-4xl lg:text-5xl"
            >
              {t("cta.title")}
            </h2>
            <p className="font-body text-lg leading-[1.625] text-[var(--fg-secondary)] mb-8">
              {t("cta.description")}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
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
        </div>
      </section>
    </main>
  );
}
