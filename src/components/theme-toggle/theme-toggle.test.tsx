import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThemeToggle } from "@/components";
import { renderWithProviders } from "@/test/render-with-providers";

describe("ThemeToggle", () => {
  it("toggles theme on click", () => {
    renderWithProviders(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button"));
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
