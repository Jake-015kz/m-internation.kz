"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
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
    subtitle: "Health & Energy",
    descriptionKey: "micrystal.description",
    color: "#c4a035",
  },
  "ye-katerina": {
    subtitle: "Personal Care",
    descriptionKey: "yekaterina.description",
    color: "#8a4a7a",
  },
  greenmax: {
    subtitle: "Antioxidant & Detox",
    descriptionKey: "greenmax.description",
    color: "#5a9e3a",
  },
  mitown: {
    subtitle: "Lifestyle",
    descriptionKey: "mitown.description",
    color: "#4a90d9",
  },
  blumax: {
    subtitle: "Immunity",
    descriptionKey: "blumax.description",
    color: "#3a8ab5",
  },
  kordymax: {
    subtitle: "Cardio",
    descriptionKey: "kordymax.description",
    color: "#b53a3a",
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
      const tl = gsap.timeline({ defaults: { ease: EASING.gentle as unknown as gsap.EaseFunction } });
      if (imageRef.current) {
        tl.fromTo(imageRef.current, { opacity: 0, scale: 0.9, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.7 });
      }
      if (contentRef.current) {
        const children = contentRef.current.children;
        tl.fromTo(children, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, "-=0.4");
      }
    });

    return () => ctx.revert();
  }, [isActive]);

  if (!config) return null;

  return (
    <div className="grid grid-cols-1 gap-4 items-center lg:grid-cols-2 lg:gap-8 h-full">
      {/* Image */}
      <div ref={imageRef} className="flex justify-center items-center opacity-0">
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
      <div ref={contentRef} className="flex flex-col gap-2 md:gap-3 text-center lg:text-left">
        <span
          className="font-mono font-semibold text-[10px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.15em] opacity-0"
          style={{ color: config.color }}
        >
          {config.subtitle}
        </span>

        <h3 className="font-heading font-bold leading-[1.1] md:leading-[1.05] tracking-[-0.01em] md:tracking-[-0.03em] text-xl md:text-3xl lg:text-4xl text-[var(--fg-primary)] opacity-0">
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
  const [activeIndex, setActiveIndex] = useState(0);

  // Intersection observer for active slide
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleScroll = useCallback(() => {
    const viewportCenter = window.innerHeight / 2;
    let closest = 0;
    let closestDist = Infinity;

    slideRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const rect = ref.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const dist = Math.abs(center - viewportCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });

    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const reduce = prefersReducedMotion();

    if (!reduce && headerRef.current) {
      gsap.fromTo(headerRef.current, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6,
        ease: EASING.gentle as unknown as gsap.EaseFunction,
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--bg-elevated)]"
    >
      {/* Fixed header that stays above slides */}
      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 pt-10 md:pt-16 pb-4 md:pb-6">
        <div ref={headerRef} className="text-center lg:text-left max-w-[36rem]" style={{ opacity: 1 }}>
          <h2 className="font-heading font-semibold text-xl leading-[1.1] text-[var(--fg-primary)] tracking-[-0.01em] mb-2 md:mb-4 md:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="font-body text-sm md:text-base leading-[1.45] text-[var(--fg-muted)]">
            {t("description")}
          </p>
        </div>
      </div>

      {/* Full-screen snap slides */}
      <div>
        {showcaseProducts.map((product, index) => {
          const config = SHOWCASE_CONFIG[product.slug];
          return (
            <div
              key={product.slug}
              ref={(el) => { slideRefs.current[index] = el; }}
              className="min-h-[100dvh] flex items-center justify-center px-4 md:px-6 lg:px-8 py-8 md:py-12 relative"
              style={{
                background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${config?.color}08 0%, transparent 70%)`,
              }}
            >
              <div className="mx-auto max-w-[80rem] w-full">
                <SlideContent
                  product={product}
                  isActive={activeIndex === index}
                />
              </div>

              {/* Slide counter */}
              <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {showcaseProducts.map((_, i) => (
                  <div
                    key={i}
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      width: i === activeIndex ? "24px" : "8px",
                      backgroundColor: i === activeIndex
                        ? "var(--accent-primary)"
                        : "var(--border)",
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
