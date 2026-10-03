import { NextResponse } from "next/server";
import { itunesLookupUrl } from "@/lib/constants";
import { fetchExternalJson } from "@/lib/fetch-external";
import type { ItunesLookupResponse } from "@/lib/types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ podcastId: string }> },
) {
  const { podcastId } = await params;

  try {
    const data = await fetchExternalJson<ItunesLookupResponse>(
      itunesLookupUrl(podcastId),
    );
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ resultCount: 0, results: [] }, { status: 502 });
  }
}
