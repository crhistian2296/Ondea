import { fireEvent, render, screen } from "@testing-library/react";
import Link from "next/link";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { useRouteTransitionFeedback } from "@/hooks";
import { NavigationProvider, useNavigationUi } from "@/context";

const pathname = vi.fn(() => "/");

vi.mock("next/navigation", () => ({
  usePathname: () => pathname(),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

function Probe() {
  useRouteTransitionFeedback();
  const { isNavigating } = useNavigationUi();
  return <span data-testid="nav">{isNavigating ? "yes" : "no"}</span>;
}

describe("useRouteTransitionFeedback", () => {
  beforeEach(() => {
    pathname.mockReturnValue("/");
    document.body.innerHTML = "";
  });

  it("sets navigating on internal link click", () => {
    render(
      <NavigationProvider>
        <Link href="/podcast/1">Go</Link>
        <Probe />
      </NavigationProvider>,
    );

    fireEvent.click(screen.getByRole("link", { name: "Go" }));
    expect(screen.getByTestId("nav")).toHaveTextContent("yes");
  });

  it("ignores external links", () => {
    render(
      <NavigationProvider>
        <a href="https://example.com">External</a>
        <Probe />
      </NavigationProvider>,
    );

    fireEvent.click(screen.getByRole("link", { name: "External" }));
    expect(screen.getByTestId("nav")).toHaveTextContent("no");
  });

  it("ignores same pathname", () => {
    render(
      <NavigationProvider>
        <Link href="/">Home</Link>
        <Probe />
      </NavigationProvider>,
    );

    fireEvent.click(screen.getByRole("link", { name: "Home" }));
    expect(screen.getByTestId("nav")).toHaveTextContent("no");
  });
});
