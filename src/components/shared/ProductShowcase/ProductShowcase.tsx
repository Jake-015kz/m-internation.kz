"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Droplets, Leaf, Shield, Heart, Zap, Apple } from "lucide-react";
import { products } from "@/data/products";

const SHOWCASE_CONFIG: Record<
  string,
  { subtitle: string; descriptionKey: string; color: string; icon: React.ReactNode }
> = {
  micrystal: { subtitle: "Зрение", descriptionKey: "micrystal.description", color: "#b8942e", icon: <Droplets className="w-4 h-4" /> },
  greenmax: { subtitle: "Детокс", descriptionKey: "greenmax.description", color: "#4a8e30", icon: <Leaf className="w-4 h-4" /> },
  mimax: { subtitle: "Антиоксидант", descriptionKey: "mimax.description", color: "#c85020", icon: <Shield className="w-4 h-4" /> },
  blumax: { subtitle: "Иммунитет", descriptionKey: "blumax.description", color: "#2e7aa8", icon: <Heart className="w-4 h-4" /> },
  nutrimax: { subtitle: "Питание", descriptionKey: "nutrimax.description", color: "#6a8e30", icon: <Apple className="w-4 h-4" /> },
  fleximax: { subtitle: "Суставы", descriptionKey: "fleximax.description", color: "#a87e2e", icon: <Zap className="w-4 h-4" /> },
  machoman: { subtitle: "Мужское здоровье", descriptionKey: "machoman.description", color: "#7e3030", icon: <Shield className="w-4 h-4" /> },
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
  const [isVisible, setIsVisible] = useState(false);
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
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!config) return null;

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col h-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden transition-all duration-300 hover:border-[var(--accent-primary)]/15 hover:shadow-[var(--shadow-md)] hover:-translate-y-1"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`,
      }}
    >
      {/* Top accent line */}
      <div
        className="h-[2px] w-full opacity-60"
        style={{ background: `linear-gradient(90deg, transparent, ${config.color}, transparent)` }}
        aria-hidden="true"
      />

      {/* Product image area */}
      <div className="relative flex items-center justify-center p-5 md:p-7 pb-1" style={{ aspectRatio: "4 / 3" }}>
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 rounded-full blur-3xl"
          style={{ background: config.color }}
          aria-hidden="true"
        />

        <div className="relative w-full max-w-[130px] md:max-w-[170px]" style={{ aspectRatio: "1 / 1" }}>
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
      <div className="flex flex-col flex-1 px-4 md:px-5 pb-4 md:pb-5 pt-1">
        <div className="flex items-center gap-1.5 mb-2">
          <span style={{ color: config.color }}>{config.icon}</span>
          <span
            className="font-mono font-medium text-[9px] md:text-[10px] uppercase tracking-[0.05em]"
            style={{ color: config.color }}
          >
            {config.subtitle}
          </span>
        </div>

        <h3 className="font-heading font-bold text-sm md:text-lg leading-[1.2] tracking-normal text-[var(--fg-primary)] mb-1.5">
          {product.name}
        </h3>

        <p className="font-body text-xs leading-[1.55] text-[var(--fg-secondary)] mb-4 line-clamp-2 flex-1">
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
    <section className="relative py-14 md:py-22 overflow-hidden">
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] mb-4">
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

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {showcaseProducts.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
