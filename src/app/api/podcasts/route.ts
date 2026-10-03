import { NextResponse } from "next/server";
import { ITUNES_TOP_PODCASTS_URL } from "@/lib/constants";
import { fetchExternalJson } from "@/lib/fetch-external";
import type { ItunesRssFeed } from "@/lib/types";

export async function GET() {
  try {
    const data = await fetchExternalJson<ItunesRssFeed>(
      ITUNES_TOP_PODCASTS_URL,
    );
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ feed: { entry: [] } }, { status: 502 });
  }
}
