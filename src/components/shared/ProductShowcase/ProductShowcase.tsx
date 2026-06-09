"use client";

import { useRef, useEffect } from "react";
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

function ProductCard({
  product,
  index,
}: {
  product: (typeof showcaseProducts)[0];
  index: number;
}) {
  const locale = useLocale();
  const t = useTranslations("products");
  const config = SHOWCASE_CONFIG[product.slug];
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.08,
        ease: EASING.gentle as unknown as gsap.EaseFunction,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
        },
      }
    );
  }, [index]);

  if (!config) return null;

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col h-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[var(--border)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-[5px]"
    >
      {/* Color accent line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${config.color}, transparent)` }}
      />

      {/* Product image area */}
      <div className="relative flex items-center justify-center p-6 md:p-8 pb-2" style={{ aspectRatio: "4 / 3" }}>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 rounded-full blur-3xl" style={{ background: config.color }} aria-hidden="true" />

        <div className="relative w-full max-w-[140px] md:max-w-[180px]" style={{ aspectRatio: "1 / 1" }}>
          <Image
            src={product.images[0] ?? ""}
            alt={`${product.name} — ${config.subtitle}`}
            width={200}
            height={200}
            className="w-full h-full object-contain relative z-10 group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-5 md:px-6 pb-5 md:pb-6 pt-2">
        <span
          className="font-mono font-semibold text-[9px] md:text-[10px] uppercase tracking-[0.08em] mb-1.5"
          style={{ color: config.color }}
        >
          {config.subtitle}
        </span>

        <h3 className="font-heading font-bold text-base md:text-lg leading-[1.15] tracking-normal text-[var(--fg-primary)] mb-2">
          {product.name}
        </h3>

        <p className="font-body text-xs md:text-sm leading-[1.5] text-[var(--fg-secondary)] mb-4 line-clamp-3 flex-1">
          {t(config.descriptionKey)}
        </p>

        <Link
          href={`/${locale}/catalog/${product.slug}`}
          className="inline-flex items-center gap-1.5 font-body font-medium text-xs md:text-sm text-[var(--accent-primary)] transition-all duration-300 hover:gap-2.5 group/link"
        >
          {t("learnMore")}
          <span className="transition-transform duration-300 group-hover/link:translate-x-0.5">→</span>
        </Link>
      </div>
    </div>
  );
}

export function ProductShowcase() {
  const t = useTranslations("products");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

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
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-14 md:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-8 md:mb-14">
          <h2 className="font-heading font-semibold text-xl leading-[1.1] text-[var(--fg-primary)] tracking-normal mb-2 md:mb-4 md:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="font-body text-sm md:text-base leading-[1.45] text-[var(--fg-muted)] max-w-[32rem] mx-auto">
            {t("description")}
          </p>
          <div className="mt-4 mx-auto h-[1px] w-12 rounded-full bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
        </div>

        {/* Product grid — horizontal slider on mobile, grid on desktop */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3 scrollbar-hide snap-x snap-mandatory md:snap-none">
            {showcaseProducts.map((product, index) => (
              <div key={product.slug} className="flex-shrink-0 w-[80vw] max-w-[300px] md:w-auto md:max-w-none snap-center md:snap-align-none">
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>
          {/* Right fade hint on mobile */}
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-[var(--bg-base)] to-transparent md:hidden" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
