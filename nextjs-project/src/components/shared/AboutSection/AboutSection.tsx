'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, Rocket, Globe, Award, Users, Sparkles } from 'lucide-react';
import styles from './AboutSection.module.scss';

const timelineItems = [
  {
    year: '2018',
    titleKey: 'timeline.2018.title',
    descriptionKey: 'timeline.2018.description',
    icon: Rocket,
  },
  {
    year: '2019',
    titleKey: 'timeline.2019.title',
    descriptionKey: 'timeline.2019.description',
    icon: Sparkles,
  },
  {
    year: '2020',
    titleKey: 'timeline.2020.title',
    descriptionKey: 'timeline.2020.description',
    icon: Globe,
  },
  {
    year: '2022',
    titleKey: 'timeline.2022.title',
    descriptionKey: 'timeline.2022.description',
    icon: Award,
  },
  {
    year: '2024',
    titleKey: 'timeline.2024.title',
    descriptionKey: 'timeline.2024.description',
    icon: Users,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  },
};

export function AboutSection() {
  const locale = useLocale();
  const t = useTranslations('about');

  return (
    <section className={styles.section} aria-labelledby="about-title">
      <div className={styles.container}>
        {/* Заголовок */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="about-title" className={styles.title}>{t('title')}</h2>
          <p className={styles.subtitle}>{t('description')}</p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className={styles.timeline}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Вертикальная линия */}
          <div className={styles.timelineLine} aria-hidden="true">
            <motion.div
              className={styles.timelineLineFill}
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          {/* Элементы timeline */}
          {timelineItems.map((item, index) => {
            const Icon = item.icon;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={item.year}
                className={`${styles.timelineItem} ${isLeft ? styles.timelineItemLeft : styles.timelineItemRight}`}
                variants={itemVariants}
              >
                {/* Точка на линии */}
                <div className={styles.timelineDot}>
                  <motion.div
                    className={styles.timelineDotInner}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  />
                </div>

                {/* Карточка */}
                <motion.div
                  className={styles.timelineCard}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 20px 40px rgba(180, 230, 50, 0.1)',
                  }}
                >
                  <div className={styles.cardHeader}>
                    <span className={styles.year}>{item.year}</span>
                    <Icon className={styles.cardIcon} size={24} />
                  </div>
                  <h3 className={styles.cardTitle}>{t(item.titleKey)}</h3>
                  <p className={styles.cardDescription}>{t(item.descriptionKey)}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href={`/${locale}/about`} className={styles.ctaLink}>
            {t('learnMore')}
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
