"use client";

import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[300]",
        "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isScrolled ? [
          "bg-[var(--bg-base)]/95 backdrop-blur-[16px] saturate-[150%]",
          "border-b border-[var(--border-subtle)]",
          "shadow-[var(--shadow-sm)]",
        ] : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 no-underline z-[301] relative"
        >
          <span className="font-heading font-bold text-base md:text-lg text-[var(--fg-primary)] tracking-normal">
            {SITE_CONFIG.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-8"
          role="navigation"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body font-medium text-sm text-[var(--fg-secondary)] tracking-[0.01em] transition-colors duration-250 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[var(--accent-primary)] after:transition-all after:duration-300 after:rounded-full hover:text-[var(--fg-primary)] hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-1.5 md:gap-2">
          <LanguageSwitcher />
          <ThemeSwitcher />

          {/* CTA — desktop only */}
          <Link
            href={`/${locale}/contacts`}
            className="hidden md:inline-flex items-center justify-center bg-[var(--accent-primary)] text-[var(--bg-base)] font-body font-medium text-sm px-4 py-2 min-h-[44px] rounded-[var(--radius-sm)] transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[var(--accent-primary-hover)] hover:scale-[1.02] active:scale-[0.95]"
          >
            {t("contacts")}
          </Link>

          {/* Mobile menu button */}
          <button
            className="flex md:hidden items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] text-[var(--fg-primary)] rounded-[var(--radius-sm)] transition-all duration-250 hover:text-[var(--accent-primary)] hover:bg-[var(--bg-surface)]"
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
          "fixed inset-0 top-0 z-[299] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden",
          "bg-[var(--bg-base)]",
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        aria-hidden={!isMenuOpen}
      >
        <nav className="flex flex-col h-full pt-20 px-6 pb-8 overflow-y-auto">
          <div className="flex flex-col gap-1 flex-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-heading font-semibold text-2xl text-[var(--fg-primary)] py-3 transition-all duration-300 border-b border-[var(--border-subtle)]",
                  isMenuOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4",
                )}
                style={{ transitionDelay: isMenuOpen ? `${i * 60}ms` : "0ms" }}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div
            className={cn(
              "pt-6 transition-all duration-300",
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4",
            )}
            style={{ transitionDelay: isMenuOpen ? "300ms" : "0ms" }}
          >
            <Link
              href={`/${locale}/contacts`}
              className="inline-flex items-center justify-center bg-[var(--accent-primary)] text-[var(--bg-base)] font-body font-semibold text-base px-6 py-3.5 rounded-[var(--radius-sm)] w-full shadow-[var(--shadow-glow)]"
              onClick={closeMenu}
            >
              {t("contacts")}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
