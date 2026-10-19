import { ITUNES_TOP_PODCASTS_URL, itunesLookupUrl } from "@/lib/constants";
import { fetchExternalJson } from "@/lib/fetch-external";
import { mapLookup, mapRssFeed } from "@/lib/mappers";
import type {
  ItunesLookupResponse,
  ItunesRssFeed,
  Podcast,
  PodcastDetail,
} from "@/lib/types";
import { withE2EFixturesElse } from "@/test/e2e-fixtures/e2e-fixtures";
import {
  loadPodcastDetailE2E,
  loadPodcastsE2E,
} from "@/test/e2e-fixtures/podcast-e2e-handlers";

export async function loadPodcasts(): Promise<Podcast[]> {
  return withE2EFixturesElse(loadPodcastsE2E, async () => {
    const data = await fetchExternalJson<ItunesRssFeed>(
      ITUNES_TOP_PODCASTS_URL,
    );
    return mapRssFeed(data);
  });
}

export async function loadPodcastDetail(
  podcastId: string,
): Promise<PodcastDetail> {
  return withE2EFixturesElse(
    () => loadPodcastDetailE2E(podcastId),
    async () => {
      const data = await fetchExternalJson<ItunesLookupResponse>(
        itunesLookupUrl(podcastId),
      );
      const mapped = mapLookup(data);
      if (!mapped) {
        throw new Error(`Podcast ${podcastId} not found`);
      }
      return mapped;
    },
  );
}
