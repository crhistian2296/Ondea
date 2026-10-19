import { fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { EpisodeDetailView } from "@/components/episode";
import {
  fixtureEpisode,
  fixturePodcast,
  fixturePodcastDetail,
} from "@/test/fixtures";
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

describe("EpisodeDetailView", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders episode with audio", async () => {
    renderWithProviders(
      <EpisodeDetailView
        podcastId={fixturePodcast.id}
        episodeId={fixtureEpisode.id}
        initialCatalog={[fixturePodcast]}
        initialDetail={fixturePodcastDetail}
      />,
    );
    await waitFor(() =>
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        fixtureEpisode.title,
      ),
    );
    expect(document.querySelector("audio")).toHaveAttribute(
      "src",
      fixtureEpisode.audioUrl,
    );
  });

  it("shows not found for missing episode", async () => {
    renderWithProviders(
      <EpisodeDetailView
        podcastId={fixturePodcast.id}
        episodeId="missing"
        initialCatalog={[fixturePodcast]}
        initialDetail={fixturePodcastDetail}
      />,
    );
    await waitFor(() =>
      expect(screen.getByText("Episode not found.")).toBeInTheDocument(),
    );
  });

  it("shows loading skeleton without initial data", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise(() => {})),
    );
    renderWithProviders(
      <EpisodeDetailView
        podcastId={fixturePodcast.id}
        episodeId={fixtureEpisode.id}
      />,
    );
    await waitFor(() =>
      expect(document.querySelector(".detail-skeleton")).toBeInTheDocument(),
    );
  });

  it("shows error without data", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 }),
    );
    renderWithProviders(
      <EpisodeDetailView
        podcastId={fixturePodcast.id}
        episodeId={fixtureEpisode.id}
      />,
    );
    await waitFor(() =>
      expect(
        screen.getByText("No se pudo cargar el episodio."),
      ).toBeInTheDocument(),
    );
  });

  it("retries loading after error", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 500 });
    vi.stubGlobal("fetch", fetchMock);

    renderWithProviders(
      <EpisodeDetailView
        podcastId={fixturePodcast.id}
        episodeId={fixtureEpisode.id}
      />,
    );

    await waitFor(() =>
      expect(
        screen.getByText("No se pudo cargar el episodio."),
      ).toBeInTheDocument(),
    );

    const callsBeforeRetry = fetchMock.mock.calls.length;
    fireEvent.click(screen.getByRole("button", { name: "Reintentar" }));

    await waitFor(() =>
      expect(fetchMock.mock.calls.length).toBeGreaterThan(callsBeforeRetry),
    );
  });

  it("renders episode without audio player when audioUrl is empty", async () => {
    const episodeWithoutAudio = {
      ...fixtureEpisode,
      audioUrl: "",
    };
    renderWithProviders(
      <EpisodeDetailView
        podcastId={fixturePodcast.id}
        episodeId={episodeWithoutAudio.id}
        initialCatalog={[fixturePodcast]}
        initialDetail={{
          ...fixturePodcastDetail,
          episodes: [episodeWithoutAudio],
        }}
      />,
    );
    await waitFor(() =>
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        episodeWithoutAudio.title,
      ),
    );
    expect(document.querySelector("audio")).toBeNull();
  });
});
