import { renderHook, act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NavigationProvider, useNavigationUi } from "@/context";

describe("NavigationProvider", () => {
  it("tracks navigating state", () => {
    const { result } = renderHook(() => useNavigationUi(), {
      wrapper: NavigationProvider,
    });
    expect(result.current.isNavigating).toBe(false);
    act(() => result.current.setNavigating(true));
    expect(result.current.isNavigating).toBe(true);
  });

  it("throws outside provider", () => {
    expect(() => renderHook(() => useNavigationUi())).toThrow(
      /NavigationProvider/,
    );
  });
});
