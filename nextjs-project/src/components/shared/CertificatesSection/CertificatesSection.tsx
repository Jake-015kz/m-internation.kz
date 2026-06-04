'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Award, Shield, CheckCircle, BadgeCheck, FileCheck, Globe } from 'lucide-react';
import styles from './CertificatesSection.module.scss';

const certificates = [
  { id: 'gmp', name: 'GMP', icon: Award },
  { id: 'iso', name: 'ISO', icon: Globe },
  { id: 'halal', name: 'HALAL', icon: CheckCircle },
  { id: 'mesti', name: 'MESTI', icon: FileCheck },
  { id: 'fda', name: 'FDA', icon: Shield },
  { id: 'eac', name: 'EAC', icon: BadgeCheck },
];

// Дублируем для бесконечной ленты
const marqueeItems = [...certificates, ...certificates];

export function CertificatesSection() {
  const t = useTranslations('certificates');

  return (
    <section className={styles.section} aria-labelledby="certificates-title">
      {/* Фоновый текст */}
      <div className={styles.backgroundText} aria-hidden="true">
        <span>CERTIFIED</span>
      </div>

      <div className={styles.container}>
        {/* Заголовок */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="certificates-title" className={styles.title}>{t('title')}</h2>
          <p className={styles.description}>{t('description')}</p>
        </motion.div>

        {/* Бегущая строка 1 - вправо */}
        <div className={styles.marqueeContainer}>
          <div className={`${styles.marquee} ${styles.marqueeRight}`}>
            {marqueeItems.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <div key={`row1-${cert.id}-${index}`} className={styles.marqueeItem}>
                  <Icon size={20} />
                  <span>{cert.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Бегущая строка 2 - влево */}
        <div className={styles.marqueeContainer}>
          <div className={`${styles.marquee} ${styles.marqueeLeft}`}>
            {[...marqueeItems].reverse().map((cert, index) => {
              const Icon = cert.icon;
              return (
                <div key={`row2-${cert.id}-${index}`} className={styles.marqueeItem}>
                  <Icon size={20} />
                  <span>{cert.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
