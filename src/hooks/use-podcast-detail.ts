"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { usePodcasts } from "@/hooks/use-podcasts";
import { DAY_MS } from "@/lib/constants";
import { enrichPodcastDetail } from "@/lib/enrich-podcast-detail";
import { mapLookup } from "@/lib/mappers";
import type { ItunesLookupResponse, Podcast, PodcastDetail } from "@/lib/types";

async function fetchPodcastLookup(podcastId: string): Promise<PodcastDetail> {
  const response = await fetch(`/api/podcasts/${podcastId}`);
  if (!response.ok) {
    throw new Error(`Failed to load podcast ${podcastId}: ${response.status}`);
  }
  const data = (await response.json()) as ItunesLookupResponse;
  const mapped = mapLookup(data);
  if (!mapped) {
    throw new Error(`Podcast ${podcastId} not found`);
  }
  return mapped;
}

export type PodcastDetailSeed = {
  initialCatalog?: Podcast[];
  initialDetail?: PodcastDetail;
};

export function usePodcastDetail(podcastId: string, seed?: PodcastDetailSeed) {
  const { data: catalog } = usePodcasts(seed?.initialCatalog);

  const query = useQuery({
    queryKey: ["podcast", podcastId],
    queryFn: () => fetchPodcastLookup(podcastId),
    staleTime: DAY_MS,
    gcTime: DAY_MS,
    enabled: Boolean(podcastId),
    ...(seed?.initialDetail !== undefined
      ? { initialData: seed.initialDetail }
      : {}),
  });

  const data = useMemo(
    () => (query.data ? enrichPodcastDetail(query.data, catalog) : undefined),
    [query.data, catalog],
  );

  return { ...query, data };
}
