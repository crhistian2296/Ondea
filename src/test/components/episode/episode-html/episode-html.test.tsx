import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EpisodeHtml } from "@/components/episode";

describe("EpisodeHtml", () => {
  it("delegates to rich description", () => {
    render(<EpisodeHtml html="<p>Episode</p>" />);
    expect(screen.getByText("Episode")).toBeInTheDocument();
  });
});
