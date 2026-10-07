"use client";

import { CATALOG_SKELETON_COUNT, MAX_PRIORITY_IMAGES, type Podcast } from "@/lib";
import { PodcastCard } from "../podcast-card/podcast-card";

type CatalogGridProps = {
  isPending: boolean;
  podcasts: Podcast[];
};

export function CatalogGrid({ isPending, podcasts }: CatalogGridProps) {
  if (isPending) {
    return (
      <div className="catalog__grid">
        {Array.from({ length: CATALOG_SKELETON_COUNT }).map((_, index) => (
          <div key={index} className="skeleton skeleton--card" />
        ))}
      </div>
    );
  }

  return (
    <div className="catalog__grid">
      {podcasts.map((podcast, index) => (
        <PodcastCard
          key={podcast.id}
          podcast={podcast}
          priority={index < MAX_PRIORITY_IMAGES}
        />
      ))}
      {podcasts.length === 0 ? (
        <p className="catalog__empty">
          No se encontraron podcasts con ese filtro.
        </p>
      ) : null}
    </div>
  );
}
