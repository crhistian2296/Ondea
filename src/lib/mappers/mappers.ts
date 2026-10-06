import type {
  Episode,
  ItunesLookupResponse,
  ItunesLookupResult,
  ItunesRssEntry,
  ItunesRssFeed,
  Podcast,
  PodcastDetail,
} from "@/lib";

function asEntries(
  entry: ItunesRssEntry | ItunesRssEntry[] | undefined,
): ItunesRssEntry[] {
  if (!entry) {
    return [];
  }
  return Array.isArray(entry) ? entry : [entry];
}

function largestImage(images?: { label: string }[]) {
  if (!images?.length) {
    return "";
  }
  return images[images.length - 1]?.label ?? "";
}

export function mapRssFeed(data: ItunesRssFeed): Podcast[] {
  return asEntries(data.feed?.entry)
    .map((entry) => {
      const id = entry.id?.attributes?.["im:id"] ?? "";
      const authorUrl = entry["im:artist"]?.attributes?.href;
      return {
        id,
        title: entry["im:name"]?.label ?? "",
        author: entry["im:artist"]?.label ?? "",
        ...(authorUrl ? { authorUrl } : {}),
        image: largestImage(entry["im:image"]),
        description: entry.summary?.label ?? "",
        genre:
          entry.category?.attributes?.label ??
          entry.category?.attributes?.term ??
          "Music",
      } satisfies Podcast;
    })
    .filter((podcast) => podcast.id);
}

function genreFromLookup(result: ItunesLookupResult) {
  if (result.primaryGenreName) {
    return result.primaryGenreName;
  }
  const first = result.genres?.[0];
  if (typeof first === "string") {
    return first;
  }
  return first?.name ?? "Music";
}

function mapPodcastFromLookup(result: ItunesLookupResult): Podcast {
  const authorUrl = result.artistViewUrl;
  return {
    id: String(result.collectionId ?? result.trackId ?? ""),
    title: result.collectionName ?? result.trackName ?? "",
    author: result.artistName ?? "",
    ...(authorUrl ? { authorUrl } : {}),
    image: result.artworkUrl600 ?? result.artworkUrl100 ?? "",
    description: result.description ?? result.shortDescription ?? "",
    genre: genreFromLookup(result),
  };
}

function mapEpisode(result: ItunesLookupResult): Episode | null {
  const id = result.trackId ? String(result.trackId) : "";
  const podcastId = result.collectionId ? String(result.collectionId) : "";
  const audioUrl = result.episodeUrl ?? result.previewUrl ?? "";
  if (!id || !podcastId) {
    return null;
  }

  return {
    id,
    podcastId,
    title: result.trackName ?? "",
    description: result.description ?? result.shortDescription ?? "",
    releaseDate: result.releaseDate ?? "",
    durationMs: result.trackTimeMillis ?? 0,
    audioUrl,
  };
}

export function mapLookup(data: ItunesLookupResponse): PodcastDetail | null {
  const results = data.results ?? [];
  const collection =
    results.find(
      (item) => item.wrapperType === "track" && item.kind === "podcast",
    ) ?? results.find((item) => item.kind === "podcast");

  if (!collection) {
    return null;
  }

  const episodes = results
    .filter(
      (item) =>
        item.wrapperType === "podcastEpisode" ||
        item.kind === "podcast-episode",
    )
    .map(mapEpisode)
    .filter((episode): episode is Episode => episode !== null);

  return {
    podcast: mapPodcastFromLookup(collection),
    episodes,
  };
}
