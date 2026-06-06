"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Sun, Moon } from "lucide-react";
import { gsap } from "gsap";

type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const currentAttr = document.documentElement.getAttribute("data-theme");
  if (currentAttr === "dark" || currentAttr === "light") return currentAttr;
  try {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved && (saved === "dark" || saved === "light")) return saved;
  } catch {}
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem("theme")) return;
      } catch {
        return;
      }
      const newTheme: Theme = e.matches ? "dark" : "light";
      setTheme(newTheme);
      applyTheme(newTheme);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme: Theme = theme === "dark" ? "light" : "dark";

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !iconRef.current) {
      applyTheme(newTheme);
      try {
        localStorage.setItem("theme", newTheme);
      } catch {}
    } else {
      gsap.to(iconRef.current, {
        rotate: -180,
        scale: 0.6,
        duration: 0.4,
        ease: "back.in(1.7)",
        onComplete: () => {
          applyTheme(newTheme);
          try {
            localStorage.setItem("theme", newTheme);
          } catch {}
          gsap.to(iconRef.current, {
            rotate: 0,
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1.2, 0.5)",
          });
        },
      });
    }

    setTheme(newTheme);
  }, [theme]);

  return (
    <button
      className="flex items-center justify-center w-10 h-10 rounded-[0.375rem] border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--fg-primary)] cursor-pointer transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:shadow-[0_0_15px_oklch(0.82_0.22_135/0.2),0_0_30px_oklch(0.82_0.22_135/0.1)] active:scale-[0.95] focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)] focus-visible:outline-offset-2"
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div
        className="flex items-center justify-center origin-center"
        ref={iconRef}
      >
        {theme === "dark" ? (
          <Sun
            size={18}
            className="transition-colors duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
        ) : (
          <Moon
            size={18}
            className="transition-colors duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
        )}
      </div>
    </button>
  );
}
