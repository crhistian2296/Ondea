import { beforeEach, describe, expect, it, vi } from "vitest";
import { fixturePodcast, fixtureRssFeed } from "@/test/fixtures";

const fetchExternalJson = vi.fn();

vi.mock("@/lib/fetch-external/fetch-external", () => ({
  fetchExternalJson: (...args: unknown[]) => fetchExternalJson(...args),
}));

describe("loadPodcasts", () => {
  beforeEach(() => {
    fetchExternalJson.mockReset();
    delete process.env.ONDEA_E2E_FIXTURES;
    delete process.env.ONDEA_E2E_FIXTURES_FAIL;
  });

  it("maps rss feed from external fetch", async () => {
    fetchExternalJson.mockResolvedValue(fixtureRssFeed);
    const { loadPodcasts } = await import("@/lib");
    const podcasts = await loadPodcasts();
    expect(podcasts.map((p) => p.id)).toContain(fixturePodcast.id);
  });

  it("returns fixtures when ONDEA_E2E_FIXTURES is set", async () => {
    process.env.ONDEA_E2E_FIXTURES = "1";
    vi.resetModules();
    const { loadPodcasts } = await import("@/lib");
    const podcasts = await loadPodcasts();
    expect(podcasts).toHaveLength(2);
    expect(fetchExternalJson).not.toHaveBeenCalled();
  });

  it("throws when fixtures fail mode is enabled", async () => {
    process.env.ONDEA_E2E_FIXTURES = "1";
    process.env.ONDEA_E2E_FIXTURES_FAIL = "1";
    vi.resetModules();
    const { loadPodcasts } = await import("@/lib");
    await expect(loadPodcasts()).rejects.toThrow(/fixtures fail/i);
  });
});

describe("loadPodcastDetail", () => {
  beforeEach(() => {
    fetchExternalJson.mockReset();
    delete process.env.ONDEA_E2E_FIXTURES;
    delete process.env.ONDEA_E2E_FIXTURES_FAIL;
  });

  it("throws when podcast is not found", async () => {
    fetchExternalJson.mockResolvedValue({ results: [] });
    const { loadPodcastDetail } = await import("@/lib");
    await expect(loadPodcastDetail("999")).rejects.toThrow(/not found/i);
  });

  it("returns fixture detail when ONDEA_E2E_FIXTURES is set", async () => {
    process.env.ONDEA_E2E_FIXTURES = "1";
    vi.resetModules();
    const { loadPodcastDetail } = await import("@/lib");
    const detail = await loadPodcastDetail(fixturePodcast.id);
    expect(detail.podcast.id).toBe(fixturePodcast.id);
    expect(fetchExternalJson).not.toHaveBeenCalled();
  });
});
