import { describe, expect, it } from "vitest";
import { mapRssFeed, mapLookup } from "@/lib";

describe("mapRssFeed", () => {
  it("maps itunes rss entries", () => {
    const podcasts = mapRssFeed({
      feed: {
        entry: {
          id: { attributes: { "im:id": "123" } },
          "im:name": { label: "Song Exploder" },
          "im:artist": { label: "Hrishikesh" },
          "im:image": [{ label: "small.jpg" }, { label: "large.jpg" }],
          summary: { label: "A podcast" },
          category: { attributes: { label: "Music Commentary" } },
        },
      },
    });

    expect(podcasts).toEqual([
      {
        id: "123",
        title: "Song Exploder",
        author: "Hrishikesh",
        image: "large.jpg",
        description: "A podcast",
        genre: "Music Commentary",
      },
    ]);
  });

  it("maps a single entry when feed is not an array", () => {
    const podcasts = mapRssFeed({
      feed: {
        entry: {
          id: { attributes: { "im:id": "777" } },
          "im:name": { label: "Solo" },
          "im:artist": { label: "Artist" },
        },
      },
    });
    expect(podcasts).toHaveLength(1);
    expect(podcasts[0]?.id).toBe("777");
  });

  it("skips entries without id", () => {
    const podcasts = mapRssFeed({
      feed: {
        entry: {
          "im:name": { label: "No id" },
          "im:artist": { label: "Nobody" },
        },
      },
    });
    expect(podcasts).toEqual([]);
  });

  it("maps artist href when present", () => {
    const podcasts = mapRssFeed({
      feed: {
        entry: {
          id: { attributes: { "im:id": "456" } },
          "im:name": { label: "The Joe Budden Podcast" },
          "im:artist": {
            label: "The Joe Budden Network",
            attributes: {
              href: "https://podcasts.apple.com/us/artist/the-joe-budden-network/1535844019",
            },
          },
        },
      },
    });

    expect(podcasts[0]?.authorUrl).toBe(
      "https://podcasts.apple.com/us/artist/the-joe-budden-network/1535844019",
    );
  });
});

describe("mapLookup", () => {
  it("returns null when collection is missing", () => {
    expect(mapLookup({ results: [{ wrapperType: "podcastEpisode" }] })).toBe(
      null,
    );
  });

  it("resolves genre from genres array", () => {
    const detail = mapLookup({
      results: [
        {
          kind: "podcast",
          collectionId: 5,
          genres: [{ name: "Jazz" }],
        },
      ],
    });
    expect(detail?.podcast.genre).toBe("Jazz");
  });

  it("maps collection and episodes", () => {
    const detail = mapLookup({
      results: [
        {
          wrapperType: "track",
          kind: "podcast",
          collectionId: 1,
          artistName: "Author",
          artistViewUrl: "https://podcasts.apple.com/us/artist/author/1",
          collectionName: "Show",
          artworkUrl600: "art.jpg",
          description: "About",
          primaryGenreName: "Music",
        },
        {
          wrapperType: "podcastEpisode",
          kind: "podcast-episode",
          collectionId: 1,
          trackId: 99,
          trackName: "Episode 1",
          description: "<p>Hi</p>",
          releaseDate: "2016-03-01T00:00:00Z",
          trackTimeMillis: 90000,
          episodeUrl: "https://example.com/a.mp3",
        },
      ],
    });

    expect(detail?.podcast.title).toBe("Show");
    expect(detail?.podcast.authorUrl).toBe(
      "https://podcasts.apple.com/us/artist/author/1",
    );
    expect(detail?.episodes).toHaveLength(1);
    expect(detail?.episodes[0]?.id).toBe("99");
  });
});
