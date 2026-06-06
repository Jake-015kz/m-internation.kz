"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { Menu, Phone, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { SITE_CONFIG, CONTACTS } from "@/lib/constants";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useScroll, useNavLinks } from "@/hooks";
import { cn } from "@/lib/utils";

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
      className={cn(
        "fixed top-0 left-0 right-0 z-[300]",
        "transition-all duration-[250ms] cubic-bezier(0.4, 0, 0.2, 1)",
        "border-b border-transparent",
        // Dark theme background
        "bg-[linear-gradient(180deg,oklch(0.08_0.015_265/.8)_0%,oklch(0.08_0.015_265/.4)_100%)]",
        "backdrop-blur-[12px] saturate-[150%]",
        "[data-theme='light']_&:bg-[linear-gradient(180deg,oklch(0.97_0.005_90/.85)_0%,oklch(0.97_0.005_90/.6)_100%)]",
        // Scrolled state
        isScrolled && [
          "border-b border-[var(--border-subtle)]",
          "bg-[linear-gradient(180deg,oklch(0.08_0.015_265/.95)_0%,oklch(0.08_0.015_265/.85)_100%)]",
          "backdrop-blur-[20px] saturate-[180%]",
          "shadow-[0_4px_32px_oklch(0_0_0/.3)]",
          "[data-theme='light']_&:bg-[linear-gradient(180deg,oklch(0.97_0.005_90/.95)_0%,oklch(0.97_0.005_90/.9)_100%)]",
          "[data-theme='light']_&:shadow-[0_4px_20px_oklch(0_0_0/.08)]",
        ],
      )}
    >
      <div className="container mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 h-16 md:h-[4.5rem] flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 text-decoration-none"
        >
          <span className="font-heading font-600 text-lg md:text-xl text-[var(--fg-primary)] tracking-[-0.02em]">
            {SITE_CONFIG.name}
          </span>
          <span className="w-2 h-2 bg-[var(--accent-primary)] rounded-full shadow-[0_0_12px_oklch(0.82_0.22_135/.5)]" />
        </Link>

        <nav
          className="hidden md:flex items-center gap-8"
          role="navigation"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body font-500 text-sm text-[var(--fg-muted)] tracking-[0.02em] transition-colors duration-[250ms] relative
                after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-[var(--accent-primary)] after:transition-all after:duration-[250ms] after:shadow-[0_0_8px_oklch(0.82_0.22_135/.4)]
                hover:text-[var(--fg-primary)] hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          {/* Social icons — visible on lg+ */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href={CONTACTS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-[0.375rem] border border-[var(--border)] text-[var(--fg-muted)] bg-[var(--bg-surface)] transition-all duration-[250ms] cubic-bezier(0.16, 1, 0.3, 1) relative overflow-hidden
                before:content-[''] before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-[250ms] before:bg-[linear-gradient(135deg,var(--social-instagram),var(--social-instagram-hover))]
                hover:border-transparent hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_oklch(0_0_0/.2)] hover:before:opacity-100
                last:before:bg-[linear-gradient(135deg,var(--social-tiktok),var(--social-tiktok-hover),#fe2c55)]
                [data-theme='light']_&:bg-[var(--bg-elevated)] [data-theme='light']_&:hover:shadow-[0_4px_12px_oklch(0_0_0/.15)]"
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
                className="relative z-10 transition-all duration-[250ms] hover:scale-110"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" />
              </svg>
            </a>
            <a
              href={CONTACTS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-[0.375rem] border border-[var(--border)] text-[var(--fg-muted)] bg-[var(--bg-surface)] transition-all duration-[250ms] cubic-bezier(0.16, 1, 0.3, 1) relative overflow-hidden
                before:content-[''] before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-[250ms] before:bg-[linear-gradient(135deg,var(--social-tiktok),var(--social-tiktok-hover),#fe2c55)]
                hover:border-transparent hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_oklch(0_0_0/.2)] hover:before:opacity-100
                [data-theme='light']_&:bg-[var(--bg-elevated)] [data-theme='light']_&:hover:shadow-[0_4px_12px_oklch(0_0_0/.15)]"
              aria-label="TikTok"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="relative z-10 transition-all duration-[250ms] hover:scale-110"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
          </div>

          <a
            href={`tel:${CONTACTS.phone}`}
            className="hidden lg:flex items-center gap-2 font-mono font-500 text-sm text-[var(--fg-primary)] whitespace-nowrap"
            aria-label={CONTACTS.phone}
          >
            <Phone size={16} />
            <span>{CONTACTS.phone}</span>
          </a>

          <LanguageSwitcher />

          <ThemeSwitcher />

          {/* Кнопка "Контакты" — скрыта на мобилке, видна на md+ */}
          <Link
            href={`/${locale}/contacts`}
            className="hidden md:inline-flex items-center justify-center bg-[var(--accent-primary)] text-[var(--bg-base)] font-600 text-xs md:text-sm px-2 md:px-6 py-2 rounded-[0.375rem] hover:opacity-90 transition-all duration-[250ms] cubic-bezier(0.34, 1.56, 0.64, 1) hover:scale-105 active:scale-95"
          >
            {t("contacts")}
          </Link>

          <button
            className="flex md:hidden items-center justify-center w-10 h-10 text-[var(--fg-primary)] border border-[var(--border)] rounded-[0.375rem] transition-all duration-[250ms] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
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
        className={cn(
          "max-h-0 opacity-0 overflow-hidden transition-[max-height,opacity] duration-[400ms] cubic-bezier(0.34, 1.56, 0.64, 1) ease-out",
          "bg-[linear-gradient(135deg,oklch(0.12_0.02_265/.95)_0%,oklch(0.1_0.015_265/.98)_100%)]",
          "backdrop-blur-[20px] saturate-[180%]",
          "border-b border-transparent",
          "[data-theme='light']_&:bg-[linear-gradient(135deg,oklch(0.95_0.008_90/.95)_0%,oklch(0.97_0.005_90/.98)_100%)]",
          isMenuOpen &&
            "max-h-[500px] opacity-100 border-b border-[var(--border-subtle)]",
          "md:!hidden",
        )}
        aria-hidden={!isMenuOpen}
      >
        <nav className="flex flex-col gap-0 px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body font-500 text-base text-[var(--fg-primary)] py-4 border-b border-[var(--border-subtle)] transition-colors duration-[250ms] hover:text-[var(--accent-primary)]"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`tel:${CONTACTS.phone}`}
            className="font-mono font-500 text-base text-[var(--accent-primary)] py-4 flex items-center gap-2"
          >
            <Phone size={18} />
            <span>{CONTACTS.phone}</span>
          </a>
          <Link
            href={`/${locale}/contacts`}
            className="font-body font-500 text-base text-[var(--fg-primary)] py-4 border-b border-[var(--border-subtle)] transition-colors duration-[250ms] hover:text-[var(--accent-primary)]"
            onClick={() => setIsMenuOpen(false)}
          >
            {t("contacts")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
