import { expect, test } from "@playwright/test";

test.describe("firstQuest score attack", () => {
  test("show firstQuest score attack, English", async ({ page }) => {
    await page.goto("/score/firstQuest/en");

    await expect(page).toHaveURL(/\/score\/firstQuest\/en/);
    await expect(page).toHaveTitle("The Legend of Zelda Score Attack");
  });

  test("show current seed", async ({ page }) => {
    const seed = "1234";
    await page.goto(`/score/firstQuest/en?seed=${seed}`);

    await expect(page).toHaveURL(/\/score\/firstQuest\/en/);
    const seedBadge = page.locator("span.chakra-badge");
    await expect(seedBadge).toHaveText(seed);
  });

  test.describe("update seed", () => {
    test("update seed", async ({ page }) => {
      await page.goto("/score/firstQuest/en");

      await expect(page).toHaveURL(/\/score\/firstQuest\/en/);
      await page.getByLabel("Seed").clear();
      await page.getByLabel("Seed").fill("1234");
      await page.click('button:has-text("Update Seed")');

      await expect(page).toHaveURL(/\/score\/firstQuest\/en\?seed=1234/);
    });

    test("reset seed", async ({ page }) => {
      const firstSeed = "1234";
      await page.goto(`/score/firstQuest/en?seed=${firstSeed}`);

      await expect(page).toHaveURL(/\/score\/firstQuest\/en\?seed=1234/);
      await page.click('button:has-text("Reset Seed")');

      const newUrl = new URL(page.url());
      const params = newUrl.searchParams;
      const seed = params.get("seed");
      expect(seed).not.toEqual(firstSeed);
    });
  });

  test.describe("switch category", () => {
    test("switch to secondQuest", async ({ page }) => {
      await page.goto("/score/firstQuest/en");

      await expect(page).toHaveURL(/\/score\/firstQuest\/en/);
      await page.click('a:has-text("2nd Quest")');
      await page.waitForURL(/\/secondQuest\/en/);

      await expect(page).toHaveURL(/\/score\/secondQuest\/en/);
      const categoryTitle = page.locator("h5");
      await expect(categoryTitle).toHaveText("Second Quest");
    });

    test("switch to Swordless", async ({ page }) => {
      await page.goto("/score/firstQuest/en");

      await expect(page).toHaveURL(/\/score\/firstQuest\/en/);
      await page.click('a:has-text("Swordless")');
      await page.waitForURL(/\/score\/swordless\/en/);

      await expect(page).toHaveURL(/\/score\/swordless\/en/);
      const categoryTitle = page.locator("h5");
      await expect(categoryTitle).toHaveText("Swordless");
    });
  });
});
