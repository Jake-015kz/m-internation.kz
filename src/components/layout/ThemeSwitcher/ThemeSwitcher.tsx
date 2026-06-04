'use client';

import { useState, useEffect, useCallback } from 'react';
import { Sun, Moon } from 'lucide-react';
import styles from './ThemeSwitcher.module.scss';

type Theme = 'dark' | 'light';

// Получение начальной темы: сначала из data-theme (anti-flicker script уже поставил),
// потом из localStorage, потом из системных настроек
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  // Приоритет 1: data-theme атрибут (установлен anti-flicker скриптом до гидратации)
  const currentAttr = document.documentElement.getAttribute('data-theme');
  if (currentAttr === 'dark' || currentAttr === 'light') return currentAttr;
  // Приоритет 2: localStorage
  try {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved && (saved === 'dark' || saved === 'light')) return saved;
  } catch {
    // localStorage недоступен
  }
  // Приоритет 3: системные настройки
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Применение темы к DOM
function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

export function ThemeSwitcher() {
  // Инициализация через функцию — выполняется только один раз
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Синхронизация с DOM при монтировании (на случай рассинхронизации)
  useEffect(() => {
    applyTheme(theme);
  }, []); // Только при монтировании, theme уже инициализирован

  // Слушаем изменения системной темы
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Применяем только если пользователь не выбрал тему вручную
      try {
        if (localStorage.getItem('theme')) return;
      } catch {
        return;
      }
      const newTheme: Theme = e.matches ? 'dark' : 'light';
      setTheme(newTheme);
      applyTheme(newTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme: Theme = prev === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      try {
        localStorage.setItem('theme', newTheme);
      } catch {
        // localStorage недоступен
      }
      return newTheme;
    });
  }, []);

  return (
    <button
      className={styles.button}
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className={styles.iconWrapper}>
        {theme === 'dark' ? (
          <Sun size={18} className={styles.icon} />
        ) : (
          <Moon size={18} className={styles.icon} />
        )}
      </div>
    </button>
  );
}
