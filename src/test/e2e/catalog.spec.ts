import { expect, test } from "@playwright/test";
import { preparePage } from "./helpers";

test.describe("catálogo", () => {
  test("muestra podcasts de fixture y filtra por búsqueda", async ({
    page,
  }) => {
    await preparePage(page);
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: /Fixture Show/i }),
    ).toBeVisible();
    await expect(page.locator(".badge")).toHaveText("2");

    const search = page.getByLabel("Filtrar podcasts");
    await search.fill("");
    await search.pressSequentially("NPR");
    await expect(page.locator(".badge")).toHaveText("1", { timeout: 10_000 });
    await expect(
      page.getByRole("link", { name: /Fixture Show/i }),
    ).not.toBeVisible();
  });

  test("filtra por género", async ({ page }) => {
    await preparePage(page);
    await page.goto("/");
    await page.getByLabel("Filtrar por género").selectOption({
      label: "Music Commentary",
    });
    await expect(page.locator(".badge")).toHaveText("1", { timeout: 10_000 });
    await expect(
      page.getByRole("link", { name: /Fixture Show/i }),
    ).toBeVisible();
  });
});
