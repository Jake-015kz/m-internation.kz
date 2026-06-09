"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { gsap } from "gsap";
import { prefersReducedMotion, EASING } from "@/lib/gsap-animations";

interface SlideData {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  accentColor: string;
  ringGradient: string;
}

const slides: SlideData[] = [
  {
    image: "/products/micrystal/main.png",
    alt: "MiCrystal — флагманский продукт M-International",
    eyebrow: "Флагман",
    title: "ЗДОРОВЬЕ ГЛАЗ",
    subtitle: "Клеточное питание с лютеином и астаксантином. Защита зрения от экранов и возрастных изменений.",
    ctaLabel: "Подробнее",
    ctaHref: "/catalog/micrystal",
    accentColor: "oklch(0.78 0.22 135)",
    ringGradient: "oklch(0.78 0.22 135), oklch(0.85 0.16 85)",
  },
  {
    image: "/products/greenmax/main.png",
    alt: "GreenMAX — детокс и очищение",
    eyebrow: "Детокс",
    title: "ОЧИЩЕНИЕ ОРГАНИЗМА",
    subtitle: "Растительная формула 3 в 1: кишечник, микрофлора, печень. Натуральная клетчатка и пробиотики.",
    ctaLabel: "Подробнее",
    ctaHref: "/catalog/greenmax",
    accentColor: "oklch(0.65 0.18 155)",
    ringGradient: "oklch(0.55 0.16 155), oklch(0.75 0.14 140)",
  },
  {
    image: "/products/mimax/main.png",
    alt: "MiMAX — антиоксидант №1",
    eyebrow: "Антиоксидант",
    title: "ОМОЛОЖЕНИЕ КЛЕТОК",
    subtitle: "Астаксантин — действие в 6000 раз мощнее витамина С. Защита клеток, сердца и кожи.",
    ctaLabel: "Подробнее",
    ctaHref: "/catalog/mimax",
    accentColor: "oklch(0.55 0.2 25)",
    ringGradient: "oklch(0.55 0.2 25), oklch(0.6 0.18 40)",
  },
];

function SlideContent({
  slide,
  isActive,
  direction,
}: {
  slide: SlideData;
  isActive: boolean;
  direction: number;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (!isActive || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const xOffset = direction >= 0 ? 40 : -40;
      const tl = gsap.timeline({
        defaults: { ease: EASING.gentle as unknown as gsap.EaseFunction },
      });

      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.9, rotate: direction >= 0 ? -3 : 3 },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.7 }
        );
      }
      if (contentRef.current) {
        const children = contentRef.current.children;
        tl.fromTo(
          children,
          { opacity: 0, y: 24, x: xOffset },
          { opacity: 1, y: 0, x: 0, duration: 0.5, stagger: 0.06 },
          "-=0.4"
        );
      }
    });

    return () => ctx.revert();
  }, [isActive, direction]);

  return (
    <div className="grid grid-cols-1 gap-4 md:gap-8 items-center lg:grid-cols-2 lg:gap-12 h-full">
      {/* Left — Text */}
      <div ref={contentRef} className="text-left order-1 lg:order-1">
        <div
          className="inline-flex items-center gap-2 mb-3 md:mb-5 px-3 py-1.5 rounded-full border"
          style={{
            borderColor: `${slide.accentColor}30`,
            background: `${slide.accentColor}08`,
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: slide.accentColor }}
          />
          <span
            className="font-mono font-medium text-[10px] md:text-xs uppercase tracking-[0.08em]"
            style={{ color: slide.accentColor }}
          >
            {slide.eyebrow}
          </span>
        </div>

        <h1
          id="hero-title"
          className="font-heading font-bold tracking-[-0.02em] md:tracking-[-0.04em] mb-3 md:mb-5 text-[clamp(1.75rem,5vw,3.5rem)] leading-[1.1] md:leading-[1.05] text-[var(--fg-primary)]"
        >
          {slide.title}
        </h1>

        <p className="font-body text-sm md:text-lg leading-[1.5] md:leading-[1.6] max-w-[30rem] mb-5 md:mb-8 text-[var(--fg-secondary)]">
          {slide.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <Link
            href={slide.ctaHref}
            className="inline-flex items-center justify-center font-body font-semibold text-sm md:text-base px-6 py-3 md:px-8 md:py-4 rounded-[var(--radius-sm)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] text-white hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: slide.accentColor,
              boxShadow: `0 0 20px ${slide.accentColor}40, 0 0 40px ${slide.accentColor}15`,
            }}
          >
            {slide.ctaLabel}
          </Link>
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center border border-[var(--border)] text-[var(--fg-primary)] font-body font-medium text-sm md:text-base px-6 py-3 md:px-8 md:py-4 rounded-[var(--radius-sm)] transition-all duration-300 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
          >
            Весь каталог
          </Link>
        </div>
      </div>

      {/* Right — Product image */}
      <div
        ref={imageRef}
        className="relative flex justify-center items-center order-2 lg:order-2"
      >
        <div className="relative">
          {/* Rotating ring */}
          {!isMobile && (
            <div
              className="absolute inset-0 -m-12 rounded-full opacity-[0.06]"
              style={{
                background: `conic-gradient(from 0deg, ${slide.ringGradient})`,
                filter: "blur(40px)",
                animation: "spin 20s linear infinite",
              }}
            />
          )}

          {/* Glass card behind product */}
          <div className="absolute inset-0 -m-3 md:-m-6 glass-card rounded-2xl md:rounded-3xl" />

          <Image
            src={slide.image}
            alt={slide.alt}
            width={420}
            height={420}
            priority={slide === slides[0]}
            className="w-full max-w-[200px] sm:max-w-[260px] md:max-w-[340px] lg:max-w-[380px] h-auto object-contain relative z-10"
          />

          {/* Glow under product */}
          <div
            className="absolute bottom-1 md:bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-6 md:h-10 blur-xl md:blur-2xl rounded-full z-0"
            style={{ background: slide.accentColor, opacity: 0.12 }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}

