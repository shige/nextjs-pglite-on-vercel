import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  testMatch: "pglite-verify.spec.ts",
  use: {
    baseURL: "http://pglite-todos.localhost:1355",
    headless: true,
  },
  webServer: {
    command: "./scripts/portless.sh run --name pglite-todos next start",
    url: "http://pglite-todos.localhost:1355",
    reuseExistingServer: true,
    stdout: "pipe",
    stderr: "pipe",
    timeout: 120_000,
  },
});
