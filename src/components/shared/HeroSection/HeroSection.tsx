'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FloatingProduct } from '@shared/FloatingProduct';
import styles from './HeroSection.module.scss';

export function HeroSection() {
  const t = useTranslations('hero');

  const stats = [
    { value: '13+', label: t('stats.products') },
    { value: '8+', label: t('stats.certificates') },
    { value: '50+', label: t('stats.countries') },
    { value: '10K+', label: t('stats.clients') },
  ];

  return (
    <section className={styles.section} aria-labelledby="hero-title">
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Left Column - Text Content */}
          <motion.div
            className={styles.textContent}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className={styles.label}>
              {t('label')}
            </span>

            <h1 id="hero-title" className={styles.title}>
              <span className={styles.titleLine}>{t('title')}</span>
            </h1>

            <p className={styles.description}>
              {t('subtitle')}
            </p>

            <div className={styles.actions}>
              <Link href="/catalog" className={styles.buttonPrimary}>
                {t('cta')}
              </Link>
              <Link href="/about" className={styles.buttonOutline}>
                {t('aboutLink')}
              </Link>
            </div>
          </motion.div>

          {/* Right Column - Product Image */}
          <motion.div
            className={styles.imageContent}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          >
            <FloatingProduct duration={6} distance={20}>
              <div className={styles.productImageWrapper}>
                <img
                  src="/products/greenmax/main.png"
                  alt="GreenMAX — Main product of M-International"
                  className={styles.productImage}
                  loading="eager"
                />
                <div className={styles.productGlow} aria-hidden="true" />
              </div>
            </FloatingProduct>

            {/* Floating badges */}
            <motion.div
              className={styles.floatingBadge}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              aria-label="GMP Certified"
            >
              <span className={styles.badgeText}>GMP</span>
            </motion.div>

            <motion.div
              className={`${styles.floatingBadge} ${styles.floatingBadgeSecond}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              aria-label="Halal Certified"
            >
              <span className={styles.badgeText}>HALAL</span>
            </motion.div>

            <motion.div
              className={`${styles.floatingBadge} ${styles.floatingBadgeThird}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              aria-label="ISO Certified"
            >
              <span className={styles.badgeText}>ISO</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className={styles.stats}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          role="list"
          aria-label="Company statistics"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className={styles.stat} role="listitem">
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
              {index < stats.length - 1 && <div className={styles.statDivider} aria-hidden="true" />}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Background gradient */}
      <div className={styles.backgroundGradient} aria-hidden="true" />
    </section>
  );
}
