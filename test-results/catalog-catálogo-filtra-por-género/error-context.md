# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: catalog.spec.ts >> catálogo >> filtra por género
- Location: e2e\catalog.spec.ts:24:7

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('.badge')
Expected: "1"
Received: "24"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" locator('.badge') with timeout 10000ms
  - waiting for locator('.badge')
    24 × locator resolved to <span class="badge">24</span>
       - unexpected value "24"

```

```yaml
- text: "24"
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { preparePage } from "./helpers";
  3  | 
  4  | test.describe("catálogo", () => {
  5  |   test("muestra podcasts de fixture y filtra por búsqueda", async ({
  6  |     page,
  7  |   }) => {
  8  |     await preparePage(page);
  9  |     await page.goto("/");
  10 |     await expect(
  11 |       page.getByRole("link", { name: /Fixture Show/i }),
  12 |     ).toBeVisible();
  13 |     await expect(page.locator(".badge")).toHaveText("2");
  14 | 
  15 |     const search = page.getByLabel("Filtrar podcasts");
  16 |     await search.fill("");
  17 |     await search.pressSequentially("NPR");
  18 |     await expect(page.locator(".badge")).toHaveText("1", { timeout: 10_000 });
  19 |     await expect(
  20 |       page.getByRole("link", { name: /Fixture Show/i }),
  21 |     ).not.toBeVisible();
  22 |   });
  23 | 
  24 |   test("filtra por género", async ({ page }) => {
  25 |     await preparePage(page);
  26 |     await page.goto("/");
  27 |     await page.getByLabel("Filtrar por género").selectOption({
  28 |       label: "Music Commentary",
  29 |     });
> 30 |     await expect(page.locator(".badge")).toHaveText("1", { timeout: 10_000 });
     |                                          ^ Error: expect(locator).toHaveText(expected) failed
  31 |     await expect(
  32 |       page.getByRole("link", { name: /Fixture Show/i }),
  33 |     ).toBeVisible();
  34 |   });
  35 | });
  36 | 
```