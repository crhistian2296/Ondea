import { screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { PodcastDetailView } from "@/components";
import { fixturePodcast, fixturePodcastDetail } from "@/test/fixtures";
import { renderWithProviders } from "@/test/render-with-providers";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe("PodcastDetailView", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders episodes from initial detail", async () => {
    renderWithProviders(
      <PodcastDetailView
        podcastId={fixturePodcast.id}
        initialCatalog={[fixturePodcast]}
        initialDetail={fixturePodcastDetail}
      />,
    );
    await waitFor(() =>
      expect(
        screen.getAllByText(fixturePodcastDetail.episodes[0]!.title).length,
      ).toBeGreaterThan(0),
    );
    expect(screen.getByText(/Episodes: 1/)).toBeInTheDocument();
  });

  it("shows error without data", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 }),
    );
    renderWithProviders(<PodcastDetailView podcastId={fixturePodcast.id} />);
    await waitFor(() =>
      expect(
        screen.getByText("No se pudo cargar el podcast."),
      ).toBeInTheDocument(),
    );
  });
});
