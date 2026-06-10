"use client";

import Link from "next/link";
import { useState, useCallback, useEffect, createContext, useContext, useRef } from "react";
import { Menu, X, Leaf } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { SITE_CONFIG } from "@/lib/constants";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useScroll, useNavLinks } from "@/hooks";
import { cn } from "@/lib/utils";

interface MobileMenuContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const MobileMenuContext = createContext<MobileMenuContextValue | null>(null);

export function useMobileMenu() {
  const ctx = useContext(MobileMenuContext);
  if (!ctx) throw new Error("useMobileMenu must be used within MobileMenuProvider");
  return ctx;
}

export function MobileMenuProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((p) => !p), []);

  return (
    <MobileMenuContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </MobileMenuContext.Provider>
  );
}

export function MobileMenu() {
  const { isOpen, close } = useMobileMenu();
  const locale = useLocale();
  const t = useTranslations("nav");
  const navLinks = useNavLinks();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !menuRef.current) return;
    const focusable = menuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const timer = setTimeout(() => first.focus(), 50);
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleTab);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleTab);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-[9999] bg-[var(--bg-base)] md:hidden"
      style={{ position: "fixed", top: 0, right: 0, bottom: 0, left: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      id="mobile-menu"
    >
      <div className="absolute inset-0" onClick={close} aria-hidden="true" />
      <nav
        className="relative flex flex-col h-full pt-20 px-6 pb-8 overflow-y-auto overscroll-contain"
        style={{ touchAction: "auto" }}
        aria-label="Mobile navigation"
      >
        <button
          className="absolute top-4 right-4 flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] text-[var(--fg-primary)] rounded-lg transition-colors duration-250 hover:text-[var(--accent-gold)] hover:bg-[var(--bg-surface)] z-10"
          onClick={close}
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
        <div className="flex flex-col gap-1 flex-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-heading font-semibold text-2xl text-[var(--fg-primary)] py-3 transition-[opacity,transform] duration-300 border-b border-[var(--border-subtle)]"
              style={{ transitionDelay: `${i * 60}ms` }}
              onClick={close}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="pt-6" style={{ transitionDelay: "300ms" }}>
          <Link
            href={`/${locale}/contacts`}
            className="inline-flex items-center justify-center bg-[var(--accent-gold)] text-[var(--bg-base)] font-body font-semibold text-base px-6 py-3.5 rounded-xl w-full shadow-[var(--shadow-glow-subtle)]"
            onClick={close}
          >
            {t("contacts")}
          </Link>
        </div>
      </nav>
    </div>
  );
}

export function Header() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const { isScrolled } = useScroll({ threshold: 50 });
  const navLinks = useNavLinks();
  const mobileMenu = useMobileMenu();

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[300]",
        "transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isScrolled
          ? [
              "bg-[var(--bg-base)]/92 backdrop-blur-[20px] saturate-[160%]",
              "border-b border-[var(--border-subtle)]",
              "shadow-[var(--shadow-sm)]",
            ]
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 h-14 md:h-16 flex items-center gap-2 md:gap-4">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-1.5 md:gap-2 no-underline z-[301] relative group shrink min-w-0"
        >
          <div
            className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 shrink-0 group-hover:shadow-[0_0_16px_oklch(0.82_0.10_88_/0.25)]"
            style={{ background: "var(--accent-gold)" }}
          >
            <Leaf size={15} className="text-[var(--bg-base)]" strokeWidth={2.5} />
          </div>
          <span className="font-heading font-bold text-[11px] sm:text-[13px] text-[var(--fg-primary)] tracking-[-0.01em] whitespace-nowrap overflow-hidden text-ellipsis">
            {SITE_CONFIG.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-8 flex-1 justify-center"
          role="navigation"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body font-medium text-sm text-[var(--fg-secondary)] tracking-[0.01em] transition-colors duration-250 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[var(--accent-gold)] after:transition-[width] after:duration-300 after:rounded-full hover:text-[var(--fg-primary)] hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-1 shrink-0">
          {/* Desktop CTA */}
          <Link
            href={`/${locale}/contacts`}
            className="hidden md:inline-flex items-center justify-center bg-[var(--accent-gold)] text-[var(--bg-base)] font-body font-medium text-sm px-4 py-2 min-h-[44px] rounded-lg transition-[color,background-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[var(--shadow-glow-subtle)] hover:bg-[var(--accent-gold-hover)] hover:shadow-[var(--shadow-md),0_0_16px_oklch(0.82_0.10_88_/0.12)] hover:scale-[1.02] active:scale-[0.98]"
          >
            {t("contacts")}
          </Link>

          {/* Icon group */}
          <div className="flex items-center gap-0.5">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>

          {/* Mobile menu button */}
          <button
            className="flex md:hidden items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] text-[var(--fg-primary)] rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] transition-colors duration-250 hover:text-[var(--accent-gold)] hover:border-[var(--border)]"
            onClick={mobileMenu.toggle}
            aria-label={mobileMenu.isOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenu.isOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenu.isOpen ? <X size={20} /> : <Menu size={22} strokeWidth={2.2} />}
          </button>
        </div>
      </div>
    </header>
  );
}
