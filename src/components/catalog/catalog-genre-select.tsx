"use client";

type CatalogGenreSelectProps = {
  value: string;
  genres: string[];
  onGenreChange: (value: string) => void;
};

export function CatalogGenreSelect({
  value,
  genres,
  onGenreChange,
}: CatalogGenreSelectProps) {
  return (
    <select
      className="select select--genre"
      value={value}
      onChange={(event) => onGenreChange(event.target.value)}
      aria-label="Filtrar por género"
    >
      <option value="all">All genres</option>
      {genres.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
