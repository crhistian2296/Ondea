import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  reporter: "list",
  testMatch: /error\.spec\.ts/,
  use: {
    baseURL: "http://127.0.0.1:3002",
    trace: "on-first-retry",
    ...devices["Desktop Chrome"],
  },
  webServer: {
    command: "pnpm dev --port 3002",
    url: "http://127.0.0.1:3002",
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      ...process.env,
      ONDEA_E2E_FIXTURES: "1",
      ONDEA_E2E_FIXTURES_FAIL: "1",
    },
  },
});
