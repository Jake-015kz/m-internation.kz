"use client";

import { useRef, type RefObject } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function useLetterReveal(
  refs: RefObject<HTMLElement | null>[],
  trigger: RefObject<HTMLElement | null>,
) {
  useGSAP(() => {
    const elements = refs.filter((r) => r.current);
    if (!elements.length || !trigger.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger.current,
        start: "top 80%",
        once: true,
      },
    });

    elements.forEach((el) => {
      const text = el.current!.textContent || "";
      el.current!.textContent = "";
      const words = text.split(" ");

      words.forEach((word, i) => {
        const span = document.createElement("span");
        span.className = "inline-block overflow-hidden";
        const inner = document.createElement("span");
        inner.className = "inline-block";
        inner.textContent = word;
        span.appendChild(inner);
        el.current!.appendChild(span);

        if (i < words.length - 1) {
          el.current!.appendChild(document.createTextNode(" "));
        }

        tl.from(
          inner,
          {
            yPercent: 100,
            duration: 0.6,
            ease: "power3.out",
          },
          i * 0.08,
        );
      });
    });

    return () => {
      tl.kill();
    };
  }, refs);
}

export function HeroSection() {
  const locale = useLocale();
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  useLetterReveal(
    [titleRef, descriptionRef],
    sectionRef,
  );

  useGSAP(() => {
    if (mounted.current) return;
    mounted.current = true;

    const tl = gsap.timeline({
      defaults: { duration: 0.7, ease: "power2.out" },
    });

    tl.from(labelRef.current, { autoAlpha: 0, y: 16, duration: 0.5 })
      .from(actionsRef.current, { autoAlpha: 0, y: 16, duration: 0.5 }, "-=0.2")
      .from(productRef.current, { autoAlpha: 0, y: 40, duration: 0.8 }, "-=0.3")
      .from(trustRef.current, { autoAlpha: 0, y: 12, duration: 0.4 }, "-=0.4");

    // Parallax on product image during scroll
    if (productRef.current && sectionRef.current) {
      gsap.to(productRef.current, {
        y: -60,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    return () => {
      tl.kill();
    };
  }, [mounted]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen md:min-h-[100dvh] flex items-center pt-16 pb-8 md:pt-24 md:pb-16 overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="mx-auto max-w-[80rem] px-3 md:px-6 lg:px-8 w-full relative z-2">
        <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-5 lg:gap-16">
          {/* Left — Text (60%) */}
          <div className="lg:col-span-3 text-left">
            <span
              ref={labelRef}
              className="inline-block mb-4 md:mb-6 font-mono font-semibold text-[10px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.15em] text-[var(--accent-primary)]"
            >
              {t("label")}
            </span>

            <h1
              ref={titleRef}
              id="hero-title"
              className="font-heading font-semibold tracking-[-0.01em] md:tracking-[-0.03em] mb-4 md:mb-6 display-l break-words"
            >
              {t("title")}
            </h1>

            <p
              ref={descriptionRef}
              className="font-body text-sm md:text-lg leading-[1.5] md:leading-[1.625] max-w-[28rem] mb-6 md:mb-8 text-[var(--fg-secondary)]"
            >
              {t("subtitle")}
            </p>

            <div ref={actionsRef} className="flex flex-wrap gap-3 md:gap-4">
              <Link
                href={`/${locale}/catalog`}
                className="inline-flex items-center justify-center bg-[var(--accent-primary)] text-white font-body font-medium text-sm md:text-base px-6 py-3 md:px-8 md:py-4 rounded-[var(--radius-sm)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[var(--shadow-md)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[var(--shadow-lg)] hover:scale-[1.02] active:scale-[0.98]"
              >
                {t("cta")}
              </Link>
            </div>
          </div>

          {/* Right — Product (40%) */}
          <div
            ref={productRef}
            className="lg:col-span-2 relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-[280px] md:max-w-[380px] lg:max-w-[420px]">
              <Image
                src="/products/greenmax/main.png"
                alt="GreenMAX — flagship product of M-International"
                width={420}
                height={420}
                priority
                className="w-full h-auto object-contain relative z-2"
              />
              {/* Subtle shadow under product */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-6 md:h-8 bg-[var(--fg-primary)] opacity-[0.06] blur-xl md:blur-2xl rounded-full z-1"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Trust line */}
        <div
          ref={trustRef}
          className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-[var(--border-subtle)]"
        >
          <p className="font-mono text-[10px] md:text-xs text-[var(--fg-muted)] tracking-[0.05em]">
            Trusted by 10,000+ customers across 50 countries
          </p>
        </div>
      </div>
    </section>
  );
}
