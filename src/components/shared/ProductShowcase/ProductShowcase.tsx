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
};

const showcaseProducts = products.filter((p) => SHOWCASE_CONFIG[p.slug]);

const features = [
  { key: "natural", icon: "leaf" },
  { key: "certified", icon: "shield" },
  { key: "tested", icon: "flask" },
];

export function ProductShowcase() {
  const locale = useLocale();
  const t = useTranslations("products");
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = prefersReducedMotion();

    if (!reduce && headerRef.current) {
      gsap.fromTo(headerRef.current, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6,
        ease: EASING.gentle as unknown as gsap.EaseFunction,
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
      });
    }

    if (reduce || !sectionRef.current || !trackRef.current) return;
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const slides = gsap.utils.toArray<HTMLElement>(".product-slide");
      const totalWidth = slides.reduce(
        (acc, slide) => acc + slide.offsetWidth + 24, 0,
      );
      const distance = totalWidth - window.innerWidth;

      if (distance <= 0) return;

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--bg-elevated)]"
    >
      {/* Header */}
      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 pt-10 md:pt-20 pb-6 md:pb-10">
        <div ref={headerRef} className="text-left max-w-[36rem]" style={{ opacity: 1 }}>
          <h2 className="font-heading font-semibold text-xl leading-[1.1] text-[var(--fg-primary)] tracking-[-0.01em] mb-2 md:mb-4 md:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="font-body text-sm md:text-base leading-[1.45] text-[var(--fg-muted)]">
            {t("description")}
          </p>
        </div>
      </div>

      {/* Product cards */}
      <div
        ref={trackRef}
        className="lg:flex lg:gap-6 px-4 md:px-6 lg:px-8 pb-10 md:pb-20 flex flex-col gap-6"
      >
        {showcaseProducts.map((product) => {
          const config = SHOWCASE_CONFIG[product.slug];
          if (!config) return null;
          return (
            <div
              key={product.slug}
              className="product-slide flex-shrink-0 w-full lg:w-[60vw]"
            >
              <div className="grid grid-cols-1 gap-5 items-center lg:grid-cols-2 lg:gap-12 card-clean rounded-[var(--radius-xl)] p-4 md:p-8">
                {/* Image */}
                <div className="flex justify-center items-center">
                  <div className="relative w-full max-w-[200px] md:max-w-[300px] lg:max-w-[350px]">
                    {/* Color glow behind product */}
                    <div
                      className="absolute inset-0 -m-8 rounded-full opacity-[0.08] blur-2xl"
                      style={{ background: config.color }}
                      aria-hidden="true"
                    />
                    <Image
                      src={product.images[0] ?? ""}
                      alt={`${product.name} — ${config.subtitle}`}
                      width={350}
                      height={350}
                      className="w-full h-auto object-contain relative z-10"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-2 md:gap-3 text-left">
                  <span
                    className="font-mono font-semibold text-[10px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.15em]"
                    style={{ color: config.color }}
                  >
                    {config.subtitle}
                  </span>

                  <h3 className="font-heading font-bold leading-[1.1] md:leading-[1.05] tracking-[-0.01em] md:tracking-[-0.03em] text-xl md:text-[clamp(1.5rem,3.5vw,2.5rem)] text-[var(--fg-primary)]">
                    {product.name}
                  </h3>

                  <p className="font-body text-sm md:text-base leading-[1.5] md:leading-[1.6] text-[var(--fg-secondary)] mt-0 md:mt-1 max-w-[400px]">
                    {t(config.descriptionKey)}
                  </p>

                  <div className="flex flex-col gap-1.5 md:gap-2 mt-2 md:mt-3">
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
                    className="inline-flex items-center gap-2 mt-3 md:mt-4 font-body font-medium text-xs md:text-sm text-[var(--accent-primary)] transition-all duration-250 hover:gap-3"
                  >
                    {t("learnMore")} →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
