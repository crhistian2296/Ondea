import { describe, expect, it, vi, beforeEach } from "vitest";
import { HTTP_BAD_GATEWAY, fixtureRssFeed } from "@/lib";

const fetchExternalJson = vi.fn();

vi.mock("@/lib", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib")>();
  return {
    ...actual,
    fetchExternalJson: (...args: unknown[]) => fetchExternalJson(...args),
  };
});

describe("GET /api/podcasts", () => {
  beforeEach(() => {
    fetchExternalJson.mockReset();
  });

  it("returns feed json on success", async () => {
    fetchExternalJson.mockResolvedValue(fixtureRssFeed);
    const { GET } = await import("@/app/api/podcasts/route");
    const response = await GET();
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(fixtureRssFeed);
  });

  it("returns 502 on failure", async () => {
    fetchExternalJson.mockRejectedValue(new Error("fail"));
    const { GET } = await import("@/app/api/podcasts/route");
    const response = await GET();
    expect(response.status).toBe(HTTP_BAD_GATEWAY);
  });
});
