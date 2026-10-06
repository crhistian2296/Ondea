import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { usePodcastDetail } from "@/hooks";
import {
  fixtureLookupResponse,
  fixturePodcast,
  fixturePodcastDetail,
} from "@/test/fixtures";
import { createTestQueryClient } from "@/test/render-with-providers";
import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

function wrapper({ children }: { children: ReactNode }) {
  const client = createTestQueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

describe("usePodcastDetail", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("enriches detail with catalog from usePodcasts seed", async () => {
    const sparseDetail = {
      ...fixturePodcastDetail,
      podcast: {
        ...fixturePodcastDetail.podcast,
        description: "",
      },
    };

    const { result } = renderHook(
      () =>
        usePodcastDetail(fixturePodcast.id, {
          initialCatalog: [fixturePodcast],
          initialDetail: sparseDetail,
        }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.data).toBeDefined());
    expect(result.current.data?.podcast.description).toBe(
      fixturePodcast.description,
    );
  });

  it("fetches lookup when no initial detail", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation(async (url: string) => {
        if (url === "/api/podcasts") {
          return { ok: true, json: async () => ({ feed: { entry: [] } }) };
        }
        return {
          ok: true,
          json: async () => fixtureLookupResponse,
        };
      }),
    );

    const { result } = renderHook(() => usePodcastDetail(fixturePodcast.id), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.episodes[0]?.id).toBe("9001");
  });

  it("does not fetch podcast detail when podcast id is empty", () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ feed: { entry: [] } }),
    });
    vi.stubGlobal("fetch", fetchMock);

    renderHook(() => usePodcastDetail(""), { wrapper });
    expect(fetchMock).not.toHaveBeenCalledWith(
      expect.stringMatching(/\/api\/podcasts\/.+/),
    );
  });
});
