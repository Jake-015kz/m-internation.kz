"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { SITE_CONFIG, CONTACTS } from "@/lib/constants";
import { SubscriptionForm } from "./SubscriptionForm";

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const footerLinks = {
    company: [
      { href: `/${locale}/about`, label: tNav("about") },
      { href: `/${locale}/business`, label: tNav("business") },
      { href: `/${locale}/contacts`, label: tNav("contacts") },
    ],
    catalog: [
      { href: `/${locale}/catalog`, label: t("allProducts") },
      { href: `/${locale}/catalog?category=detox`, label: t("detox") },
      { href: `/${locale}/catalog?category=immunity`, label: t("immunity") },
      { href: `/${locale}/catalog?category=nutrition`, label: t("nutrition") },
    ],
    legal: [
      { href: `/${locale}/privacy`, label: t("privacy") },
      { href: `/${locale}/terms`, label: t("terms") },
    ],
  };

  return (
    <footer
      className="relative border-t border-[var(--border-subtle)] pt-16 pb-8 md:pt-20 md:pb-10"
      style={{ background: "linear-gradient(180deg, var(--bg-elevated) 0%, var(--bg-base) 100%)" }}
      role="contentinfo"
    >
      {/* Gold top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, var(--accent-gold), transparent)", opacity: 0.3 }} />

      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8">
        {/* Top section */}
        <div className="flex flex-col gap-8 pb-10 mb-10 border-b border-[var(--border-subtle)] lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          {/* Brand */}
          <div className="flex-1 max-w-[22rem]">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 mb-4 no-underline"
              aria-label={`${SITE_CONFIG.name} - Home`}
            >
              <span className="font-heading font-semibold text-lg md:text-xl gold-shimmer-text">
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="text-xs md:text-sm text-[var(--fg-muted)] mb-4 md:mb-6 leading-[1.625]">
              {SITE_CONFIG.description}
            </p>
            <div className="flex gap-2">
              <a
                href={CONTACTS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 min-w-[40px] min-h-[40px] rounded-lg border border-[var(--border)] text-[var(--fg-muted)] transition-all duration-250 hover:text-[var(--accent-gold)] hover:border-[var(--accent-gold)] hover:shadow-[0_0_16px_oklch(0.82_0.10_88_/0.08)]"
                aria-label="Instagram"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href={CONTACTS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 min-w-[40px] min-h-[40px] rounded-lg border border-[var(--border)] text-[var(--fg-muted)] transition-all duration-250 hover:text-[var(--accent-gold)] hover:border-[var(--accent-gold)] hover:shadow-[0_0_16px_oklch(0.82_0.10_88_/0.08)]"
                aria-label="TikTok"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Subscription */}
          <SubscriptionForm />
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-8 mb-12 md:grid-cols-3 md:gap-12">
          <div>
            <span className="font-body font-semibold text-[10px] text-[var(--accent-gold)] uppercase tracking-[0.12em] block mb-5">
              {t("company")}
            </span>
            <div className="flex flex-col gap-3">
              {footerLinks.company.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--fg-muted)] transition-colors duration-250 hover:text-[var(--accent-gold)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <span className="font-body font-semibold text-[10px] text-[var(--accent-gold)] uppercase tracking-[0.12em] block mb-5">
              {t("catalog")}
            </span>
            <div className="flex flex-col gap-3">
              {footerLinks.catalog.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--fg-muted)] transition-colors duration-250 hover:text-[var(--accent-gold)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <span className="font-body font-semibold text-[10px] text-[var(--accent-gold)] uppercase tracking-[0.12em] block mb-5">
              {t("contacts")}
            </span>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${CONTACTS.email}`}
                className="text-sm text-[var(--fg-muted)] transition-colors duration-250 hover:text-[var(--accent-gold)]"
              >
                {CONTACTS.email}
              </a>
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--fg-muted)] transition-colors duration-250 hover:text-[var(--accent-gold)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-xs text-[var(--fg-dim)]">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
