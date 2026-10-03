import type { Podcast } from "@/lib/types";

export function filterPodcasts(
  podcasts: Podcast[],
  search: string,
  genre: string,
) {
  const query = search.trim().toLowerCase();

  return podcasts.filter((podcast) => {
    const matchesText =
      !query ||
      podcast.title.toLowerCase().includes(query) ||
      podcast.author.toLowerCase().includes(query);
    const matchesGenre = genre === "all" || podcast.genre === genre;
    return matchesText && matchesGenre;
  });
}

export function uniqueGenres(podcasts: Podcast[]) {
  return [
    ...new Set(podcasts.map((podcast) => podcast.genre).filter(Boolean)),
  ].sort((a, b) => a.localeCompare(b));
}

export function paginate<T>(items: T[], page: number, pageSize: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    page: currentPage,
    totalPages,
    totalItems: items.length,
  };
}
