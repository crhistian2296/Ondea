import type { Page } from "@playwright/test";

export async function preparePage(
  page: Page,
  options?: { clearAllStorage?: boolean },
) {
  await page.addInitScript((clearAll) => {
    if (clearAll) {
      localStorage.clear();
      return;
    }
    localStorage.removeItem("ondea-query-cache");
  }, options?.clearAllStorage ?? false);
}
