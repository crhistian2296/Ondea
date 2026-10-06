export const THEME_STORAGE_KEY = "ondea-theme";

export const MS_PER_SECOND = 1000;
export const SECONDS_PER_MINUTE = 60;
export const SECONDS_PER_HOUR = 3600;

export const DAY_SECONDS = 24 * SECONDS_PER_HOUR;
export const DAY_MS = DAY_SECONDS * MS_PER_SECOND;

/** TTL depende del entorno (test o producción). */
export const QUERY_TTL_MS = process.env.NODE_ENV === "test" ? 60_000 : DAY_MS;

/** Prioridad máxima de las imágenes para LCP. */
export const MAX_PRIORITY_IMAGES = 16;

export const ITUNES_TOP_PODCASTS_LIMIT = 100;
export const ITUNES_MUSIC_GENRE_ID = 1310;
export const ITUNES_LOOKUP_EPISODE_LIMIT = 200;

export const QUERY_RETRY_COUNT = 1;

export const CATALOG_SKELETON_COUNT = 8;

export const PAGINATION_WINDOW_SIZE = 5;

export const PODCAST_CARD_IMAGE_SIZE = 300;
export const PODCAST_SIDEBAR_IMAGE_SIZE = 600;

export const HEADER_LOGO_ICON_SIZE = 24;
export const HEADER_LOGO_ICON_STROKE_WIDTH = 2;

export const HTTP_BAD_GATEWAY = 502;

export const ITUNES_TOP_PODCASTS_URL = `https://itunes.apple.com/us/rss/toppodcasts/limit=${ITUNES_TOP_PODCASTS_LIMIT}/genre=${ITUNES_MUSIC_GENRE_ID}/json`;

export function itunesLookupUrl(podcastId: string) {
  return `https://itunes.apple.com/lookup?id=${encodeURIComponent(podcastId)}&media=podcast&entity=podcastEpisode&limit=${ITUNES_LOOKUP_EPISODE_LIMIT}`;
}

export function allOriginsUrl(url: string) {
  return `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
}
