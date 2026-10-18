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

  it("returns empty string for whitespace-only input", () => {
    expect(prepareRichDescriptionHtml("   ")).toBe("");
  });
});

describe("sanitizeHtml", () => {
  it("normalizes br tags to self-closing form", () => {
    expect(prepareRichDescriptionHtml("line<br>next")).toBe(
      "line<br />next",
    );
  });

  it("removes disallowed tags but keeps their text content", () => {
    const html = prepareRichDescriptionHtml("<div>inner</div><p>ok</p>");
    expect(html).not.toContain("<div");
    expect(html).toContain("inner");
    expect(html).toContain("<p>ok</p>");
  });

  it("strips style blocks before sanitizing tags", () => {
    const html = prepareRichDescriptionHtml(
      "<style>.x { color: red; }</style><p>Hi</p>",
    );
    expect(html).not.toContain("style");
    expect(html).not.toContain("color");
    expect(html).toContain("<p>Hi</p>");
  });

  it("preserves allowed inline formatting tags", () => {
    const html = prepareRichDescriptionHtml(
      "<p><strong>b</strong> <em>i</em></p>",
    );
    expect(html).toBe("<p><strong>b</strong> <em>i</em></p>");
  });
});

describe("extractSafeHref", () => {
  it("keeps https links with security attributes", () => {
    const html = prepareRichDescriptionHtml(
      '<a href="https://example.com">link</a>',
    );
    expect(html).toContain('href="https://example.com"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain(">link</a>");
  });

  it("accepts single-quoted http hrefs", () => {
    const html = prepareRichDescriptionHtml(
      "<a href='http://example.org/path'>go</a>",
    );
    expect(html).toContain('href="http://example.org/path"');
  });

  it("accepts unquoted https hrefs", () => {
    const html = prepareRichDescriptionHtml("<a href=https://example.com>x</a>");
    expect(html).toContain('href="https://example.com"');
  });

  it("escapes special characters in safe hrefs", () => {
    const html = prepareRichDescriptionHtml(
      '<a href="https://example.com?q=1&r=2">x</a>',
    );
    expect(html).toContain('href="https://example.com?q=1&amp;r=2"');
  });

  it("drops javascript and relative hrefs", () => {
    const unsafe = prepareRichDescriptionHtml(
      '<a href="javascript:alert(1)">bad</a>',
    );
    expect(unsafe).not.toContain("javascript:");
    expect(unsafe).toBe("<a>bad</a>");

    const relative = prepareRichDescriptionHtml('<a href="/local">home</a>');
    expect(relative).not.toContain('href="/local"');
    expect(relative).toBe("<a>home</a>");
  });

  it("renders anchor without href when href attribute is missing", () => {
    expect(prepareRichDescriptionHtml("<a>text</a>")).toBe("<a>text</a>");
  });
});
