import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RichDescription } from "@/components/shared";

describe("RichDescription", () => {
  it("shows empty message for blank content", () => {
    render(<RichDescription content="   " />);
    expect(screen.getByText("Sin descripción disponible.")).toBeInTheDocument();
  });

  it("renders sanitized html", () => {
    render(<RichDescription content="Hello\nworld" />);
    expect(screen.getByText(/Hello/)).toBeInTheDocument();
  });
});
