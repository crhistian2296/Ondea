import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PodcastCard } from "@/components/catalog";
import { fixturePodcast } from "@/test/fixtures";

describe("PodcastCard", () => {
  it("links to podcast detail", () => {
    render(<PodcastCard podcast={fixturePodcast} priority />);
    const link = screen.getByRole("link", { name: /Fixture Show/i });
    expect(link).toHaveAttribute("href", `/podcast/${fixturePodcast.id}`);
    expect(screen.getByRole("img")).toHaveAttribute("data-priority", "true");
  });
});
