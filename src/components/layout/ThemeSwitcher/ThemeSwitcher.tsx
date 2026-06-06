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

// Get initial theme from DOM (set by script in layout)
function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "dark" || attr === "light") return attr;
  return getSystemTheme();
}

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);

  // Initialize from DOM on mount
  useEffect(() => {
    const initial = getStoredTheme() ?? getInitialTheme();
    setTheme(initial);
    setMounted(true);
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!getStoredTheme()) {
        const t: Theme = e.matches ? "dark" : "light";
        setTheme(t);
        document.documentElement.setAttribute("data-theme", t);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [mounted]);

  const toggle = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";

    if (iconRef.current) {
      iconRef.current.style.transition = "transform 0.3s ease";
      iconRef.current.style.transform = "rotate(180deg) scale(0.6)";
      setTimeout(() => {
        document.documentElement.setAttribute("data-theme", next);
        try {
          localStorage.setItem("theme", next);
        } catch {}
        setTheme(next);
        if (iconRef.current)
          iconRef.current.style.transform = "rotate(0deg) scale(1)";
      }, 150);
    } else {
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch {}
      setTheme(next);
    }
  }, [theme]);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--bg-surface)]" />
    );
  }

  return (
    <button
      className="flex items-center justify-center w-9 h-9 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--fg-primary)] cursor-pointer transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] active:scale-[0.95] focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)] focus-visible:outline-offset-2"
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
