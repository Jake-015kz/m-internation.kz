"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Send } from "lucide-react";
import { SITE_CONFIG, CONTACTS, CERTIFICATES } from "@/lib/constants";
import { useSubscription } from "@/hooks";

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const { email, setEmail, isSubscribed, handleSubscribe } = useSubscription();

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
    contacts: [
      {
        href: `tel:${CONTACTS.phone}`,
        label: CONTACTS.phone,
        isExternal: true,
      },
      {
        href: `mailto:${CONTACTS.email}`,
        label: CONTACTS.email,
        isExternal: true,
      },
      { href: `/${locale}/privacy`, label: t("privacy") },
      { href: `/${locale}/terms`, label: t("terms") },
    ],
  };

  return (
    <footer
      className="relative border-t border-[var(--border-subtle)] pt-12 pb-6 overflow-hidden bg-[var(--bg-base)] md:pt-20 md:pb-8"
      role="contentinfo"
    >
      {/* Massive Background Typography — desktop only */}
      <div
        className="absolute inset-0 items-center justify-center overflow-hidden pointer-events-none z-0 hidden md:flex"
        aria-hidden="true"
      >
        <span className="font-heading font-bold text-[clamp(5rem,15vw,15rem)] leading-none text-[var(--fg-primary)] opacity-[0.02] whitespace-nowrap uppercase tracking-[-0.04em]">
          {t("backgroundText")}
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8">
        {/* Subscription Section */}
        <div className="flex flex-col gap-4 pb-8 mb-8 border-b border-[var(--border-subtle)] lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:pb-12 lg:mb-12">
          <div className="flex-1">
            <h2 className="font-heading font-semibold text-lg leading-[1.1] mb-2 text-[var(--fg-primary)] md:text-2xl">
              {t("subscription.title")}
            </h2>
            <p className="text-sm text-[var(--fg-muted)] max-w-[30rem]">
              {t("subscription.description")}
            </p>
          </div>

          <form
            className="flex-shrink-0 w-full md:w-auto"
            onSubmit={handleSubscribe}
            aria-label="Newsletter subscription"
          >
            <div className="flex gap-0 bg-[var(--bg-surface)] border border-[var(--border)] p-1 rounded-lg">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("subscription.placeholder")}
                className="flex-1 min-w-0 px-3 py-3 bg-transparent border-none text-[var(--fg-primary)] font-body text-sm outline-none placeholder:text-[var(--fg-dim)] md:min-w-[240px] md:px-4 md:text-base"
                required
                aria-label="Email address"
              />
              <button
                type="submit"
                className="flex items-center justify-center px-4 py-3 bg-[var(--accent-primary)] text-[var(--bg-base)] border-none rounded-md text-base font-semibold cursor-pointer transition-all duration-250 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] flex-shrink-0"
                aria-label="Subscribe"
              >
                {isSubscribed ? "✓" : <Send size={18} />}
              </button>
            </div>
            {isSubscribed && (
              <p className="mt-2 text-sm text-[var(--success)]" role="alert">
                {t("subscription.success")}
              </p>
            )}
          </form>
        </div>

        {/* Links Grid */}
        <div className="flex flex-col gap-0 mb-8 md:grid md:grid-cols-2 md:gap-10 md:mb-12 lg:grid-cols-4 lg:gap-8">
          {/* Brand section */}
          <div className="pb-6 mb-6 border-b border-[var(--border-subtle)] md:max-w-[20rem] md:pb-0 md:mb-0 md:border-b-0">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 mb-3 no-underline"
              aria-label={`${SITE_CONFIG.name} - Home`}
            >
              <span className="font-heading font-bold text-lg text-[var(--fg-primary)] tracking-[-0.02em] uppercase">
                {SITE_CONFIG.name}
              </span>
              <span
                className="w-2 h-2 bg-[var(--accent-primary)] rounded-full shadow-[0_0_12px_oklch(0.82_0.22_135/0.5)]"
                aria-hidden="true"
              />
            </Link>
            <p className="text-sm text-[var(--fg-muted)] mb-4 leading-[1.625]">
              {SITE_CONFIG.description}
            </p>
            <div className="flex gap-3">
              <a
                href={CONTACTS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--fg-muted)] border border-[var(--border)] rounded-[0.375rem] transition-all duration-250 no-underline hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] hover:bg-[var(--bg-surface)] active:scale-[0.95]"
                aria-label="Instagram"
              >
                <svg
                  width="18"
                  height="18"
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
                <span>Instagram</span>
              </a>
              <a
                href={CONTACTS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--fg-muted)] border border-[var(--border)] rounded-[0.375rem] transition-all duration-250 no-underline hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] hover:bg-[var(--bg-surface)] active:scale-[0.95]"
                aria-label="TikTok"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
                <span>TikTok</span>
              </a>
            </div>
          </div>

          {/* Company links */}
          <div className="border-b border-[var(--border-subtle)] md:border-b-0">
            <span className="font-body font-semibold text-sm text-[var(--fg-primary)] uppercase tracking-[0.05em] block py-4 md:py-0 md:mb-2">
              {t("company")}
            </span>
            <div className="hidden flex-col gap-2 pb-4 md:flex md:pb-0">
              {footerLinks.company.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--fg-muted)] transition-colors duration-250 py-1 no-underline hover:text-[var(--accent-primary)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Catalog links */}
          <div className="border-b border-[var(--border-subtle)] md:border-b-0">
            <span className="font-body font-semibold text-sm text-[var(--fg-primary)] uppercase tracking-[0.05em] block py-4 md:py-0 md:mb-2">
              {t("catalog")}
            </span>
            <div className="hidden flex-col gap-2 pb-4 md:flex md:pb-0">
              {footerLinks.catalog.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--fg-muted)] transition-colors duration-250 py-1 no-underline hover:text-[var(--accent-primary)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact links */}
          <div className="border-b border-[var(--border-subtle)] md:border-b-0">
            <span className="font-body font-semibold text-sm text-[var(--fg-primary)] uppercase tracking-[0.05em] block py-4 md:py-0 md:mb-2">
              {t("contacts")}
            </span>
            <div className="hidden flex-col gap-2 pb-4 md:flex md:pb-0">
              {footerLinks.contacts.map((link) =>
                link.isExternal ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-[var(--fg-muted)] transition-colors duration-250 py-1 no-underline hover:text-[var(--accent-primary)]"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-[var(--fg-muted)] transition-colors duration-250 py-1 no-underline hover:text-[var(--accent-primary)]"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Certificates */}
        <div className="mb-6 py-4 border-t border-b border-[var(--border-subtle)] overflow-x-auto md:mb-8 md:py-6 md:overflow-x-visible">
          <div
            className="flex flex-nowrap gap-2 justify-start pr-4 md:flex-wrap md:gap-3 md:justify-center md:pr-0"
            role="list"
            aria-label="Certificates"
          >
            {CERTIFICATES.map((cert) => (
              <span
                key={cert.id}
                className="font-mono font-semibold text-xs text-[var(--fg-muted)] uppercase tracking-[0.12em] px-2 py-1 border border-[var(--border)] rounded-[0.375rem] whitespace-nowrap flex-shrink-0 md:px-3"
                role="listitem"
              >
                {cert.name}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-xs text-[var(--fg-dim)]">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
