import { describe, expect, it } from "vitest";
import { getPaginationWindow } from "@/lib";

describe("getPaginationWindow", () => {
  it("returns all pages when total is small", () => {
    expect(getPaginationWindow(1, 3)).toEqual([1, 2, 3]);
  });

  it("centers the window around the current page", () => {
    expect(getPaginationWindow(5, 10, 5)).toEqual([3, 4, 5, 6, 7]);
  });

  it("clamps at the end", () => {
    expect(getPaginationWindow(10, 10, 5)).toEqual([6, 7, 8, 9, 10]);
  });
});
