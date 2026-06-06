'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  { id: 'greenmax', name: 'GreenMAX', subtitle: 'Antioxidant & Detox', descriptionKey: 'greenmax.description', image: '/products/greenmax/main.png', color: '#B4E632', gradient: 'radial-gradient(ellipse at center, rgba(180, 230, 50, 0.15) 0%, transparent 70%)' },
  { id: 'blumax', name: 'BluMAX', subtitle: 'Immunity & Vitality', descriptionKey: 'blumax.description', image: '/products/blumax/main.png', color: '#6496FF', gradient: 'radial-gradient(ellipse at center, rgba(100, 150, 255, 0.15) 0%, transparent 70%)' },
  { id: 'ye-katerina', name: 'Ye-Katerina', subtitle: "Women's Health", descriptionKey: 'yekaterina.description', image: '/products/ye-katerina/main.png', color: '#C864B4', gradient: 'radial-gradient(ellipse at center, rgba(200, 100, 180, 0.15) 0%, transparent 70%)' },
];

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0 }),
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

  const goNext = () => { setDirection(1); setCurrentIndex((prev) => (prev + 1) % products.length); };
  const goPrev = () => { setDirection(-1); setCurrentIndex((prev) => (prev - 1 + products.length) % products.length); };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(goNext, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const features = [{ key: 'natural' }, { key: 'certified' }, { key: 'tested' }];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-16 pb-16 md:pt-24 md:pb-24"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Animated background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProduct.id}
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: currentProduct.gradient }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>

      {/* Background product name */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none" aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentProduct.id}
            className="font-mono font-bold text-[clamp(6rem,20vw,16rem)] text-[var(--fg-primary)] opacity-[0.03] tracking-[0.05em] whitespace-nowrap"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.03, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
          >
            {currentProduct.name}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 relative z-2 w-full">
        {/* Header */}
        <motion.div
          className="mb-12 text-center relative z-2 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading font-semibold text-3xl leading-[1.1] text-[var(--fg-primary)] tracking-[-0.02em] mb-4 md:text-4xl lg:text-5xl">
            {t('title')}
          </h2>
          <p className="font-body text-lg leading-[1.625] text-[var(--fg-muted)] max-w-[40rem] mx-auto">
            {t('description')}
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative min-h-[500px] md:min-h-[600px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentProduct.id}
              className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2 lg:gap-16"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Image */}
              <div className="flex justify-center items-center relative">
                <motion.div
                  className="relative w-full max-w-[350px] md:max-w-[450px]"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <img src={currentProduct.image} alt={currentProduct.name} className="w-full h-auto object-contain relative z-2 drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full blur-[80px] opacity-40 z-1 pointer-events-none" style={{ backgroundColor: currentProduct.color }} />
                </motion.div>
              </div>

              {/* Info */}
              <div className="flex flex-col gap-4 text-center lg:text-left">
                <motion.span
                  className="font-body text-base font-semibold uppercase tracking-[0.12em]"
                  style={{ color: currentProduct.color }}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {currentProduct.subtitle}
                </motion.span>

                <motion.h3
                  className="font-heading font-semibold leading-[0.95] text-[var(--fg-primary)] tracking-[-0.02em] text-[clamp(2rem,8vw,5.25rem)]"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {currentProduct.name}
                </motion.h3>

                <motion.p
                  className="font-body text-lg leading-[1.625] text-[var(--fg-muted)] mt-2 max-w-[500px] lg:mr-auto"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {t(currentProduct.descriptionKey)}
                </motion.p>

                <motion.div
                  className="flex flex-col gap-3 mt-6 items-center lg:items-start"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {features.map((feature) => (
                    <div key={feature.key} className="flex items-center gap-3 text-[var(--fg-primary)] font-body text-base">
                      <span className="text-[var(--accent-primary)] font-bold text-lg">✓</span>
                      <span>{t(`features.${feature.key}`)}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <button
            className="absolute top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full text-[var(--fg-primary)] cursor-pointer transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[linear-gradient(135deg,oklch(1_0_0/0.08)_0%,oklch(1_0_0/0.03)_100%)] backdrop-blur-[12px] border border-[oklch(1_0_0/0.1)] shadow-[inset_0_1px_0_oklch(1_0_0/0.1),0_4px_16px_oklch(0_0_0/0.2)] hover:bg-[linear-gradient(135deg,oklch(0.82_0.22_135/0.12)_0%,oklch(1_0_0/0.05)_100%)] hover:border-[oklch(0.82_0.22_135/0.3)] hover:text-[var(--accent-primary)] hover:shadow-[inset_0_1px_0_oklch(1_0_0/0.15),0_8px_24px_oklch(0_0_0/0.25),0_0_16px_oklch(0.82_0.22_135/0.1)] left-4 xl:-left-12 max-md:hidden"
            onClick={goPrev}
            aria-label="Previous product"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full text-[var(--fg-primary)] cursor-pointer transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[linear-gradient(135deg,oklch(1_0_0/0.08)_0%,oklch(1_0_0/0.03)_100%)] backdrop-blur-[12px] border border-[oklch(1_0_0/0.1)] shadow-[inset_0_1px_0_oklch(1_0_0/0.1),0_4px_16px_oklch(0_0_0/0.2)] hover:bg-[linear-gradient(135deg,oklch(0.82_0.22_135/0.12)_0%,oklch(1_0_0/0.05)_100%)] hover:border-[oklch(0.82_0.22_135/0.3)] hover:text-[var(--accent-primary)] hover:shadow-[inset_0_1px_0_oklch(1_0_0/0.15),0_8px_24px_oklch(0_0_0/0.25),0_0_16px_oklch(0.82_0.22_135/0.1)] right-4 xl:-right-12 max-md:hidden"
            onClick={goNext}
            aria-label="Next product"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-12 relative z-2">
          {products.map((product, index) => (
            <button
              key={product.id}
              className={`w-3 h-3 rounded-full border-none cursor-pointer transition-all duration-250 p-0 ${index === currentIndex ? 'scale-[1.2]' : 'bg-[var(--border)] hover:bg-[var(--fg-muted)]'}`}
              style={{ backgroundColor: index === currentIndex ? product.color : undefined }}
              onClick={() => goToSlide(index)}
              aria-label={`Go to ${product.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
