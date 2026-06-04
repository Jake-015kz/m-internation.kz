'use client';

import { motion } from 'framer-motion';
import styles from './FloatingProduct.module.scss';

interface FloatingProductProps {
  children: React.ReactNode;
  duration?: number;
  distance?: number;
  className?: string;
}

export function FloatingProduct({
  children,
  duration = 6,
  distance = 20,
  className = '',
}: FloatingProductProps) {
  return (
    <motion.div
      className={`${styles.floatingProduct} ${className}`}
      animate={{
        y: [0, -distance, 0],
      }}
      transition={{
        duration,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      }}
    >
      {children}
    </motion.div>
  );
}
