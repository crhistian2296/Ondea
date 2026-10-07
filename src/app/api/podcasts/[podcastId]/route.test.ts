import { describe, expect, it, vi, beforeEach } from "vitest";
import { HTTP_BAD_GATEWAY, fixtureLookupResponse } from "@/lib";

const fetchExternalJson = vi.fn();

vi.mock("@/lib/fetch-external/fetch-external", () => ({
  fetchExternalJson: (...args: unknown[]) => fetchExternalJson(...args),
}));

describe("GET /api/podcasts/[podcastId]", () => {
  beforeEach(() => {
    fetchExternalJson.mockReset();
  });

  it("returns lookup json on success", async () => {
    fetchExternalJson.mockResolvedValue(fixtureLookupResponse);
    const { GET } = await import("@/app/api/podcasts/[podcastId]/route");
    const response = await GET(new Request("http://test"), {
      params: Promise.resolve({ podcastId: "1001" }),
    });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(fixtureLookupResponse);
  });

  it("returns 502 on failure", async () => {
    fetchExternalJson.mockRejectedValue(new Error("fail"));
    const { GET } = await import("@/app/api/podcasts/[podcastId]/route");
    const response = await GET(new Request("http://test"), {
      params: Promise.resolve({ podcastId: "1001" }),
    });
    expect(response.status).toBe(HTTP_BAD_GATEWAY);
  });
});
