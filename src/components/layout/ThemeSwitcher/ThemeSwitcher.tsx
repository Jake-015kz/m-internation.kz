"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Sun, Moon } from "lucide-react";
import { gsap } from "gsap";
import styles from "./ThemeSwitcher.module.scss";

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
  const [theme, setTheme] = useState<Theme>("dark");
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
  }, []);

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

    // Check for reduced motion preference
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !iconRef.current) {
      // Skip animation for accessibility or SSR
      applyTheme(newTheme);
      try {
        localStorage.setItem("theme", newTheme);
      } catch {}
    } else {
      // Icon rotation animation on click
      gsap.to(iconRef.current, {
        rotate: -180,
        scale: 0.6,
        duration: 0.4,
        ease: "back.in(1.7)",
        onComplete: () => {
          // Apply theme after animation starts
          applyTheme(newTheme);
          try {
            localStorage.setItem("theme", newTheme);
          } catch {}
          // Animate back to normal
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
      className={styles.button}
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className={styles.iconWrapper} ref={iconRef}>
        {theme === "dark" ? (
          <Sun size={18} className={styles.icon} />
        ) : (
          <Moon size={18} className={styles.icon} />
        )}
      </div>
    </button>
  );
}
