import exp from "constants";
import { expect, test } from "@playwright/test";

test.describe("firstQuest bingo", () => {
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

  test.describe("seed", () => {
    test("update seed", async ({ page }) => {
      await page.goto("/firstQuest/en/");

      await expect(page).toHaveURL(/\/firstQuest\/en\//);
      await page.getByLabel("Seed").clear();
      await page.getByLabel("Seed").fill("1234");
      await page.click('button:has-text("Update Seed")');

      await expect(page).toHaveURL(/\/firstQuest\/en\/\?seed=1234/);
    });

    test("copy seed", async ({ page }) => {
      await page.goto("/firstQuest/en/");

      await expect(page).toHaveURL(/\/firstQuest\/en\//);
      await page.getByLabel("Seed").clear();
      await page.getByLabel("Seed").fill("1234");
      await page.click('button:has-text("Copy input Seed")');

      await expect(
        page.locator("div.chakra-toast:has-text('copied input seed')"),
      ).toBeVisible();
      const clipboardText = await page.evaluate(() =>
        navigator.clipboard.readText(),
      );

      expect(clipboardText).toBe("1234");
    });

    test("copy current URL", async ({ page }) => {
      await page.goto("/firstQuest/en/?seed=1234");

      await expect(page).toHaveURL(/\/firstQuest\/en\//);
      await page.click('button:has-text("Copy Current URL")');

      await expect(
        page.locator("div.chakra-toast:has-text('Copied Current URL')"),
      ).toBeVisible();
      const clipboardText = await page.evaluate(() =>
        navigator.clipboard.readText(),
      );

      expect(clipboardText).toBe(
        "http://localhost:5173/firstQuest/en/?seed=1234",
      );
    });

    test("copy new seed URL", async ({ page }) => {
      await page.goto("/firstQuest/en/");

      await expect(page).toHaveURL(/\/firstQuest\/en\//);
      await page.getByLabel("Seed").clear();
      await page.getByLabel("Seed").fill("2345");
      await page.click('button:has-text("Copy New Seed URL")');

      await expect(
        page.locator("div.chakra-toast:has-text('Copied New Seed URL')"),
      ).toBeVisible();
      const clipboardText = await page.evaluate(() =>
        navigator.clipboard.readText(),
      );

      expect(clipboardText).toBe(
        "http://localhost:5173/firstQuest/en/?seed=2345",
      );
    });

    test("reset seed", async ({ page }) => {
      const seed = "1234";
      await page.goto(`/firstQuest/en/?seed=${seed}`);

      await expect(page).toHaveURL(/\/firstQuest\/en\/\?seed=1234/);
      await page.click('button:has-text("Reset Seed")');

      await expect(page).toHaveURL(/\/firstQuest\/en\//);
      await expect(page).not.toHaveURL(/\?seed=1234/);
    });
  });

  test("switch language", async ({ page }) => {});
});
