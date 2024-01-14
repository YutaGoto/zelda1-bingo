import { expect, test } from "@playwright/test";

test("show firstQuest bingo, English", async ({ page }) => {
  await page.goto("/firstQuest/en/");

  await expect(page).toHaveURL(/\/firstQuest\/en\//);
  await expect(page).toHaveTitle("The Legend of Zelda Bingo");

  const contentTitle = page.locator("h1");
  await expect(contentTitle).toHaveText("Zelda1 Bingo Sheet");

  const categoryTitle = page.locator("h5");
  await expect(categoryTitle).toHaveText("First Quest");
});

test("show firstQuest bingo, Japanese", async ({ page }) => {
  await page.goto("/firstQuest/ja/");

  await expect(page).toHaveURL(/\/firstQuest\/ja\//);
  await expect(page).toHaveTitle("The Legend of Zelda Bingo");

  const contentTitle = page.locator("h1");
  await expect(contentTitle).toHaveText("ゼルダの伝説1 ビンゴ シート");

  const categoryTitle = page.locator("h5");
  await expect(categoryTitle).toHaveText("First Quest");
});

test("update seed", async ({ page }) => {
  await page.goto("/firstQuest/en/");

  await expect(page).toHaveURL(/\/firstQuest\/en\//);
  await page.getByLabel("Seed").clear();
  await page.getByLabel("Seed").fill("1234");
  await page.click('button:has-text("Update Seed")');

  await expect(page).toHaveURL(/\/firstQuest\/en\/\?seed=1234/);
});
