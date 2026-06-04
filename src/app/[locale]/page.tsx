'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { HeroSection } from '@shared/HeroSection';
import { CertificatesSection } from '@shared/CertificatesSection';
import { ProductShowcase } from '@shared/ProductShowcase';
import { AboutSection } from '@shared/AboutSection';
import { BusinessSection } from '@shared/BusinessSection';
import styles from './page.module.scss';

export default function HomePage() {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <HeroSection />

      {/* Certificates Marquee */}
      <CertificatesSection />

      {/* Product Showcase Slider */}
      <ProductShowcase />

      {/* About Section with Timeline */}
      <AboutSection />

      {/* Business Activation Section */}
      <BusinessSection />

      {/* CTA Section */}
      <section className={styles.ctaSection} aria-labelledby="cta-title">
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 id="cta-title" className={styles.ctaTitle}>{t('cta.title')}</h2>
            <p className={styles.ctaDescription}>
              {t('cta.description')}
            </p>
            <div className={styles.ctaActions}>
              <Link href={`/${locale}/contacts`} className={styles.ctaButtonPrimary}>
                {t('cta.contact')}
              </Link>
              <Link href={`/${locale}/catalog`} className={styles.ctaButtonOutline}>
                {t('cta.catalog')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
