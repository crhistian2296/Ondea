import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { allOriginsUrl, fetchExternalJson } from "@/lib";

describe("fetchExternalJson", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("returns json on success", async () => {
    const payload = { ok: true };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => payload,
      }),
    );

    await expect(fetchExternalJson("https://example.com/a")).resolves.toEqual(
      payload,
    );
  });

  it("uses allorigins fallback when direct fetch fails", async () => {
    const payload = { feed: {} };
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new Error("network"))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => payload,
      });
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchExternalJson("https://example.com/rss")).resolves.toEqual(
      payload,
    );

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[1]?.[0]).toBe(
      allOriginsUrl("https://example.com/rss"),
    );
  });

  it("throws when fallback also fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockRejectedValueOnce(new Error("network"))
        .mockResolvedValueOnce({ ok: false, status: 500 }),
    );

    await expect(fetchExternalJson("https://example.com/x")).rejects.toThrow(
      /Fallback failed/,
    );
  });

  it("throws when direct response is not ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValueOnce({ ok: false, status: 404 })
        .mockResolvedValueOnce({ ok: false, status: 500 }),
    );

    await expect(fetchExternalJson("https://example.com/y")).rejects.toThrow(
      /Fallback failed/,
    );
  });
});
