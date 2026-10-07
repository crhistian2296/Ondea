import { describe, expect, it } from "vitest";
import {
  enrichPodcastDetail,
  hasHtmlMarkup,
  prepareRichDescriptionHtml,
  type Podcast,
  type PodcastDetail,
} from "@/lib";

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

  it("strips scripts and event handlers", () => {
    const html = prepareRichDescriptionHtml(
      `<p onclick="alert(1)">Hi</p><script>alert(2)</script>`,
    );
    expect(html).toContain("<p>Hi</p>");
    expect(html).not.toContain("script");
    expect(html).not.toContain("onclick");
  });
});
