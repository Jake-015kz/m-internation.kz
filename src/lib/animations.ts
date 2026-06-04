import type { Variants, Transition } from 'framer-motion';

// Плавные easing кривые
export const easing = {
  smooth: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
  bounce: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
  gentle: [0.4, 0.0, 0.2, 1.0] as [number, number, number, number],
  spring: { type: 'spring' as const, stiffness: 100, damping: 15 },
};

// Варианты анимаций
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easing.gentle },
  },
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: easing.smooth },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easing.gentle },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easing.gentle },
  },
};

// Hover анимации
export const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.3, ease: easing.smooth } as Transition,
};

export const hoverLift = {
  y: -5,
  transition: { duration: 0.3, ...easing.spring } as Transition,
};

// Page transition
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easing.gentle },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
};
