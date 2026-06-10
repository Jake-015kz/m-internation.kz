"use client";

import Link from "next/link";
import { CertificatesSection } from "@shared/CertificatesSection";
import { ProductShowcase } from "@shared/ProductShowcase";
import { AboutSection } from "@shared/AboutSection";
import { BusinessSection } from "@shared/BusinessSection";
import { MagneticButton } from "@shared/MagneticButton";
import { ScrollReveal } from "@shared/ScrollReveal";

interface HomeSectionsProps {
  locale: string;
}

export function HomeSections({ locale }: HomeSectionsProps) {
  return (
    <>
      <CertificatesSection />
      <ProductShowcase />
      <AboutSection />
      <BusinessSection />

      {/* Premium CTA Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        {/* Background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.08] pointer-events-none"
          style={{
            background: "radial-gradient(circle, var(--accent-primary), transparent 70%)",
            filter: "blur(80px)",
          }}
          aria-hidden="true"
        />

        <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-[36rem] mx-auto text-center">
              <h2 className="font-heading font-semibold text-xl leading-[1.1] text-[var(--fg-primary)] tracking-normal mb-3 md:mb-4 md:text-3xl lg:text-4xl">
                Готовы к переменам?
              </h2>
              <p className="font-body text-sm md:text-base leading-[1.45] text-[var(--fg-secondary)] mb-8 md:mb-10">
                Свяжитесь с нами, чтобы узнать больше о продукции и возможностях M-International
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <MagneticButton asChild>
                  <Link href={`/${locale}/contacts`}>
                    Связаться с нами
                  </Link>
                </MagneticButton>
                <Link
                  href={`/${locale}/catalog`}
                  className="inline-flex items-center justify-center hero-glass-btn font-body font-medium text-sm px-8 py-3.5 min-h-[48px] rounded-2xl transition-all duration-300"
                >
                  Каталог продукции
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="section-divider mt-16 md:mt-24" />
      </section>
    </>
  );
}
