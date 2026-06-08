"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { SITE_CONFIG } from "@/lib/constants";
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
        "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "border-b border-transparent",
        isScrolled && [
          "border-b border-[var(--border-subtle)]",
          "bg-[var(--header-bg-scrolled-from)]",
          "backdrop-blur-[16px] saturate-[150%]",
          "shadow-[var(--header-shadow)]",
        ],
        !isScrolled && ["bg-[var(--header-bg-from)]", "backdrop-blur-[12px]"],
      )}
    >
      <div className="mx-auto max-w-[80rem] px-3 md:px-6 lg:px-8 h-14 md:h-[4.5rem] flex items-center justify-between">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 text-decoration-none"
        >
          <span className="font-heading font-semibold text-lg md:text-xl text-[var(--fg-primary)] tracking-[-0.02em]">
            {SITE_CONFIG.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-8"
          role="navigation"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body font-medium text-sm text-[var(--fg-secondary)] tracking-[0.01em] transition-colors duration-250 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[var(--accent-primary)] after:transition-all after:duration-300 hover:text-[var(--fg-primary)] hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 md:gap-3">
          <LanguageSwitcher />
          <ThemeSwitcher />

          {/* CTA — desktop only */}
          <Link
            href={`/${locale}/contacts`}
            className="hidden md:inline-flex items-center justify-center bg-[var(--accent-primary)] text-white font-body font-medium text-sm px-5 py-2 rounded-[var(--radius-sm)] transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[var(--accent-primary-hover)] hover:scale-[1.02] active:scale-[0.95]"
          >
            {t("contacts")}
          </Link>

          {/* Mobile menu button */}
          <button
            className="flex md:hidden items-center justify-center w-10 h-10 text-[var(--fg-primary)] border border-[var(--border)] rounded-[var(--radius-sm)] transition-all duration-250 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu — full screen overlay */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 top-[3.5rem] z-[299] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden",
          "bg-[var(--bg-base)] backdrop-blur-[20px]",
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        aria-hidden={!isMenuOpen}
      >
        <nav className="flex flex-col px-6 py-8 gap-2">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-heading font-medium text-2xl text-[var(--fg-primary)] py-3 transition-all duration-300",
                isMenuOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4",
              )}
              style={{ transitionDelay: isMenuOpen ? `${i * 50}ms` : "0ms" }}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div
            className={cn(
              "mt-6 pt-6 border-t border-[var(--border-subtle)] transition-all duration-300",
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4",
            )}
            style={{ transitionDelay: isMenuOpen ? "250ms" : "0ms" }}
          >
            <Link
              href={`/${locale}/contacts`}
              className="inline-flex items-center justify-center bg-[var(--accent-primary)] text-white font-body font-medium text-base px-6 py-3 rounded-[var(--radius-sm)] w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("contacts")}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
