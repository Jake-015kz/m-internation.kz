"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, EASING } from "@/lib/gsap-animations";
import { products } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

const SHOWCASE_CONFIG: Record<
  string,
  { subtitle: string; descriptionKey: string; color: string }
> = {
  micrystal: {
    subtitle: "Зрение",
    descriptionKey: "micrystal.description",
    color: "#c4a035",
  },
  greenmax: {
    subtitle: "Детокс",
    descriptionKey: "greenmax.description",
    color: "#5a9e3a",
  },
  mimax: {
    subtitle: "Антиоксидант",
    descriptionKey: "mimax.description",
    color: "#d45a2a",
  },
  blumax: {
    subtitle: "Иммунитет",
    descriptionKey: "blumax.description",
    color: "#3a8ab5",
  },
  nutrimax: {
    subtitle: "Питание",
    descriptionKey: "nutrimax.description",
    color: "#7a9e3a",
  },
  fleximax: {
    subtitle: "Суставы",
    descriptionKey: "fleximax.description",
    color: "#b58a3a",
  },
  machoman: {
    subtitle: "Мужское здоровье",
    descriptionKey: "machoman.description",
    color: "#8a3a3a",
  },
};

const showcaseProducts = products.filter((p) => SHOWCASE_CONFIG[p.slug]);

const features = [
  { key: "natural", icon: "leaf" },
  { key: "certified", icon: "shield" },
  { key: "tested", icon: "flask" },
];

function SlideContent({
  product,
  isActive,
}: {
  product: (typeof showcaseProducts)[0];
  isActive: boolean;
}) {
  const locale = useLocale();
  const t = useTranslations("products");
  const config = SHOWCASE_CONFIG[product.slug];
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: EASING.gentle as unknown as gsap.EaseFunction,
        },
      });
      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.9, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.7 }
        );
      }
      if (contentRef.current) {
        const children = contentRef.current.children;
        tl.fromTo(
          children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          "-=0.4"
        );
      }
    });

    return () => ctx.revert();
  }, [isActive]);

  if (!config) return null;

  return (
    <div className="grid grid-cols-1 gap-4 items-center lg:grid-cols-2 lg:gap-8 h-full">
      {/* Image */}
      <div
        ref={imageRef}
        className="flex justify-center items-center opacity-0"
      >
        <div className="relative w-full max-w-[180px] sm:max-w-[240px] md:max-w-[300px] lg:max-w-[380px]">
          {/* Color glow behind product */}
          <div
            className="absolute inset-0 -m-8 rounded-full opacity-[0.1] blur-3xl"
            style={{ background: config.color }}
            aria-hidden="true"
          />
          <Image
            src={product.images[0] ?? ""}
            alt={`${product.name} — ${config.subtitle}`}
            width={380}
            height={380}
            className="w-full h-auto object-contain relative z-10"
          />
          {/* Shadow under product */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-[var(--fg-primary)] opacity-[0.06] blur-xl rounded-full z-0"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Info */}
      <div
        ref={contentRef}
        className="flex flex-col gap-2 md:gap-3 text-center lg:text-left"
      >
        <span
          className="font-mono font-semibold text-[10px] md:text-xs uppercase tracking-[0.08em] opacity-0"
          style={{ color: config.color }}
        >
          {config.subtitle}
        </span>

        <h3 className="font-heading font-bold leading-[1.1] tracking-normal text-xl md:text-3xl lg:text-4xl text-[var(--fg-primary)] opacity-0">
          {product.name}
        </h3>

        <p className="font-body text-sm md:text-base leading-[1.5] md:leading-[1.6] text-[var(--fg-secondary)] mt-0 md:mt-1 max-w-[400px] mx-auto lg:mx-0 opacity-0">
          {t(config.descriptionKey)}
        </p>

        <div className="flex flex-col gap-1.5 md:gap-2 mt-2 md:mt-3 items-center lg:items-start opacity-0">
          {features.map((feature) => (
            <div
              key={feature.key}
              className="flex items-center gap-2 md:gap-3 text-[var(--fg-primary)] font-body text-xs md:text-sm"
            >
              <span
                className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full text-[10px] md:text-xs flex-shrink-0"
                style={{
                  backgroundColor: `${config.color}18`,
                  color: config.color,
                }}
              >
                ✓
              </span>
              <span>{t(`features.${feature.key}`)}</span>
            </div>
          ))}
        </div>

        <Link
          href={`/${locale}/catalog/${product.slug}`}
          className="inline-flex items-center gap-2 mt-3 md:mt-4 font-body font-medium text-xs md:text-sm text-[var(--accent-primary)] transition-all duration-250 hover:gap-3 opacity-0"
        >
          {t("learnMore")} →
        </Link>
      </div>
    </div>
  );
}

export function ProductShowcase() {
  const t = useTranslations("products");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, showcaseProducts.length - 1));
    setActiveIndex(clamped);
    if (trackRef.current) {
      const slideWidth = trackRef.current.scrollWidth / showcaseProducts.length;
      trackRef.current.scrollTo({
        left: slideWidth * clamped,
        behavior: "smooth",
      });
    }
  }, []);

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  // Update active index on scroll
  const handleScroll = useCallback(() => {
    if (!trackRef.current) return;
    const slideWidth = trackRef.current.scrollWidth / showcaseProducts.length;
    const index = Math.round(trackRef.current.scrollLeft / slideWidth);
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const reduce = prefersReducedMotion();

    if (!reduce && headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: EASING.gentle as unknown as gsap.EaseFunction,
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        }
      );
    }

    // Resize listener for GSAP ScrollTrigger refresh
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--bg-elevated)] overflow-hidden"
    >
      {/* Decorative background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 60% at 30% 50%, ${SHOWCASE_CONFIG[showcaseProducts[activeIndex]?.slug]?.color || "var(--accent-primary)"} 0%, transparent 70%)`,
          transition: "background 600ms ease",
        }}
      />

      {/* Header */}
      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 pt-10 md:pt-16 pb-4 md:pb-6 relative z-10">
        <div
          ref={headerRef}
          className="text-center lg:text-left max-w-[36rem]"
          style={{ opacity: 1 }}
        >
          <h2 className="font-heading font-semibold text-xl leading-[1.1] text-[var(--fg-primary)] tracking-normal mb-2 md:mb-4 md:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="font-body text-sm md:text-base leading-[1.45] text-[var(--fg-muted)]">
            {t("description")}
          </p>
        </div>
      </div>

      {/* Horizontal slider */}
      <div className="relative z-10">
        <div
          ref={trackRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {showcaseProducts.map((product, index) => {
            const config = SHOWCASE_CONFIG[product.slug];
            return (
              <div
                key={product.slug}
                className="flex-shrink-0 w-full snap-start flex items-center justify-center px-4 md:px-6 lg:px-8 py-6 md:py-10"
              >
                <div className="mx-auto max-w-[80rem] w-full">
                  <SlideContent
                    product={product}
                    isActive={activeIndex === index}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 pb-8 md:pb-12">
          <button
            onClick={goPrev}
            disabled={activeIndex === 0}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-[var(--border)] text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] hover:border-[var(--accent-primary)] transition-all duration-250 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Предыдущий"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-1.5">
            {showcaseProducts.map((_, i) => (
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
            disabled={activeIndex === showcaseProducts.length - 1}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-[var(--border)] text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] hover:border-[var(--accent-primary)] transition-all duration-250 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Следующий"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
