import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { usePodcasts } from "@/hooks";
import { fixturePodcast, fixtureRssFeed } from "@/test/fixtures";
import { createTestQueryClient } from "@/test/render-with-providers";
import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

function wrapper({ children }: { children: ReactNode }) {
  const client = createTestQueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

describe("usePodcasts", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("uses initial data without fetching", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() => usePodcasts([fixturePodcast]), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([fixturePodcast]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("fetches and maps podcasts", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => fixtureRssFeed,
      }),
    );

    const { result } = renderHook(() => usePodcasts(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.[0]?.id).toBe(fixturePodcast.id);
  });

  it("surfaces fetch errors", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 }),
    );

    const { result } = renderHook(() => usePodcasts(), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
