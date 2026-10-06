import { expect, test } from "@playwright/test";
import { preparePage } from "./helpers";

test.describe("navegación", () => {
  test("abre ficha de podcast y episodio con audio", async ({ page }) => {
    await preparePage(page);
    await page.goto("/");
    await page.getByRole("link", { name: /Fixture Show/i }).click();
    await expect(page.getByText(/Episodes: 1/)).toBeVisible();
    await page.getByRole("link", { name: "Fixture Episode" }).first().click();
    await expect(
      page.getByRole("heading", { level: 1, name: "Fixture Episode" }),
    ).toBeVisible();
    await expect(page.locator("audio")).toHaveAttribute(
      "src",
      "https://example.com/episode.mp3",
    );
  });
});
