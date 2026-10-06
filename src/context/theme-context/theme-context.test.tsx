import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import { THEME_STORAGE_KEY } from "@/lib";
import { readStoredTheme, ThemeProvider, useTheme } from "@/context";

describe("readStoredTheme", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("defaults to light", () => {
    expect(readStoredTheme()).toBe("light");
  });

  it("reads plain light or dark values", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    expect(readStoredTheme()).toBe("dark");
  });

  it("reads legacy zustand json", () => {
    localStorage.setItem(
      THEME_STORAGE_KEY,
      JSON.stringify({ state: { theme: "dark" } }),
    );
    expect(readStoredTheme()).toBe("dark");
  });

  it("falls back on invalid json", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "{not-json");
    expect(readStoredTheme()).toBe("light");
  });
});

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("toggles theme and persists", () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });
    act(() => result.current.setTheme("dark"));
    expect(result.current.theme).toBe("dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe("light");
  });

  it("throws outside provider", () => {
    expect(() => renderHook(() => useTheme())).toThrow(/ThemeProvider/);
  });
});
