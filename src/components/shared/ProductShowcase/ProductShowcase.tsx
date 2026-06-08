"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, EASING } from "@/lib/gsap-animations";
import { products } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

// Map product slugs to showcase display config
const SHOWCASE_CONFIG: Record<
  string,
  { subtitle: string; descriptionKey: string; color: string }
> = {
  greenmax: {
    subtitle: "Antioxidant & Detox",
    descriptionKey: "greenmax.description",
    color: "#5a9e3a",
  },
  blumax: {
    subtitle: "Immunity & Vitality",
    descriptionKey: "blumax.description",
    color: "#3a6ea5",
  },
  "ye-katerina": {
    subtitle: "Women's Health",
    descriptionKey: "yekaterina.description",
    color: "#8a4a7a",
  },
};

const showcaseProducts = products.filter((p) => SHOWCASE_CONFIG[p.slug]);

const features = [
  { key: "natural", icon: "leaf" },
  { key: "certified", icon: "shield" },
  { key: "tested", icon: "flask" },
];

export function ProductShowcase() {
  const t = useTranslations("products");
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = prefersReducedMotion();

    // Header fade-in
    if (!reduce && headerRef.current) {
      gsap.fromTo(headerRef.current, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6, ease: EASING.gentle as any,
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
      });
    }

    // Horizontal scroll — desktop only (lg+)
    if (reduce || !sectionRef.current || !trackRef.current) return;
    // Bail on small screens — horizontal scroll breaks on mobile
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const slides = gsap.utils.toArray<HTMLElement>(".product-slide");
      const totalWidth = slides.reduce(
        (acc, slide) => acc + slide.offsetWidth + 24,
        0,
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
      {/* Header — outside the pinned area */}
      <div className="mx-auto max-w-[80rem] px-3 md:px-6 lg:px-8 pt-12 md:pt-28 pb-8 md:pb-12">
        <div ref={headerRef} className="text-left" style={{ marginBottom: "2rem", opacity: 1 }}>
          <h2 className="font-heading font-semibold text-2xl leading-[1.1] text-[var(--bg-primary)] tracking-[-0.01em] md:tracking-[-0.02em] mb-3 md:mb-5 md:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
          <p className="font-body text-sm md:text-base leading-[1.45] text-[var(--fg-muted)] max-w-[32rem]">
            {t("description")}
          </p>
        </div>
      </div>

      {/* Mobile: vertical stack / Desktop: horizontal scroll */}
      <div
        ref={trackRef}
        className="lg:flex lg:gap-6 px-3 md:px-6 lg:px-8 pb-12 md:pb-28 flex flex-col gap-8"
      >
        {showcaseProducts.map((product) => {
          const config = SHOWCASE_CONFIG[product.slug];
          if (!config) return null;
          return (
            <div
              key={product.slug}
              className="product-slide flex-shrink-0 w-full lg:w-[60vw]"
            >
              <div className="grid grid-cols-1 gap-6 items-center lg:grid-cols-2 lg:gap-16">
                {/* Image */}
                <div className="flex justify-center items-center">
                  <div className="relative w-full max-w-[250px] md:max-w-[350px] lg:max-w-[400px]">
                    <Image
                      src={product.images[0] ?? ""}
                      alt={`${product.name} — ${config.subtitle}`}
                      width={400}
                      height={400}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-3 md:gap-4 text-left">
                  <span
                    className="font-mono font-semibold text-[10px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.15em]"
                    style={{ color: config.color }}
                  >
                    {config.subtitle}
                  </span>

                  <h3 className="font-heading font-bold leading-[1.1] md:leading-[1.05] tracking-[-0.01em] md:tracking-[-0.03em] text-2xl md:text-[clamp(2rem,4vw,3rem)] text-[var(--fg-primary)]">
                    {product.name}
                  </h3>

                  <p className="font-body text-sm md:text-base leading-[1.5] md:leading-[1.625] text-[var(--fg-secondary)] mt-0 md:mt-1 max-w-[400px]">
                    {t(config.descriptionKey)}
                  </p>

                  <div className="flex flex-col gap-2 md:gap-3 mt-2 md:mt-4">
                    {features.map((feature) => (
                      <div
                        key={feature.key}
                        className="flex items-center gap-2 md:gap-3 text-[var(--fg-primary)] font-body text-xs md:text-sm"
                      >
                        <span
                          className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full text-[10px] md:text-xs"
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
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
