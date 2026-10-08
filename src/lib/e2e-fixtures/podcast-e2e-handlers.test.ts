import { afterEach, describe, expect, it } from "vitest";
import { HTTP_BAD_GATEWAY } from "@/lib/constants";
import {
  fixtureLookupResponse,
  fixturePodcast,
  fixturePodcastDetail,
  fixtureRssFeed,
} from "@/lib/fixtures";
import {
  loadPodcastDetailE2E,
  loadPodcastsE2E,
  podcastLookupApiE2E,
  podcastsListApiE2E,
} from "./podcast-e2e-handlers";

const E2E_ENV_KEYS = [
  "ONDEA_E2E_FIXTURES_FAIL",
  "ONDEA_E2E_API_FAIL",
] as const;

afterEach(() => {
  for (const key of E2E_ENV_KEYS) {
    delete process.env[key];
  }
});

describe("loadPodcastsE2E", () => {
  it("returns mapped fixture podcasts", () => {
    const podcasts = loadPodcastsE2E();
    expect(podcasts.map((p) => p.id)).toContain(fixturePodcast.id);
  });

  it("throws when fail mode is enabled", () => {
    process.env.ONDEA_E2E_FIXTURES_FAIL = "1";
    expect(() => loadPodcastsE2E()).toThrow(/fixtures fail/i);
  });
});

describe("loadPodcastDetailE2E", () => {
  it("returns fixture detail for the fixture podcast id", () => {
    const detail = loadPodcastDetailE2E(fixturePodcastDetail.podcast.id);
    expect(detail).toEqual(fixturePodcastDetail);
  });

  it("throws when podcast id is not in fixtures", () => {
    expect(() => loadPodcastDetailE2E("unknown-id")).toThrow(/not found/i);
  });

  it("throws when fail mode is enabled", () => {
    process.env.ONDEA_E2E_FIXTURES_FAIL = "1";
    expect(() =>
      loadPodcastDetailE2E(fixturePodcastDetail.podcast.id),
    ).toThrow(/fixtures fail/i);
  });
});

describe("podcastsListApiE2E", () => {
  it("returns fixture feed json on success", async () => {
    const response = podcastsListApiE2E();
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(fixtureRssFeed);
  });

  it("returns 502 when api fail mode is enabled", async () => {
    process.env.ONDEA_E2E_API_FAIL = "1";
    const response = podcastsListApiE2E();
    expect(response.status).toBe(HTTP_BAD_GATEWAY);
    expect(await response.json()).toEqual({ feed: { entry: [] } });
  });
});

describe("podcastLookupApiE2E", () => {
  it("returns fixture lookup for the fixture podcast id", async () => {
    const response = podcastLookupApiE2E(fixturePodcast.id);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(fixtureLookupResponse);
  });

  it("returns empty lookup when podcast id is unknown", async () => {
    const response = podcastLookupApiE2E("unknown-id");
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ resultCount: 0, results: [] });
  });

  it("returns 502 when api fail mode is enabled", async () => {
    process.env.ONDEA_E2E_API_FAIL = "1";
    const response = podcastLookupApiE2E(fixturePodcast.id);
    expect(response.status).toBe(HTTP_BAD_GATEWAY);
    expect(await response.json()).toEqual({ resultCount: 0, results: [] });
  });
});
