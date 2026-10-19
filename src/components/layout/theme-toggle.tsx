"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "@/context";

export function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="btn btn--ghost btn--icon theme-toggle"
      onClick={toggleTheme}
    >
      <SunIcon className="btn__icon theme-toggle__sun" aria-hidden />
      <MoonIcon className="btn__icon theme-toggle__moon" aria-hidden />
      <span className="theme-toggle__label theme-toggle__label--light">
        Activar tema claro
      </span>
      <span className="theme-toggle__label theme-toggle__label--dark">
        Activar tema oscuro
      </span>
    </button>
  );
}
