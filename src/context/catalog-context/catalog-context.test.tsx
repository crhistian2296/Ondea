import { renderHook, act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CatalogProvider, useCatalog } from "@/context";

describe("CatalogProvider", () => {
  it("exposes initial search and genre", () => {
    const { result } = renderHook(() => useCatalog(), {
      wrapper: CatalogProvider,
    });
    expect(result.current.search).toBe("");
    expect(result.current.genre).toBe("all");
  });

  it("updates search and genre", () => {
    const { result } = renderHook(() => useCatalog(), {
      wrapper: CatalogProvider,
    });
    act(() => result.current.setSearch("jazz"));
    act(() => result.current.setGenre("Music"));
    expect(result.current.search).toBe("jazz");
    expect(result.current.genre).toBe("Music");
  });

  it("throws outside provider", () => {
    expect(() => renderHook(() => useCatalog())).toThrow(/CatalogProvider/);
  });
});
