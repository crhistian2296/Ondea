import { NextResponse } from "next/server";
import {
  HTTP_BAD_GATEWAY,
  itunesLookupUrl,
  fetchExternalJson,
  fixtureLookupResponse,
  fixturePodcast,
  type ItunesLookupResponse,
} from "@/lib";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ podcastId: string }> },
) {
  const { podcastId } = await params;

  if (process.env.ONDEA_E2E_FIXTURES === "1") {
    if (process.env.ONDEA_E2E_API_FAIL === "1") {
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
}
