import { describe, expect, it } from "vitest";
import { enrichPodcastDetail } from "@/lib/enrich-podcast-detail";
import {
  hasHtmlMarkup,
  prepareRichDescriptionHtml,
} from "@/lib/description-html";
import type { Podcast, PodcastDetail } from "@/lib/types";

const detail: PodcastDetail = {
  podcast: {
    id: "1",
    title: "Show",
    author: "Host",
    image: "art.jpg",
    description: "",
    genre: "Music",
  },
  episodes: [],
};

const catalog: Podcast[] = [
  {
    id: "1",
    title: "Show",
    author: "Host",
    image: "art.jpg",
    description: "A podcast about music.",
    genre: "Music",
  },
];

describe("enrichPodcastDetail", () => {
  it("fills missing podcast description from catalog", () => {
    const enriched = enrichPodcastDetail(detail, catalog);
    expect(enriched.podcast.description).toBe("A podcast about music.");
  });
});

describe("prepareRichDescriptionHtml", () => {
  it("wraps plain text in a paragraph", () => {
    expect(prepareRichDescriptionHtml("Hello\nworld")).toContain("<p>");
    expect(prepareRichDescriptionHtml("Hello\nworld")).toContain("Hello");
  });

  it("keeps sanitized html", () => {
    expect(hasHtmlMarkup("<p>Hi</p>")).toBe(true);
    expect(prepareRichDescriptionHtml("<p>Hi</p>")).toContain("<p>Hi</p>");
  });
});
