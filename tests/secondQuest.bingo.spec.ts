import { expect, test } from "@playwright/test";

test.describe("secondQuest bingo", () => {
  test.describe("i18n", () => {
    test("show secondQuest bingo, English", async ({ page }) => {
      await page.goto("/secondQuest/en");

      await expect(page).toHaveURL(/\/secondQuest\/en/);
      await expect(page).toHaveTitle("The Legend of Zelda Bingo");

      const contentTitle = page.locator("h1");
      await expect(contentTitle).toHaveText("Zelda1 Bingo Sheet");

      const categoryTitle = page.locator("h5");
      await expect(categoryTitle).toHaveText("Second Quest");
    });

    test("show secondQuest bingo, Japanese", async ({ page }) => {
      await page.goto("/secondQuest/ja");

      await expect(page).toHaveURL(/\/secondQuest\/ja/);
      await expect(page).toHaveTitle("The Legend of Zelda Bingo");

      const contentTitle = page.locator("h1");
      await expect(contentTitle).toHaveText("ゼルダの伝説1 ビンゴ シート");

      const categoryTitle = page.locator("h5");
      await expect(categoryTitle).toHaveText("Second Quest");
    });
  });

  test("show current seed", async ({ page }) => {
    const seed = "1234";
    await page.goto(`/secondQuest/en?seed=${seed}`);

    await expect(page).toHaveURL(/\/secondQuest\/en/);
    const seedBadge = page.locator("span.chakra-badge");
    await expect(seedBadge).toHaveText(seed);
  });

  test.describe("update seed", () => {
    test("update seed", async ({ page }) => {
      await page.goto("/secondQuest/en");

      await expect(page).toHaveURL(/\/secondQuest\/en/);
      await page.getByLabel("Seed").clear();
      await page.getByLabel("Seed").fill("1234");
      await page.click('button:has-text("Update Seed")');

      await expect(page).toHaveURL(/\/secondQuest\/en\?seed=1234/);
    });

    test("reset seed", async ({ page }) => {
      const secondSeed = "1234";
      await page.goto(`/secondQuest/en?seed=${secondSeed}`);

      await expect(page).toHaveURL(/\/secondQuest\/en\?seed=1234/);
      await page.click('button:has-text("Reset Seed")');

      const newUrl = new URL(page.url());
      const params = newUrl.searchParams;
      const seed = params.get("seed");
      expect(seed).not.toEqual(secondSeed);
    });
  });

  test.describe("switch category", () => {
    test("switch to firstQuest", async ({ page }) => {
      await page.goto("/secondQuest/en");

      await expect(page).toHaveURL(/\/secondQuest\/en/);
      await page.click('a:has-text("1st Quest")');
      await page.waitForURL(/\/firstQuest\/en/);

      await expect(page).toHaveURL(/\/firstQuest\/en/);
      const categoryTitle = page.locator("h5");
      await expect(categoryTitle).toHaveText("First Quest");
    });

    test("switch to swordless", async ({ page }) => {
      await page.goto("/firstQuest/en");

      await expect(page).toHaveURL(/\/firstQuest\/en/);
      await page.click('a:has-text("Swordless")');
      await page.waitForURL(/\/swordless\/en/);

      await expect(page).toHaveURL(/\/swordless\/en/);
      const categoryTitle = page.locator("h5");
      await expect(categoryTitle).toHaveText("Swordless");
    });
  });
});
