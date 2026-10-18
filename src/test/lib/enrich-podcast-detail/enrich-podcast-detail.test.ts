import { describe, expect, it } from "vitest";
import { enrichPodcastDetail } from "@/lib";
import {
  fixturePodcast,
  fixturePodcastDetail,
  fixturePodcastTwo,
} from "@/test/fixtures";

describe("enrichPodcastDetail", () => {
  it("returns detail unchanged when catalog is missing", () => {
    expect(enrichPodcastDetail(fixturePodcastDetail, undefined)).toEqual(
      fixturePodcastDetail,
    );
  });

  it("returns detail unchanged when catalog is empty", () => {
    expect(enrichPodcastDetail(fixturePodcastDetail, [])).toEqual(
      fixturePodcastDetail,
    );
  });

  it("returns detail unchanged when podcast is not in catalog", () => {
    expect(
      enrichPodcastDetail(fixturePodcastDetail, [fixturePodcastTwo]),
    ).toEqual(fixturePodcastDetail);
  });

  it("fills empty podcast fields from catalog match", () => {
    const sparse = {
      ...fixturePodcastDetail,
      podcast: {
        ...fixturePodcast,
        title: "",
        author: "",
        image: "",
        description: "",
        genre: "",
      },
    };

    const enriched = enrichPodcastDetail(sparse, [fixturePodcast]);
    expect(enriched.podcast.title).toBe(fixturePodcast.title);
    expect(enriched.podcast.author).toBe(fixturePodcast.author);
    expect(enriched.podcast.image).toBe(fixturePodcast.image);
  });
});
