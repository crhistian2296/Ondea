import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

vi.mock("next/image", () => import("@/test/mocks/next-image"));

afterEach(() => {
  cleanup();
  localStorage.clear();
});
