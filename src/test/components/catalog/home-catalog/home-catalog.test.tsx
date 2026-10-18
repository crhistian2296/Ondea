import { fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { HomeCatalog } from "@/components/catalog";
import { CATALOG_SKELETON_COUNT } from "@/lib";
import { fixturePodcast, fixturePodcastTwo } from "@/test/fixtures";
import { renderWithProviders } from "@/test/render-with-providers";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("HomeCatalog", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders podcast grid from initial data", () => {
    renderWithProviders(
      <HomeCatalog initialPodcasts={[fixturePodcast, fixturePodcastTwo]} />,
    );
    expect(screen.getByText(fixturePodcast.title)).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("filters by search", () => {
    renderWithProviders(
      <HomeCatalog initialPodcasts={[fixturePodcast, fixturePodcastTwo]} />,
    );
    fireEvent.change(screen.getByLabelText("Filtrar podcasts"), {
      target: { value: "NPR" },
    });
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.queryByText(fixturePodcast.title)).not.toBeInTheDocument();
  });

  it("shows empty state", () => {
    renderWithProviders(<HomeCatalog initialPodcasts={[fixturePodcast]} />);
    fireEvent.change(screen.getByLabelText("Filtrar podcasts"), {
      target: { value: "zzzz" },
    });
    expect(
      screen.getByText(/No se encontraron podcasts con ese filtro/),
    ).toBeInTheDocument();
  });

  it("shows skeletons while pending without data", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise(() => undefined)),
    );
    const { container } = renderWithProviders(<HomeCatalog />);
    await waitFor(() => {
      expect(container.querySelectorAll(".skeleton--card")).toHaveLength(
        CATALOG_SKELETON_COUNT,
      );
    });
  });

  it("shows error and retries", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: false, status: 500 })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ feed: { entry: [] } }),
      });
    vi.stubGlobal("fetch", fetchMock);

    renderWithProviders(<HomeCatalog />);
    await waitFor(() =>
      expect(
        screen.getByText("No se pudieron cargar los podcasts."),
      ).toBeInTheDocument(),
    );
    fireEvent.click(screen.getByRole("button", { name: "Reintentar" }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
  });
});
