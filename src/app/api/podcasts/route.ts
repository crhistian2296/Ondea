import { NextResponse } from "next/server";
import { HTTP_BAD_GATEWAY, ITUNES_TOP_PODCASTS_URL } from "@/lib/constants";
import { withE2EFixturesElse } from "@/lib/e2e-fixtures/e2e-fixtures";
import { podcastsListApiE2E } from "@/lib/e2e-fixtures/podcast-e2e-handlers";
import { fetchExternalJson } from "@/lib/fetch-external/fetch-external";
import type { ItunesRssFeed } from "@/lib/types";

export async function GET() {
  return withE2EFixturesElse(podcastsListApiE2E, async () => {
    try {
      const data = await fetchExternalJson<ItunesRssFeed>(
        ITUNES_TOP_PODCASTS_URL,
      );
      return NextResponse.json(data);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { feed: { entry: [] } },
        { status: HTTP_BAD_GATEWAY },
      );
    }
  });
}
