export const THEME_STORAGE_KEY = "ondea-theme";

export const DAY_MS = 24 * 60 * 60 * 1000;
/** Columnas máximas del grid del catálogo (`catalog.css`); primera fila suele ser LCP. */
export const CATALOG_GRID_MAX_COLUMNS = 4;

export const ITUNES_TOP_PODCASTS_URL =
  "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";

export function itunesLookupUrl(podcastId: string) {
  return `https://itunes.apple.com/lookup?id=${encodeURIComponent(podcastId)}&media=podcast&entity=podcastEpisode&limit=200`;
}

export function allOriginsUrl(url: string) {
  return `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
}
