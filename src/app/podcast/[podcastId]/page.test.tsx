import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  fixturePodcast,
  fixturePodcastDetail,
} from "@/test/fixtures";
import PodcastPage from "./page";

const { loadPodcasts, loadPodcastDetail, PodcastDetailViewMock } = vi.hoisted(
  () => ({
    loadPodcasts: vi.fn(),
    loadPodcastDetail: vi.fn(),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    PodcastDetailViewMock: vi.fn((_props: unknown) => (
      <div data-testid="podcast-detail-view" />
    )),
  }),
);

vi.mock("@/lib/load-podcasts/load-podcasts", () => ({
  loadPodcasts,
  loadPodcastDetail,
}));

vi.mock("@/components", () => ({
  PodcastDetailView: (props: unknown) => PodcastDetailViewMock(props),
}));

describe("PodcastPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("awaits loaders and renders PodcastDetailView with settled results", async () => {
    const catalog = [fixturePodcast];
    loadPodcasts.mockResolvedValue(catalog);
    loadPodcastDetail.mockResolvedValue(fixturePodcastDetail);

    const ui = await PodcastPage({
      params: Promise.resolve({ podcastId: fixturePodcast.id }),
    });
    render(ui);

    expect(loadPodcasts).toHaveBeenCalledOnce();
    expect(loadPodcastDetail).toHaveBeenCalledWith(fixturePodcast.id);
    expect(PodcastDetailViewMock).toHaveBeenCalledWith({
      podcastId: fixturePodcast.id,
      initialCatalog: catalog,
      initialDetail: fixturePodcastDetail,
    });
    expect(screen.getByTestId("podcast-detail-view")).toBeInTheDocument();
  });
});
