import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThemeScript } from "@/components";
import { THEME_STORAGE_KEY } from "@/lib";

describe("ThemeScript", () => {
  it("inlines theme bootstrap script", () => {
    const { container } = render(<ThemeScript />);
    const script = container.querySelector("script");
    expect(script?.innerHTML).toContain(THEME_STORAGE_KEY);
  });
});
