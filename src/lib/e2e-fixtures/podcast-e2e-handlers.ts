import { NextResponse } from "next/server";
import { HTTP_BAD_GATEWAY } from "@/lib/constants";
import {
  isE2EApiFailMode,
  isE2EFixturesFailMode,
} from "@/lib/e2e-fixtures/e2e-fixtures";
import {
  fixtureLookupResponse,
  fixturePodcast,
  fixturePodcastDetail,
  fixtureRssFeed,
} from "@/lib/fixtures";
import { mapRssFeed } from "@/lib/mappers/mappers";
import type { Podcast, PodcastDetail } from "@/lib/types";

function assertE2EFixturesHealthy(): void {
  if (isE2EFixturesFailMode()) {
    throw new Error("E2E fixtures fail mode");
  }
}

export function loadPodcastsE2E(): Podcast[] {
  assertE2EFixturesHealthy();
  return mapRssFeed(fixtureRssFeed);
}

export function loadPodcastDetailE2E(podcastId: string): PodcastDetail {
  assertE2EFixturesHealthy();
  if (podcastId !== fixturePodcastDetail.podcast.id) {
    throw new Error(`Podcast ${podcastId} not found`);
  }
  return fixturePodcastDetail;
}

export function podcastsListApiE2E(): NextResponse {
  if (isE2EApiFailMode()) {
    return NextResponse.json(
      { feed: { entry: [] } },
      { status: HTTP_BAD_GATEWAY },
    );
  }
  return NextResponse.json(fixtureRssFeed);
}

export function podcastLookupApiE2E(podcastId: string): NextResponse {
  if (isE2EApiFailMode()) {
    return NextResponse.json(
      { resultCount: 0, results: [] },
      { status: HTTP_BAD_GATEWAY },
    );
  }
  if (podcastId === fixturePodcast.id) {
    return NextResponse.json(fixtureLookupResponse);
  }
  return NextResponse.json({ resultCount: 0, results: [] });
}
