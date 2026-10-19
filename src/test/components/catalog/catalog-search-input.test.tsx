import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CatalogSearchInput } from "@/components/catalog";

describe("CatalogSearchInput", () => {
  it("muestra el valor actual", () => {
    render(<CatalogSearchInput value="npr" onSearch={() => undefined} />);

    const input = screen.getByLabelText("Filtrar podcasts");
    expect(input).toHaveProperty("value", "npr");
    expect(input).toHaveProperty("placeholder", "Search podcast...");
  });

  it("avisa el texto escrito", () => {
    const onSearch = vi.fn();
    render(<CatalogSearchInput value="" onSearch={onSearch} />);

    fireEvent.change(screen.getByLabelText("Filtrar podcasts"), {
      target: { value: "song" },
    });

    expect(onSearch).toHaveBeenCalledWith("song");
  });
});
