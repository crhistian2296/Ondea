"use client";

import { useQuery } from "@tanstack/react-query";
import { DAY_MS, mapRssFeed, type ItunesRssFeed, type Podcast } from "@/lib";

async function fetchPodcasts(): Promise<Podcast[]> {
  const response = await fetch("/api/podcasts");
  if (!response.ok) {
    throw new Error(`Failed to load podcasts: ${response.status}`);
  }
  const data = (await response.json()) as ItunesRssFeed;
  return mapRssFeed(data);
}

export function usePodcasts(initialData?: Podcast[]) {
  return useQuery({
    queryKey: ["podcasts"],
    queryFn: fetchPodcasts,
    staleTime: DAY_MS,
    gcTime: DAY_MS,
    ...(initialData !== undefined ? { initialData } : {}),
  });
}
