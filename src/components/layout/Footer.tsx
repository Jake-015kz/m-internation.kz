"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Send } from "lucide-react";
import { SITE_CONFIG, CONTACTS } from "@/lib/constants";
import { useSubscription } from "@/hooks";

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const { email, setEmail, isSubscribed, error, handleSubscribe } =
    useSubscription();

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
      className="relative border-t border-[var(--border-subtle)] pt-12 pb-6 bg-[var(--bg-elevated)] md:pt-16 md:pb-8"
      role="contentinfo"
    >
      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8">
        {/* Top section: Brand + Subscription */}
        <div className="flex flex-col gap-6 pb-8 mb-8 border-b border-[var(--border-subtle)] lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          {/* Brand */}
          <div className="flex-1 max-w-[20rem]">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 mb-3 no-underline"
              aria-label={`${SITE_CONFIG.name} - Home`}
            >
              <span className="font-heading font-semibold text-base md:text-lg text-[var(--fg-primary)] tracking-normal">
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="text-xs md:text-sm text-[var(--fg-muted)] mb-3 md:mb-4 leading-[1.625]">
              {SITE_CONFIG.description}
            </p>
            <div className="flex gap-2">
              <a
                href={CONTACTS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-[var(--radius-sm)] border border-[var(--border)] text-[var(--fg-muted)] transition-all duration-250 hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)]"
                aria-label="Instagram"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href={CONTACTS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-[var(--radius-sm)] border border-[var(--border)] text-[var(--fg-muted)] transition-all duration-250 hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)]"
                aria-label="TikTok"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Subscription */}
          <div className="flex-1 max-w-[28rem]">
            <h3 className="font-heading font-semibold text-sm md:text-base text-[var(--fg-primary)] mb-1.5 md:mb-2">
              {t("subscription.title")}
            </h3>
            <p className="text-xs md:text-sm text-[var(--fg-muted)] mb-3 md:mb-4">
              {t("subscription.description")}
            </p>
            <form
              className="flex gap-0"
              onSubmit={handleSubscribe}
              aria-label="Newsletter subscription"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("subscription.placeholder")}
                className="flex-1 min-w-0 px-3 md:px-4 py-2.5 md:py-3 bg-[var(--bg-surface)] border border-[var(--border)] rounded-l-[var(--radius-sm)] text-[var(--fg-primary)] font-body text-xs md:text-sm outline-none placeholder:text-[var(--fg-dim)] focus:border-[var(--accent-primary)] transition-colors duration-250"
                required
                aria-label="Email address"
              />
              <button
                type="submit"
                className="flex items-center justify-center px-3 md:px-4 py-2.5 md:py-3 min-h-[44px] bg-[var(--accent-primary)] text-[var(--bg-base)] border-none rounded-r-[var(--radius-sm)] cursor-pointer transition-all duration-250 hover:bg-[var(--accent-primary-hover)] flex-shrink-0"
                aria-label="Subscribe"
              >
                {isSubscribed ? "✓" : <Send size={14} />}
              </button>
            </form>
            {isSubscribed && (
              <p className="mt-2 text-sm text-[var(--success)]" role="alert">
                {t("subscription.success")}
              </p>
            )}
            {error && (
              <p className="mt-2 text-sm text-[var(--error)]" role="alert">
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-8 mb-10 md:grid-cols-3 md:gap-12">
          {/* Company */}
          <div>
            <span className="font-body font-semibold text-xs text-[var(--fg-primary)] uppercase tracking-[0.08em] block mb-4">
              {t("company")}
            </span>
            <div className="flex flex-col gap-3">
              {footerLinks.company.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--fg-muted)] transition-colors duration-250 hover:text-[var(--accent-primary)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Catalog */}
          <div>
            <span className="font-body font-semibold text-xs text-[var(--fg-primary)] uppercase tracking-[0.08em] block mb-4">
              {t("catalog")}
            </span>
            <div className="flex flex-col gap-3">
              {footerLinks.catalog.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--fg-muted)] transition-colors duration-250 hover:text-[var(--accent-primary)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <span className="font-body font-semibold text-xs text-[var(--fg-primary)] uppercase tracking-[0.08em] block mb-4">
              {t("contacts")}
            </span>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${CONTACTS.email}`}
                className="text-sm text-[var(--fg-muted)] transition-colors duration-250 hover:text-[var(--accent-primary)]"
              >
                {CONTACTS.email}
              </a>
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--fg-muted)] transition-colors duration-250 hover:text-[var(--accent-primary)]"
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
