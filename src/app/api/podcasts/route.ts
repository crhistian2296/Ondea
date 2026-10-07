import { NextResponse } from "next/server";
import { HTTP_BAD_GATEWAY, ITUNES_TOP_PODCASTS_URL } from "@/lib/constants";
import { fetchExternalJson } from "@/lib/fetch-external/fetch-external";
import { fixtureRssFeed } from "@/lib/fixtures";
import type { ItunesRssFeed } from "@/lib/types";

export async function GET() {
  if (process.env.ONDEA_E2E_FIXTURES === "1") {
    if (process.env.ONDEA_E2E_API_FAIL === "1") {
      return NextResponse.json(
        { feed: { entry: [] } },
        { status: HTTP_BAD_GATEWAY },
      );
    }
    return NextResponse.json(fixtureRssFeed);
  }

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
}
