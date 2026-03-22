import { test, expect } from "@playwright/test";

test("persists todos in IndexedDB across reloads", async ({ page }) => {
  const todoText = `Verify persistence ${Date.now()}`;

  await page.goto("/");
  await page.waitForFunction(
    () => !document.body.textContent?.includes("Loading browser database..."),
  );

  await page.getByPlaceholder("Draft the next task...").fill(todoText);
  await page.getByRole("button", { name: "Add" }).click();
  await expect(page.getByText(todoText)).toBeVisible();

  const databases = await page.evaluate(async () => {
    if (typeof indexedDB.databases !== "function") {
      return [];
    }

    return await indexedDB.databases();
  });

  console.log(`IndexedDB databases: ${JSON.stringify(databases)}`);

  await page.reload();
  await page.waitForFunction(
    () => !document.body.textContent?.includes("Loading browser database..."),
  );
  await expect(page.getByText(todoText)).toBeVisible();
  expect(JSON.stringify(databases)).toContain("todos-db");
});
