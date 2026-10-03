export type Podcast = {
  id: string;
  title: string;
  author: string;
  authorUrl?: string;
  image: string;
  description: string;
  genre: string;
};

export type Episode = {
  id: string;
  podcastId: string;
  title: string;
  description: string;
  releaseDate: string;
  durationMs: number;
  audioUrl: string;
};

export type PodcastDetail = {
  podcast: Podcast;
  episodes: Episode[];
};

export type ItunesLabel<T = string> = { label: T };

export type ItunesRssEntry = {
  id?: { attributes?: { "im:id"?: string }; label?: string };
  "im:name"?: ItunesLabel;
  "im:artist"?: ItunesLabel & { attributes?: { href?: string } };
  "im:image"?: ItunesLabel[];
  summary?: ItunesLabel;
  category?: { attributes?: { label?: string; term?: string } };
};

export type ItunesRssFeed = {
  feed?: {
    entry?: ItunesRssEntry | ItunesRssEntry[];
  };
};

export type ItunesLookupResult = {
  wrapperType?: string;
  kind?: string;
  collectionId?: number;
  trackId?: number;
  artistName?: string;
  artistViewUrl?: string;
  collectionName?: string;
  trackName?: string;
  artworkUrl600?: string;
  artworkUrl100?: string;
  description?: string;
  shortDescription?: string;
  releaseDate?: string;
  trackTimeMillis?: number;
  episodeUrl?: string;
  previewUrl?: string;
  primaryGenreName?: string;
  genres?: Array<string | { name?: string }>;
};

export type ItunesLookupResponse = {
  resultCount?: number;
  results?: ItunesLookupResult[];
};
