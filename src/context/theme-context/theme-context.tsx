"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { THEME_STORAGE_KEY } from "@/lib";

export type Theme = "light" | "dark";

export { THEME_STORAGE_KEY };

const themeListeners = new Set<() => void>();

function subscribeToTheme(listener: () => void) {
  themeListeners.add(listener);
  return () => {
    themeListeners.delete(listener);
  };
}

function notifyThemeChange() {
  for (const listener of themeListeners) {
    listener();
  }
}

function applyThemeClass(theme: Theme) {
  if (typeof document === "undefined") {
    return;
  }
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function readStoredTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    if (!raw) {
      return "light";
    }
    if (raw === "light" || raw === "dark") {
      return raw;
    }
    const parsed = JSON.parse(raw) as { state?: { theme?: Theme } };
    if (parsed.state?.theme === "light" || parsed.state?.theme === "dark") {
      return parsed.state.theme;
    }
  } catch {
    /* ignore */
  }
  return "light";
}

function getThemeServerSnapshot(): Theme {
  return "light";
}

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    readStoredTheme,
    getThemeServerSnapshot,
  );

  useLayoutEffect(() => {
    applyThemeClass(readStoredTheme());
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, next);
    applyThemeClass(next);
    notifyThemeChange();
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_STORAGE_KEY, next);
    applyThemeClass(next);
    notifyThemeChange();
  }, [theme]);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe usarse dentro de ThemeProvider");
  }
  return context;
}
