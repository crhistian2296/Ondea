"use client";

import { CatalogGenreSelect } from "../catalog-genre-select/catalog-genre-select";
import { CatalogSearchInput } from "../catalog-search-input/catalog-search-input";

type CatalogToolbarProps = {
  count: number;
  genre: string;
  genres: string[];
  search: string;
  onGenreChange: (value: string) => void;
  onSearch: (value: string) => void;
};

export function CatalogToolbar({
  count,
  genre,
  genres,
  search,
  onGenreChange,
  onSearch,
}: CatalogToolbarProps) {
  return (
    <div className="catalog__toolbar">
      <span className="badge">{count}</span>
      <CatalogGenreSelect
        value={genre}
        genres={genres}
        onGenreChange={onGenreChange}
      />
      <CatalogSearchInput value={search} onSearch={onSearch} />
    </div>
  );
}
