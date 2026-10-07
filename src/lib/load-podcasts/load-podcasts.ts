import { ITUNES_TOP_PODCASTS_URL, itunesLookupUrl } from "@/lib/constants";
import { fetchExternalJson } from "@/lib/fetch-external/fetch-external";
import { fixturePodcastDetail, fixtureRssFeed } from "@/lib/fixtures";
import { mapLookup, mapRssFeed } from "@/lib/mappers/mappers";
import type {
  ItunesLookupResponse,
  ItunesRssFeed,
  Podcast,
  PodcastDetail,
} from "@/lib/types";

function areE2eFixturesEnabled() {
  return process.env.ONDEA_E2E_FIXTURES === "1";
}

function shouldE2eFixturesFail() {
  return process.env.ONDEA_E2E_FIXTURES_FAIL === "1";
}

export async function loadPodcasts(): Promise<Podcast[]> {
  if (areE2eFixturesEnabled()) {
    if (shouldE2eFixturesFail()) {
      throw new Error("E2E fixtures fail mode");
    }
    return mapRssFeed(fixtureRssFeed);
  }

  const data = await fetchExternalJson<ItunesRssFeed>(ITUNES_TOP_PODCASTS_URL);
  return mapRssFeed(data);
}

export async function loadPodcastDetail(
  podcastId: string,
): Promise<PodcastDetail> {
  if (areE2eFixturesEnabled()) {
    if (shouldE2eFixturesFail()) {
      throw new Error("E2E fixtures fail mode");
    }
    if (podcastId !== fixturePodcastDetail.podcast.id) {
      throw new Error(`Podcast ${podcastId} not found`);
    }
    return fixturePodcastDetail;
  }

  const data = await fetchExternalJson<ItunesLookupResponse>(
    itunesLookupUrl(podcastId),
  );
  const mapped = mapLookup(data);
  if (!mapped) {
    throw new Error(`Podcast ${podcastId} not found`);
  }
  return mapped;
}
