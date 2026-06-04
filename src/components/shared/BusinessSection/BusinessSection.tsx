'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, UserPlus, GraduationCap, DollarSign } from 'lucide-react';
import styles from './BusinessSection.module.scss';

const steps = [
  {
    id: 'register',
    number: '01',
    titleKey: 'steps.register.title',
    descriptionKey: 'steps.register.description',
    icon: UserPlus,
    gradient: 'linear-gradient(135deg, rgba(180, 230, 50, 0.15) 0%, transparent 100%)',
  },
  {
    id: 'training',
    number: '02',
    titleKey: 'steps.training.title',
    descriptionKey: 'steps.training.description',
    icon: GraduationCap,
    gradient: 'linear-gradient(135deg, rgba(100, 150, 255, 0.15) 0%, transparent 100%)',
  },
  {
    id: 'income',
    number: '03',
    titleKey: 'steps.income.title',
    descriptionKey: 'steps.income.description',
    icon: DollarSign,
    gradient: 'linear-gradient(135deg, rgba(200, 100, 180, 0.15) 0%, transparent 100%)',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  },
};

export function BusinessSection() {
  const locale = useLocale();
  const t = useTranslations('business');

  return (
    <section className={styles.section} aria-labelledby="business-title">
      <div className={styles.container}>
        {/* Заголовок */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="business-title" className={styles.title}>{t('title')}</h2>
          <p className={styles.description}>{t('description')}</p>
        </motion.div>

        {/* Карточки */}
        <motion.div
          className={styles.cards}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.id}
                className={styles.card}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Градиентное свечение при hover */}
                <div
                  className={styles.cardGlow}
                  style={{ background: step.gradient }}
                />

                {/* Номер шага */}
                <span className={styles.cardNumber}>{step.number}</span>

                {/* Иконка */}
                <div className={styles.cardIconWrapper}>
                  <Icon size={32} />
                </div>

                {/* Контент */}
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{t(step.titleKey)}</h3>
                  <p className={styles.cardDescription}>{t(step.descriptionKey)}</p>
                </div>

                {/* Декоративная линия */}
                <div className={styles.cardLine} />
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
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href={`/${locale}/business`} className={styles.ctaButton}>
            {t('cta')}
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
