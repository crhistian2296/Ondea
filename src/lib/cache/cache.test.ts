import { describe, expect, it } from "vitest";
import { isCacheFresh, DAY_MS } from "@/lib";

describe("isCacheFresh", () => {
  it("is fresh within 24 hours", () => {
    const now = 1_700_000_000_000;
    expect(isCacheFresh(now - DAY_MS + 1, now)).toBe(true);
  });

  it("is stale after 24 hours", () => {
    const now = 1_700_000_000_000;
    expect(isCacheFresh(now - DAY_MS, now)).toBe(false);
  });
});
