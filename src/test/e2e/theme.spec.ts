import { expect, test } from "@playwright/test";
import { preparePage } from "./helpers";

test.describe("tema", () => {
  test("alterna tema oscuro y persiste tras recargar", async ({ page }) => {
    await preparePage(page);
    await page.goto("/");
    await page.locator("button.theme-toggle").click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });
});
