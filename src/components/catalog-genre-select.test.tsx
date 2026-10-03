import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CatalogGenreSelect } from "@/components/catalog-genre-select";

describe("CatalogGenreSelect", () => {
  it("muestra All genres y los géneros recibidos", () => {
    render(
      <CatalogGenreSelect
        value="all"
        genres={["Music", "Comedy"]}
        onGenreChange={() => undefined}
      />,
    );

    const options = screen
      .getAllByRole("option")
      .map((option) => option.textContent);
    expect(options).toEqual(["All genres", "Music", "Comedy"]);
  });

  it("avisa el género elegido", () => {
    const onGenreChange = vi.fn();
    render(
      <CatalogGenreSelect
        value="all"
        genres={["Music", "Comedy"]}
        onGenreChange={onGenreChange}
      />,
    );

    fireEvent.change(screen.getByLabelText("Filtrar por género"), {
      target: { value: "Comedy" },
    });

    expect(onGenreChange).toHaveBeenCalledWith("Comedy");
  });

  it("con la lista vacía solo deja la opción all", () => {
    render(
      <CatalogGenreSelect
        value="all"
        genres={[]}
        onGenreChange={() => undefined}
      />,
    );

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(1);
    expect(options[0]).toHaveProperty("value", "all");
  });
});
