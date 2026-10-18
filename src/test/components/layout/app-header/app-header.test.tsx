import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppHeader } from "@/components/layout";
import { NavigationProvider, ThemeProvider } from "@/context";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("@/hooks", () => ({
  useRouteTransitionFeedback: () => undefined,
}));

function renderHeader() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={client}>
      <ThemeProvider>
        <NavigationProvider>
          <AppHeader />
        </NavigationProvider>
      </ThemeProvider>
    </QueryClientProvider>,
  );
}

describe("AppHeader", () => {
  it("renders logo and theme toggle", () => {
    renderHeader();
    expect(screen.getByRole("link", { name: /Ondea/i })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
