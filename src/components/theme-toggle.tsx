"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "@/context/theme-context";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="btn btn--ghost btn--icon"
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Activar tema claro" : "Activar tema oscuro"
      }
    >
      {theme === "dark" ? (
        <SunIcon className="btn__icon" aria-hidden />
      ) : (
        <MoonIcon className="btn__icon" aria-hidden />
      )}
    </button>
  );
}
