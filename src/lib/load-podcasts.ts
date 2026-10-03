import { ITUNES_TOP_PODCASTS_URL, itunesLookupUrl } from "@/lib/constants";
import { fetchExternalJson } from "@/lib/fetch-external";
import { mapLookup, mapRssFeed } from "@/lib/mappers";
import type {
  ItunesLookupResponse,
  ItunesRssFeed,
  Podcast,
  PodcastDetail,
} from "@/lib/types";

export async function loadPodcasts(): Promise<Podcast[]> {
  const data = await fetchExternalJson<ItunesRssFeed>(ITUNES_TOP_PODCASTS_URL);
  return mapRssFeed(data);
}

export async function loadPodcastDetail(
  podcastId: string,
): Promise<PodcastDetail> {
  const data = await fetchExternalJson<ItunesLookupResponse>(
    itunesLookupUrl(podcastId),
  );
  const mapped = mapLookup(data);
  if (!mapped) {
    throw new Error(`Podcast ${podcastId} not found`);
  }
  return mapped;
}
