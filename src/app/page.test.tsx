import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { fixturePodcast } from "@/test/fixtures";
import HomePage from "./page";

const { loadPodcasts, HomeCatalogMock } = vi.hoisted(() => ({
  loadPodcasts: vi.fn(),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  HomeCatalogMock: vi.fn((_props: unknown) => (
    <div data-testid="home-catalog" />
  )),
}));

vi.mock("@/lib/load-podcasts/load-podcasts", () => ({
  loadPodcasts,
  loadPodcastDetail: vi.fn(),
}));

vi.mock("@/components", () => ({
  HomeCatalog: (props: unknown) => HomeCatalogMock(props),
}));

describe("HomePage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("awaits loadPodcasts and renders HomeCatalog with the result", async () => {
    const podcasts = [fixturePodcast];
    loadPodcasts.mockResolvedValue(podcasts);

    const ui = await HomePage();
    render(ui);

    expect(loadPodcasts).toHaveBeenCalledOnce();
    expect(HomeCatalogMock).toHaveBeenCalledWith({ initialPodcasts: podcasts });
    expect(screen.getByTestId("home-catalog")).toBeInTheDocument();
  });

  it("renders HomeCatalog without data when loadPodcasts rejects", async () => {
    loadPodcasts.mockRejectedValue(new Error("upstream"));

    const ui = await HomePage();
    render(ui);

    expect(loadPodcasts).toHaveBeenCalledOnce();
    expect(HomeCatalogMock).toHaveBeenCalledWith({
      initialPodcasts: undefined,
    });
    expect(screen.getByTestId("home-catalog")).toBeInTheDocument();
  });
});
