'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './ProductShowcase.module.scss';

interface Product {
  id: string;
  name: string;
  subtitle: string;
  descriptionKey: string;
  image: string;
  color: string;
  gradient: string;
}

const products: Product[] = [
  {
    id: 'greenmax',
    name: 'GreenMAX',
    subtitle: 'Antioxidant & Detox',
    descriptionKey: 'greenmax.description',
    image: '/products/greenmax/main.png',
    color: '#B4E632',
    gradient: 'radial-gradient(ellipse at center, rgba(180, 230, 50, 0.15) 0%, transparent 70%)',
  },
  {
    id: 'blumax',
    name: 'BluMAX',
    subtitle: 'Immunity & Vitality',
    descriptionKey: 'blumax.description',
    image: '/products/blumax/main.png',
    color: '#6496FF',
    gradient: 'radial-gradient(ellipse at center, rgba(100, 150, 255, 0.15) 0%, transparent 70%)',
  },
  {
    id: 'ye-katerina',
    name: 'Ye-Katerina',
    subtitle: "Women's Health",
    descriptionKey: 'yekaterina.description',
    image: '/products/ye-katerina/main.png',
    color: '#C864B4',
    gradient: 'radial-gradient(ellipse at center, rgba(200, 100, 180, 0.15) 0%, transparent 70%)',
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

export function ProductShowcase() {
  const t = useTranslations('products');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const currentProduct = products[currentIndex];

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const goNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  // Автопрокрутка
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(goNext, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const features = [
    { key: 'natural' },
    { key: 'certified' },
    { key: 'tested' },
  ];

  return (
    <section
      className={styles.section}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Анимированный фон */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProduct.id}
          className={styles.background}
          style={{ background: currentProduct.gradient }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>

      {/* Фоновое название продукта */}
      <div className={styles.backgroundName} aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentProduct.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.03, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
          >
            {currentProduct.name}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className={styles.container}>
        {/* Заголовок секции */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.description}>{t('description')}</p>
        </motion.div>

        {/* Слайдер */}
        <div className={styles.slider}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentProduct.id}
              className={styles.slide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Изображение продукта */}
              <div className={styles.imageSide}>
                <motion.div
                  className={styles.imageWrapper}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <img
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    className={styles.productImage}
                  />
                  <div
                    className={styles.imageGlow}
                    style={{ backgroundColor: currentProduct.color }}
                  />
                </motion.div>
              </div>

              {/* Информация о продукте */}
              <div className={styles.infoSide}>
                <motion.span
                  className={styles.productSubtitle}
                  style={{ color: currentProduct.color }}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {currentProduct.subtitle}
                </motion.span>

                <motion.h3
                  className={styles.productName}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {currentProduct.name}
                </motion.h3>

                <motion.p
                  className={styles.productDescription}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {t(currentProduct.descriptionKey)}
                </motion.p>

                <motion.div
                  className={styles.features}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {features.map((feature) => (
                    <div key={feature.key} className={styles.feature}>
                      <span className={styles.featureIcon}>✓</span>
                      <span>{t(`features.${feature.key}`)}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Кнопки навигации */}
          <button
            className={`${styles.navButton} ${styles.navButtonPrev}`}
            onClick={goPrev}
            aria-label="Previous product"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className={`${styles.navButton} ${styles.navButtonNext}`}
            onClick={goNext}
            aria-label="Next product"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Индикаторы */}
        <div className={styles.indicators}>
          {products.map((product, index) => (
            <button
              key={product.id}
              className={`${styles.indicator} ${index === currentIndex ? styles.indicatorActive : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to ${product.name}`}
              style={{
                backgroundColor: index === currentIndex ? product.color : undefined,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
