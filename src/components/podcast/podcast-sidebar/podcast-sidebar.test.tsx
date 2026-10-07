import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PodcastSidebar } from "@/components/podcast";
import { fixturePodcast } from "@/test/fixtures";

describe("PodcastSidebar", () => {
  it("renders title, author and description", () => {
    render(<PodcastSidebar podcast={fixturePodcast} />);
    expect(screen.getAllByText(fixturePodcast.title).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Fixture Author/).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(fixturePodcast.description).length,
    ).toBeGreaterThan(0);
  });
});
