import { expect, test } from "@playwright/test";

test("redirect to bingo", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveURL(/\/firstQuest\/en/);
});
