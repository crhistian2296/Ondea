import { describe, expect, it } from "vitest";
import { filterPodcasts, paginate, uniqueGenres } from "@/lib/catalog";
import type { Podcast } from "@/lib/types";

const podcasts: Podcast[] = [
  {
    id: "1",
    title: "Song Exploder",
    author: "Hrishikesh Hirway",
    image: "",
    description: "",
    genre: "Music Commentary",
  },
  {
    id: "2",
    title: "All Songs Considered",
    author: "NPR",
    image: "",
    description: "",
    genre: "Music",
  },
  {
    id: "3",
    title: "Tiny Desk Concerts",
    author: "NPR",
    image: "",
    description: "",
    genre: "Music Interviews",
  },
];

describe("filterPodcasts", () => {
  it("filters by title immediately", () => {
    expect(
      filterPodcasts(podcasts, "song", "all").map((item) => item.id),
    ).toEqual(["1", "2"]);
  });

  it("filters by author", () => {
    expect(filterPodcasts(podcasts, "npr", "all")).toHaveLength(2);
  });

  it("filters by genre", () => {
    expect(filterPodcasts(podcasts, "", "Music Commentary")).toEqual([
      podcasts[0],
    ]);
  });
});

describe("uniqueGenres", () => {
  it("returns sorted unique genres", () => {
    expect(uniqueGenres(podcasts)).toEqual([
      "Music",
      "Music Commentary",
      "Music Interviews",
    ]);
  });
});

describe("paginate", () => {
  it("slices the current page", () => {
    const result = paginate([1, 2, 3, 4, 5], 2, 2);
    expect(result).toEqual({
      items: [3, 4],
      page: 2,
      totalPages: 3,
      totalItems: 5,
    });
  });

  it("clamps out of range pages", () => {
    expect(paginate([1, 2, 3], 99, 2).page).toBe(2);
  });
});
