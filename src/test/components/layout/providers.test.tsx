import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Providers } from "@/components/layout";

describe("Providers", () => {
  it("renders children inside app providers", () => {
    render(
      <Providers>
        <span>Child</span>
      </Providers>,
    );
    expect(screen.getByText("Child")).toBeInTheDocument();
  });
});
