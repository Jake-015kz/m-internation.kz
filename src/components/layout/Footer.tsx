"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Send } from "lucide-react";
import { SITE_CONFIG, CONTACTS, CERTIFICATES } from "@/lib/constants";
import { useSubscription } from "@/hooks";
import styles from "./Footer.module.scss";

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
    <footer className={styles.footer} role="contentinfo">
      {/* Massive Background Typography — desktop only */}
      <div className={styles.backgroundText} aria-hidden="true">
        <span>{t("backgroundText")}</span>
      </div>

      <div className={styles.container}>
        {/* Subscription Section */}
        <div className={styles.subscription}>
          <div className={styles.subscriptionContent}>
            <h2 className={styles.subscriptionTitle}>
              {t("subscription.title")}
            </h2>
            <p className={styles.subscriptionDescription}>
              {t("subscription.description")}
            </p>
          </div>

          <form
            className={styles.subscriptionForm}
            onSubmit={handleSubscribe}
            aria-label="Newsletter subscription"
          >
            <div className={styles.inputWrapper}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("subscription.placeholder")}
                className={styles.input}
                required
                aria-label="Email address"
              />
              <button
                type="submit"
                className={styles.submitButton}
                aria-label="Subscribe"
              >
                {isSubscribed ? "✓" : <Send size={18} />}
              </button>
            </div>
            {isSubscribed && (
              <p className={styles.successMessage} role="alert">
                {t("subscription.success")}
              </p>
            )}
          </form>
        </div>

        {/* Links Grid / Accordion */}
        <div className={styles.grid}>
          {/* Brand section — always visible */}
          <div className={styles.brand}>
            <Link
              href={`/${locale}`}
              className={styles.logo}
              aria-label={`${SITE_CONFIG.name} - Home`}
            >
              <span className={styles.logoText}>{SITE_CONFIG.name}</span>
              <span className={styles.logoDot} aria-hidden="true" />
            </Link>
            <p className={styles.description}>{SITE_CONFIG.description}</p>
            <div className={styles.social}>
              <a
                href={CONTACTS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
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
                className={styles.socialLink}
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

          {/* Company links — accordion on mobile */}
          <div className={styles.column}>
            <span className={styles.columnTitle}>{t("company")}</span>
            <div className={styles.columnLinks}>
              {footerLinks.company.map((link) => (
                <Link key={link.href} href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Catalog links — accordion on mobile */}
          <div className={styles.column}>
            <span className={styles.columnTitle}>{t("catalog")}</span>
            <div className={styles.columnLinks}>
              {footerLinks.catalog.map((link) => (
                <Link key={link.href} href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact links — accordion on mobile */}
          <div className={styles.column}>
            <span className={styles.columnTitle}>{t("contacts")}</span>
            <div className={styles.columnLinks}>
              {footerLinks.contacts.map((link) =>
                link.isExternal ? (
                  <a key={link.href} href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={styles.link}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Certificates — horizontal scroll on mobile */}
        <div className={styles.certificates}>
          <div
            className={styles.certificatesRow}
            role="list"
            aria-label="Certificates"
          >
            {CERTIFICATES.map((cert) => (
              <span
                key={cert.id}
                className={styles.certificate}
                role="listitem"
              >
                {cert.name}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
