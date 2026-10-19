import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LoadError } from "@/components/shared";

describe("LoadError", () => {
  it("shows message and retries", () => {
    const onRetry = vi.fn();
    render(<LoadError message="Fallo" onRetry={onRetry} />);
    expect(screen.getByRole("alert")).toHaveTextContent("Fallo");
    fireEvent.click(screen.getByRole("button", { name: "Reintentar" }));
    expect(onRetry).toHaveBeenCalledOnce();
  });
});
