import { describe, expect, it } from "vitest";
import { formatDate, formatDuration } from "@/lib";

describe("formatDuration", () => {
  it("formats minutes and seconds", () => {
    expect(formatDuration(15 * 60 * 1000 + 3 * 1000)).toBe("15:03");
  });

  it("formats hours", () => {
    expect(formatDuration(75 * 60 * 1000)).toBe("1:15:00");
  });

  it("handles missing values", () => {
    expect(formatDuration()).toBe("--:--");
  });
});

describe("formatDate", () => {
  it("formats as day/month/year", () => {
    expect(formatDate("2016-03-01T12:00:00.000Z")).toContain("2016");
  });
});
