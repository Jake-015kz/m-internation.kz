'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { FloatingProduct } from '@shared/FloatingProduct';
import styles from './HeroSection.module.scss';

export function HeroSection() {
  const t = useTranslations('hero');
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // GSAP анимация появления секции через Timeline
  useGSAP(() => {
    if (!mounted) return;

    const tl = gsap.timeline({
      defaults: {
        duration: 0.8,
        ease: 'power2.out',
      },
    });

    // Анимация последовательного появления элементов
    tl.from(labelRef.current, { autoAlpha: 0, y: 20 })
      .from(titleRef.current, { autoAlpha: 0, y: 30 }, '-=0.4')
      .from(descriptionRef.current, { autoAlpha: 0, y: 20 }, '-=0.3')
      .from(actionsRef.current, { autoAlpha: 0, y: 20 }, '-=0.3')
      .from(productRef.current, { autoAlpha: 0, x: 50, duration: 1 }, '-=0.5')
      .from(
        '.gsap-badge',
        {
          autoAlpha: 0,
          scale: 0.8,
          stagger: 0.15,
          duration: 0.6,
        },
        '-=0.6'
      )
      .from(
        '.gsap-stat',
        {
          autoAlpha: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.5,
        },
        '-=0.8'
      );

    return () => {
      tl.kill();
    };
  }, [mounted]);

  const stats = [
    { value: '13+', label: t('stats.products') },
    { value: '8+', label: t('stats.certificates') },
    { value: '50+', label: t('stats.countries') },
    { value: '10K+', label: t('stats.clients') },
  ];

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="hero-title">
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Left Column - Text Content */}
          <div className={styles.textContent}>
            <span ref={labelRef} className={styles.label}>
              {t('label')}
            </span>

            <h1 ref={titleRef} id="hero-title" className={styles.title}>
              <span className={styles.titleLine}>{t('title')}</span>
            </h1>

            <p ref={descriptionRef} className={styles.description}>
              {t('subtitle')}
            </p>

            <div ref={actionsRef} className={styles.actions}>
              <Link href="/catalog" className={styles.buttonPrimary}>
                {t('cta')}
              </Link>
              <Link href="/about" className={styles.buttonOutline}>
                {t('aboutLink')}
              </Link>
            </div>
          </div>

          {/* Right Column - Product Image */}
          <div ref={productRef} className={styles.imageContent}>
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
            <div
              ref={(el) => { badgeRefs.current[0] = el; }}
              className={`${styles.floatingBadge} gsap-badge`}
              aria-label="GMP Certified"
            >
              <span className={styles.badgeText}>GMP</span>
            </div>

            <div
              ref={(el) => { badgeRefs.current[1] = el; }}
              className={`${styles.floatingBadge} ${styles.floatingBadgeSecond} gsap-badge`}
              aria-label="Halal Certified"
            >
              <span className={styles.badgeText}>HALAL</span>
            </div>

            <div
              ref={(el) => { badgeRefs.current[2] = el; }}
              className={`${styles.floatingBadge} ${styles.floatingBadgeThird} gsap-badge`}
              aria-label="ISO Certified"
            >
              <span className={styles.badgeText}>ISO</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className={styles.stats} role="list" aria-label="Company statistics">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`${styles.stat} gsap-stat`}
              role="listitem"
            >
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
              {index < stats.length - 1 && <div className={styles.statDivider} aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>

      {/* Background gradient */}
      <div className={styles.backgroundGradient} aria-hidden="true" />
    </section>
  );
}