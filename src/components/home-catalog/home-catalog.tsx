"use client";

import {
  CatalogGenreSelect,
  CatalogSearchInput,
  LoadError,
  PodcastCard,
} from "@/components";
import { useCatalog } from "@/context";
import { usePodcasts } from "@/hooks";
import {
  filterPodcasts,
  uniqueGenres,
  CATALOG_SKELETON_COUNT,
  MAX_PRIORITY_IMAGES,
  type Podcast,
} from "@/lib";

export function HomeCatalog({
  initialPodcasts,
}: {
  initialPodcasts?: Podcast[];
}) {
  const { data, isPending, isError, refetch } = usePodcasts(initialPodcasts);
  const { search, genre, setSearch, setGenre } = useCatalog();

  if (isError && !data) {
    return (
      <section className="container catalog">
        <LoadError
          message="No se pudieron cargar los podcasts."
          onRetry={() => void refetch()}
        />
      </section>
    );
  }

  const podcasts = data ?? [];
  const genres = uniqueGenres(podcasts);
  const filtered = filterPodcasts(podcasts, search, genre);

  return (
    <section className="container catalog">
      <div className="catalog__toolbar">
        <span className="badge">{filtered.length}</span>
        <CatalogGenreSelect
          value={genre}
          genres={genres}
          onGenreChange={setGenre}
        />
        <CatalogSearchInput value={search} onSearch={setSearch} />
      </div>

      <div className="catalog__content">
        {isPending ? (
          <div className="catalog__grid">
            {Array.from({ length: CATALOG_SKELETON_COUNT }).map((_, index) => (
              <div key={index} className="skeleton skeleton--card" />
            ))}
          </div>
        ) : (
          <div className="catalog__grid">
            {filtered.map((podcast, index) => (
              <PodcastCard
                key={podcast.id}
                podcast={podcast}
                priority={index < MAX_PRIORITY_IMAGES}
              />
            ))}
            {filtered.length === 0 ? (
              <p className="catalog__empty">
                No se encontraron podcasts con ese filtro.
              </p>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
