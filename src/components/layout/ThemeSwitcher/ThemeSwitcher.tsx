"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "dark" | "light";

function getStoredTheme(): Theme | null {
  try {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved === "dark" || saved === "light") return saved;
  } catch {}
  return null;
}

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(t: Theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", t);
  // Update color-scheme for native form controls / scrollbar
  root.style.colorScheme = t;
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  // DOM already has data-theme from inline <script> in layout
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "dark" || attr === "light") return attr;
  return getSystemTheme();
}

function resolveTheme(): Theme {
  return getStoredTheme() ?? getInitialTheme();
}

export function ThemeSwitcher() {
  const iconRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [theme, setTheme] = useState<Theme>(resolveTheme);

  // Sync DOM whenever theme changes (covers both toggle & system changes)
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Listen for system theme changes when no user preference is stored
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!getStoredTheme()) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggle = useCallback(() => {
    // Clear any pending animation to prevent race conditions
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";

      // Persist immediately
      try {
        localStorage.setItem("theme", next);
      } catch {}

      // Animate icon
      if (iconRef.current) {
        const el = iconRef.current;
        el.style.transition = "transform 0.3s ease";
        el.style.transform = "rotate(180deg) scale(0.6)";
        timeoutRef.current = setTimeout(() => {
          el.style.transform = "rotate(0deg) scale(1)";
        }, 150);
      }

      return next;
    });
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <button
      className="flex items-center justify-center w-9 h-9 min-w-[36px] min-h-[36px] rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--fg-primary)] cursor-pointer transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] active:scale-[0.95] focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)] focus-visible:outline-offset-2"
      onClick={toggle}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div
        className="flex items-center justify-center origin-center"
        ref={iconRef}
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </div>
    </button>
  );
}
