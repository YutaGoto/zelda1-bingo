import { expect, test } from "@playwright/test";

test.describe("firstQuest bingo", () => {
  test.describe("i18n", () => {
    test("show firstQuest bingo, English", async ({ page }) => {
      await page.goto("/firstQuest/en");

      await page.waitForURL(/\/firstQuest\/en/);
      await expect(page).toHaveTitle("The Legend of Zelda Bingo");

      const contentTitle = page.locator("h1");
      await expect(contentTitle).toHaveText("Zelda1 Bingo Sheet");

      const categoryTitle = page.locator("h5");
      await expect(categoryTitle).toHaveText("First Quest");
    });

    test("show firstQuest bingo, Japanese", async ({ page }) => {
      await page.goto("/firstQuest/ja");

      await page.waitForURL(/\/firstQuest\/ja/);
      await expect(page).toHaveTitle("The Legend of Zelda Bingo");

      const contentTitle = page.locator("h1");
      await expect(contentTitle).toHaveText("ゼルダの伝説1 ビンゴ シート");

      const categoryTitle = page.locator("h5");
      await expect(categoryTitle).toHaveText("First Quest");
    });
  });

  test("show current seed", async ({ page }) => {
    const seed = "1234";
    await page.goto(`/firstQuest/en?seed=${seed}`);

    await page.waitForURL(/\/firstQuest\/en/);
    const seedBadge = page.locator("span.chakra-badge");
    await expect(seedBadge).toHaveText(seed);
  });

  test("bingo count", async ({ page }) => {
    await page.goto("/firstQuest/en");

    await page.waitForURL(/\/firstQuest\/en/);
    await page.locator("div#bingoCard").waitFor();
    const bingoCount = page.locator("p.chakra-text.bingo-count");
    await expect(bingoCount).toHaveText("0 lines Bingo");
  });

  test("show 1 line bingo", async ({ page }) => {
    await page.goto("/firstQuest/en");

    await page.waitForURL(/\/firstQuest\/en/);
    await page.locator("div#bingoCard").waitFor();
    await page.click("div.cell:first-child", { position: { x: 5, y: 5 } });
    await page.click("div.cell:nth-child(2)", { position: { x: 5, y: 5 } });
    await page.click("div.cell:nth-child(3)", { position: { x: 5, y: 5 } });
    await page.click("div.cell:nth-child(4)", { position: { x: 5, y: 5 } });
    await page.click("div.cell:nth-child(5)", { position: { x: 5, y: 5 } });

    const bingoCount = page.locator("p.chakra-text.bingo-count");
    await expect(bingoCount).toHaveText("1 line Bingo");
  });

  test.describe("update seed", () => {
    test("update seed", async ({ page }) => {
      await page.goto("/firstQuest/en");

      await page.waitForURL(/\/firstQuest\/en/);
      await page.getByLabel("Seed").clear();
      await page.getByLabel("Seed").fill("1234");
      await page.click('button:has-text("Update Seed")');

      await expect(page).toHaveURL(/\/firstQuest\/en\?seed=1234/);
    });

    test("reset seed", async ({ page }) => {
      const firstSeed = "1234";
      await page.goto(`/firstQuest/en?seed=${firstSeed}`);

      await page.waitForURL(/\/firstQuest\/en\?seed=1234/);
      await page.click('button:has-text("Reset Seed")');

      const newUrl = new URL(page.url());
      const params = newUrl.searchParams;
      const seed = params.get("seed");
      expect(seed).not.toEqual(firstSeed);
    });
  });

  test.describe("switch category", () => {
    test("switch to secondQuest", async ({ page }) => {
      await page.goto("/firstQuest/en");

      await page.waitForURL(/\/firstQuest\/en/);
      await page.click('a:has-text("2nd Quest")');
      await page.waitForURL(/\/secondQuest\/en/);

      await expect(page).toHaveURL(/\/secondQuest\/en/);
      const categoryTitle = page.locator("h5");
      await expect(categoryTitle).toHaveText("Second Quest");
    });

    test("switch to swordless", async ({ page }) => {
      await page.goto("/firstQuest/en");

      await page.waitForURL(/\/firstQuest\/en/);
      await page.click('a:has-text("Swordless")');
      await page.waitForURL(/\/swordless\/en/);

      await expect(page).toHaveURL(/\/swordless\/en/);
      const categoryTitle = page.locator("h5");
      await expect(categoryTitle).toHaveText("Swordless");
    });
  });
});
