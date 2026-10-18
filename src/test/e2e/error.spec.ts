import { expect, test } from "@playwright/test";
import { preparePage } from "./helpers";

test.describe("errores de carga", () => {
  test("muestra aviso y reintento cuando falla el listado", async ({
    page,
  }) => {
    await preparePage(page, { clearAllStorage: true });
    await page.route("**/api/podcasts", async (route) => {
      if (route.request().method() !== "GET") {
        await route.continue();
        return;
      }
      await route.fulfill({
        status: 502,
        contentType: "application/json",
        body: JSON.stringify({ feed: { entry: [] } }),
      });
    });

    await page.goto("/");
    await expect(
      page.getByText("No se pudieron cargar los podcasts."),
    ).toBeVisible({ timeout: 15_000 });
    await expect(
      page.getByRole("button", { name: "Reintentar" }),
    ).toBeVisible();
  });
});
