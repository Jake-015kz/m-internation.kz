"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { Menu, Phone, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { SITE_CONFIG, CONTACTS } from "@/lib/constants";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useScroll, useNavLinks } from "@/hooks";
import styles from "./Header.module.scss";

export function Header() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const { isScrolled } = useScroll({ threshold: 50 });
  const navLinks = useNavLinks();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}
    >
      <div className={styles.container}>
        <Link href={`/${locale}`} className={styles.logo}>
          <span className={styles.logoText}>{SITE_CONFIG.name}</span>
          <span className={styles.logoDot} />
        </Link>

        <nav
          className={styles.nav}
          role="navigation"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          {/* Social icons — visible on lg+ */}
          <div className={styles.socialIcons}>
            <a
              href={CONTACTS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="Instagram"
            >
              <svg
                width="16"
                height="16"
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
              className={styles.socialIcon}
              aria-label="TikTok"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
          </div>

          <a
            href={`tel:${CONTACTS.phone}`}
            className={styles.phone}
            aria-label={CONTACTS.phone}
          >
            <Phone size={16} />
            <span>{CONTACTS.phone}</span>
          </a>

          <LanguageSwitcher />

          <ThemeSwitcher />

          {/* Кнопка "Контакты" — скрыта на мобилке, видна на md+ */}
          <Link href={`/${locale}/contacts`} className={styles.ctaButton}>
            {t("contacts")}
          </Link>

          <button
            className={styles.mobileMenuButton}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <nav className={styles.mobileNav}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileNavLink}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a href={`tel:${CONTACTS.phone}`} className={styles.mobilePhone}>
            <Phone size={18} />
            <span>{CONTACTS.phone}</span>
          </a>
          <Link
            href={`/${locale}/contacts`}
            className={styles.mobileNavLink}
            onClick={() => setIsMenuOpen(false)}
          >
            {t("contacts")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
