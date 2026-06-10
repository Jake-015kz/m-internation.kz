"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, ChevronLeft, ChevronRight, Droplets, Leaf, Shield, Heart, Zap, Apple } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { products } from "@/data/products";

const SHOWCASE_CONFIG: Record<
  string,
  { subtitle: string; descriptionKey: string; color: string; icon: React.ReactNode }
> = {
  greenmax: { subtitle: "Детокс", descriptionKey: "greenmax.description", color: "#4a8e30", icon: <Leaf className="w-4 h-4" /> },
  micrystal: { subtitle: "Зрение", descriptionKey: "micrystal.description", color: "#b8942e", icon: <Droplets className="w-4 h-4" /> },
  mimax: { subtitle: "Антиоксидант", descriptionKey: "mimax.description", color: "#c85020", icon: <Shield className="w-4 h-4" /> },
  blumax: { subtitle: "Иммунитет", descriptionKey: "blumax.description", color: "#2e7aa8", icon: <Heart className="w-4 h-4" /> },
  nutrimax: { subtitle: "Питание", descriptionKey: "nutrimax.description", color: "#6a8e30", icon: <Apple className="w-4 h-4" /> },
  fleximax: { subtitle: "Суставы", descriptionKey: "fleximax.description", color: "#a87e2e", icon: <Zap className="w-4 h-4" /> },
  machoman: { subtitle: "Мужское здоровье", descriptionKey: "machoman.description", color: "#7e3030", icon: <Shield className="w-4 h-4" /> },
};

const showcaseProducts = products.filter((p) => SHOWCASE_CONFIG[p.slug]);

function SoftGlassCard({ product, index }: { product: (typeof showcaseProducts)[0]; index: number }) {
  const locale = useLocale();
  const t = useTranslations("products");
  const config = SHOWCASE_CONFIG[product.slug];
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!config) return null;

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col h-full overflow-hidden transition-all duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s, box-shadow 0.4s ease, border-color 0.4s ease`,
        borderRadius: "1.25rem",
        background: "oklch(1 0 0 / 0.05)",
        backdropFilter: "blur(24px) saturate(150%)",
        WebkitBackdropFilter: "blur(24px) saturate(150%)",
        border: "1px solid oklch(1 0 0 / 0.10)",
        boxShadow: isHovered
          ? `0 20px 60px oklch(0 0 0 / 0.18), 0 0 40px ${config.color}15, inset 0 0 60px oklch(1 0 0 / 0.03)`
          : "inset 0 0 30px oklch(1 0 0 / 0.01)",
        ...(isHovered ? { borderColor: `${config.color}30`, transform: "translateY(-8px)" } : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top accent line */}
      <div
        className="h-[2px] w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${config.color}, transparent)`, opacity: 0.6 }}
        aria-hidden="true"
      />

      {/* Inner glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${config.color}10 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Product image area */}
      <div className="relative flex items-center justify-center p-6 md:p-8 pb-1" style={{ aspectRatio: "16 / 10" }}>
        <div className="relative w-full max-w-[200px] md:max-w-[260px]" style={{ aspectRatio: "1 / 1" }}>
          <Image
            src={product.images[0] ?? ""}
            alt={`${product.name} — ${config.subtitle}`}
            width={260}
            height={260}
            className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-6 md:px-8 pb-6 md:pb-8 pt-1 relative z-10">
        <div className="flex items-center gap-1.5 mb-2">
          <span style={{ color: config.color }}>{config.icon}</span>
          <span
            className="font-mono font-medium text-[9px] md:text-[10px] uppercase tracking-[0.05em]"
            style={{ color: config.color }}
          >
            {config.subtitle}
          </span>
        </div>

        <h3 className="font-heading font-bold text-lg md:text-2xl leading-[1.2] tracking-normal text-[var(--fg-primary)] mb-1.5">
          {product.name}
        </h3>

        <p className="font-body text-xs leading-[1.55] text-[var(--fg-secondary)] mb-5 line-clamp-3 flex-1">
          {t(config.descriptionKey)}
        </p>

        <Link
          href={`/${locale}/catalog/${product.slug}`}
          className="inline-flex items-center gap-1.5 font-body font-medium text-xs md:text-sm text-[var(--accent-primary)] transition-all duration-300 hover:gap-2.5 group/link"
        >
          {t("learnMore")}
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

export function ProductShowcase() {
  const t = useTranslations("products");
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.04] pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--accent-primary), transparent 70%)",
          filter: "blur(100px)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-8 md:mb-12 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-subtle)] mb-4"
            style={{ background: "oklch(1 0 0 / 0.04)", backdropFilter: "blur(12px)" }}
          >
            <Leaf className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span className="font-mono text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--accent-primary)]">
              Premium Products
            </span>
          </div>
          <h2 className="font-heading font-semibold text-xl leading-[1.1] text-[var(--fg-primary)] tracking-normal mb-2 md:mb-3 md:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="font-body text-sm md:text-base leading-[1.5] text-[var(--fg-secondary)] max-w-[32rem] mx-auto">
            {t("description")}
          </p>
          <div className="mt-4 mx-auto h-[2px] w-12 rounded-full bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-40" />
        </div>

        {/* Embla Carousel */}
        <div className="relative">
          {/* Navigation arrows — desktop only */}
          <button
            onClick={scrollPrev}
            aria-label="Previous slide"
            className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--fg-secondary)] transition-all duration-300 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:shadow-[var(--shadow-md)] embla-arrow-prev"
            style={{ background: "oklch(1 0 0 / 0.04)", backdropFilter: "blur(12px)" }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Next slide"
            className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--fg-secondary)] transition-all duration-300 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:shadow-[var(--shadow-md)] embla-arrow-next"
            style={{ background: "oklch(1 0 0 / 0.04)", backdropFilter: "blur(12px)" }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Embla viewport */}
          <div className="product-showcase-embla overflow-hidden mx-0 lg:mx-6" ref={emblaRef}>
            <div className="product-showcase-embla__container flex gap-4 md:gap-5">
              {showcaseProducts.map((product, index) => (
                <div
                  key={product.slug}
                  className="product-showcase-embla__slide flex-shrink-0 w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
                >
                  <SoftGlassCard product={product} index={index} />
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-6 md:mt-8">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: i === selectedIndex ? "var(--accent-primary)" : "oklch(1 0 0 / 0.15)",
                  transform: i === selectedIndex ? "scale(1.3)" : "scale(1)",
                  boxShadow: i === selectedIndex ? "0 0 8px oklch(0.72 0.19 148 / 0.4)" : "none",
                }}
              />
            ))}
          </div>

          {/* Mobile arrows */}
          <div className="flex lg:hidden items-center justify-center gap-3 mt-4">
            <button
              onClick={scrollPrev}
              aria-label="Previous slide"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--fg-secondary)] transition-all duration-300 active:scale-90"
              style={{ background: "oklch(1 0 0 / 0.04)" }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-mono text-[10px] text-[var(--fg-muted)] tabular-nums">
              {selectedIndex + 1} / {scrollSnaps.length}
            </span>
            <button
              onClick={scrollNext}
              aria-label="Next slide"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--fg-secondary)] transition-all duration-300 active:scale-90"
              style={{ background: "oklch(1 0 0 / 0.04)" }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
