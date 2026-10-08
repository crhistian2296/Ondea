import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  fixtureEpisode,
  fixturePodcast,
  fixturePodcastDetail,
} from "@/test/fixtures";
import EpisodePage from "./page";

const { loadPodcasts, loadPodcastDetail, EpisodeDetailViewMock } = vi.hoisted(
  () => ({
    loadPodcasts: vi.fn(),
    loadPodcastDetail: vi.fn(),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    EpisodeDetailViewMock: vi.fn((_props: unknown) => (
      <div data-testid="episode-detail-view" />
    )),
  }),
);

vi.mock("@/lib/load-podcasts/load-podcasts", () => ({
  loadPodcasts,
  loadPodcastDetail,
}));

vi.mock("@/components", () => ({
  EpisodeDetailView: (props: unknown) => EpisodeDetailViewMock(props),
}));

describe("EpisodePage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("awaits loaders and renders EpisodeDetailView with settled results", async () => {
    const catalog = [fixturePodcast];
    loadPodcasts.mockResolvedValue(catalog);
    loadPodcastDetail.mockResolvedValue(fixturePodcastDetail);

    const ui = await EpisodePage({
      params: Promise.resolve({
        podcastId: fixturePodcast.id,
        episodeId: fixtureEpisode.id,
      }),
    });
    render(ui);

    expect(loadPodcasts).toHaveBeenCalledOnce();
    expect(loadPodcastDetail).toHaveBeenCalledWith(fixturePodcast.id);
    expect(EpisodeDetailViewMock).toHaveBeenCalledWith({
      podcastId: fixturePodcast.id,
      episodeId: fixtureEpisode.id,
      initialCatalog: catalog,
      initialDetail: fixturePodcastDetail,
    });
    expect(screen.getByTestId("episode-detail-view")).toBeInTheDocument();
  });
});