export function HeroSectionA() {
  const locale = useLocale();
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
    },
    [activeIndex]
  );

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % slides.length);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo((activeIndex - 1 + slides.length) % slides.length);
  }, [activeIndex, goTo]);

  // Auto-play every 5 seconds
  useEffect(() => {
    if (prefersReducedMotion()) return;
    autoPlayRef.current = setInterval(goNext, 5000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [goNext]);

  const currentSlide = slides[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90dvh] flex items-center pt-14 pb-6 md:pt-20 md:pb-12 overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-base)] via-[var(--bg-surface)] to-[var(--bg-base)]" />

      {/* Animated gradient mesh — desktop only */}
      {!isMobile && (
        <>
          <div
            className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full opacity-[0.07]"
            style={{
              background: `radial-gradient(circle, ${currentSlide.accentColor}, transparent 70%)`,
              transition: "background 800ms ease",
            }}
          />
          <div
            className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full opacity-[0.05]"
            style={{
              background: `radial-gradient(circle, ${currentSlide.accentColor}, transparent 70%)`,
              transition: "background 800ms ease",
            }}
          />
        </>
      )}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)",
          backgroundSize: isMobile ? "30px 30px" : "60px 60px",
        }}
      />

      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 w-full relative z-10">
        {/* Slide content */}
        <div className="relative overflow-hidden">
          <SlideContent
            key={activeIndex}
            slide={currentSlide}
            isActive={true}
            direction={direction}
          />
        </div>

        {/* Slider controls */}
        <div className="mt-6 md:mt-10 pt-5 md:pt-8 border-t border-[var(--border-subtle)]">
          <div className="flex items-center justify-between">
            {/* Navigation arrows + dots */}
            <div className="flex items-center gap-3">
              <button
                onClick={goPrev}
                className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full border border-[var(--border)] text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] hover:border-[var(--accent-primary)] transition-all duration-250"
                aria-label="Предыдущий слайд"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex items-center gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="h-1.5 rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      width: i === activeIndex ? "28px" : "8px",
                      backgroundColor:
                        i === activeIndex
                          ? "var(--accent-primary)"
                          : "var(--border)",
                    }}
                    aria-label={`Слайд ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goNext}
                className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full border border-[var(--border)] text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] hover:border-[var(--accent-primary)] transition-all duration-250"
                aria-label="Следующий слайд"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Slide counter */}
            <span className="font-mono text-[10px] md:text-xs text-[var(--fg-dim)] tracking-[0.05em]">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 md:gap-8 mt-5 md:mb-0">
            <div className="text-center md:text-left">
              <p className="font-heading font-bold text-lg md:text-2xl text-[var(--accent-primary)]">
                10 000+
              </p>
              <p className="font-body text-[10px] md:text-xs text-[var(--fg-muted)] mt-0.5">
                {t("stat.customers")}
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="font-heading font-bold text-lg md:text-2xl text-[var(--accent-primary)]">
                50+
              </p>
              <p className="font-body text-[10px] md:text-xs text-[var(--fg-muted)] mt-0.5">
                {t("stat.countries")}
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="font-heading font-bold text-lg md:text-2xl text-[var(--accent-primary)]">
                15
              </p>
              <p className="font-body text-[10px] md:text-xs text-[var(--fg-muted)] mt-0.5">
                {t("stat.years")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
