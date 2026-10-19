import { HTTP_BAD_GATEWAY, itunesLookupUrl } from "@/lib/constants";
import { fetchExternalJson } from "@/lib/fetch-external";
import type { ItunesLookupResponse } from "@/lib/types";
import { withE2EFixturesElse } from "@/test/e2e-fixtures/e2e-fixtures";
import { podcastLookupApiE2E } from "@/test/e2e-fixtures/podcast-e2e-handlers";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ podcastId: string }> },
) {
  const { podcastId } = await params;

  return withE2EFixturesElse(
    () => podcastLookupApiE2E(podcastId),
    async () => {
      try {
        const data = await fetchExternalJson<ItunesLookupResponse>(
          itunesLookupUrl(podcastId),
        );
        return NextResponse.json(data);
      } catch (error) {
        console.error(error);
        return NextResponse.json(
          { resultCount: 0, results: [] },
          { status: HTTP_BAD_GATEWAY },
        );
      }
    },
  );
}
