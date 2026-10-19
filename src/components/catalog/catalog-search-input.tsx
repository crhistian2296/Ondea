"use client";

type CatalogSearchInputProps = {
  value: string;
  onSearch: (value: string) => void;
};

export function CatalogSearchInput({
  value,
  onSearch,
}: CatalogSearchInputProps) {
  return (
    <input
      className="input input--search"
      value={value}
      onChange={(event) => onSearch(event.target.value)}
      placeholder="Search podcast..."
      aria-label="Filtrar podcasts"
    />
  );
}
