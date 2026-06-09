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
        "transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isScrolled ? [
          "bg-[var(--bg-base)]/95 backdrop-blur-[12px] saturate-[140%]",
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
              className="font-body font-medium text-sm text-[var(--fg-secondary)] tracking-[0.01em] transition-colors duration-250 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[var(--accent-primary)] after:transition-[width] after:duration-300 after:rounded-full hover:text-[var(--fg-primary)] hover:after:w-full"
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
            className="hidden md:inline-flex items-center justify-center bg-[var(--accent-primary)] text-[var(--bg-base)] font-body font-medium text-sm px-4 py-2 min-h-[44px] rounded-[0.5rem] transition-[color,background-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[var(--shadow-glow-subtle)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[var(--shadow-md)] hover:scale-[1.02] active:scale-[0.98]"
          >
            {t("contacts")}
          </Link>

          {/* Mobile menu button */}
          <button
            className="flex md:hidden items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] text-[var(--fg-primary)] rounded-[0.5rem] transition-colors duration-250 hover:text-[var(--accent-primary)] hover:bg-[var(--bg-surface)]"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu — only render when open to reduce DOM size */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-0 z-[299] bg-[var(--bg-base)] transition-opacity duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden"
        >
          <nav className="flex flex-col h-full pt-20 px-6 pb-8 overflow-y-auto">
            <div className="flex flex-col gap-1 flex-1">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-heading font-semibold text-2xl text-[var(--fg-primary)] py-3 transition-[opacity,transform] duration-300 border-b border-[var(--border-subtle)] opacity-100 translate-x-0"
                  style={{ transitionDelay: `${i * 60}ms` }}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div
              className="pt-6 transition-[opacity,transform] duration-300 opacity-100 translate-y-0"
              style={{ transitionDelay: "300ms" }}
            >
              <Link
                href={`/${locale}/contacts`}
                className="inline-flex items-center justify-center bg-[var(--accent-primary)] text-[var(--bg-base)] font-body font-semibold text-base px-6 py-3.5 rounded-[0.5rem] w-full shadow-[var(--shadow-glow-subtle)]"
                onClick={closeMenu}
              >
                {t("contacts")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
