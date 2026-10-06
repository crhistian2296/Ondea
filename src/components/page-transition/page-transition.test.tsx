import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PageTransition } from "@/components";

describe("PageTransition", () => {
  it("renders children", () => {
    render(
      <PageTransition>
        <p>Content</p>
      </PageTransition>,
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
