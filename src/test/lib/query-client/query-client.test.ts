import { afterEach, describe, expect, it, vi } from "vitest";
import { QUERY_RETRY_COUNT } from "@/lib";

describe("getQueryClient", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("creates a new client on the server", async () => {
    vi.stubGlobal("window", undefined);
    const { getQueryClient: getClient } = await import("@/lib");
    const first = getClient();
    const second = getClient();
    expect(first).not.toBe(second);
    expect(first.getDefaultOptions().queries?.retry).toBe(QUERY_RETRY_COUNT);
  });

  it("reuses browser singleton", async () => {
    vi.stubGlobal("window", {} as Window & typeof globalThis);
    vi.resetModules();
    const mod = await import("@/lib");
    const first = mod.getQueryClient();
    const second = mod.getQueryClient();
    expect(first).toBe(second);
  });
});
