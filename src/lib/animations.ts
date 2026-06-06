import type { Variants, Transition } from "framer-motion";

// Premium Wellness easing curves
export const easing = {
  smooth: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
  gentle: [0.16, 1, 0.3, 1] as [number, number, number, number],
  expo: [0.16, 1, 0.3, 1] as [number, number, number, number],
  spring: { type: "spring" as const, stiffness: 100, damping: 15 },
};

// Fade up — default reveal
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easing.gentle },
  },
};

// Fade in — simple opacity
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: easing.gentle },
  },
};

// Scale in — for images and cards
export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easing.smooth },
  },
};

// Stagger container — for lists and grids
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

// Slide from left — for timeline items
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easing.gentle },
  },
};

// Slide from right — for alternating reveals
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easing.gentle },
  },
};

// Hover animations
export const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.3, ease: easing.smooth } as Transition,
};

export const hoverLift = {
  y: -4,
  transition: { duration: 0.3, ...easing.spring } as Transition,
};

// Page transition
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 16 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easing.gentle },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.3 },
  },
};
