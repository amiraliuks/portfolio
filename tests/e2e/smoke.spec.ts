import { expect, test } from "@playwright/test";

test("theme toggle updates document class", async ({ page }) => {
  await page.goto("/");

  const html = page.locator("html");
  const initialClass = await html.getAttribute("class");

  await page.getByRole("button", { name: "Toggle theme" }).click();

  await expect
    .poll(async () => html.getAttribute("class"))
    .not.toBe(initialClass);
});

test("bilingual blog post switches from EN to AL", async ({ page }) => {
  await page.goto("/blog/introducing-the-kosovo-government-domain-checker");

  await page.locator("header").getByRole("link", { name: "AL", exact: true }).click();

  await expect(page).toHaveURL(/\/blog\/prezentimi-i-kosovo-government-domain-checker/);
});

test("project gallery modal opens and supports actions", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: () => Promise.resolve(),
    });
  });

  await page.goto("/projects/unity-rubiks-cube");

  const imageTrigger = page.getByRole("button", { name: /open image/i }).first();
  await imageTrigger.click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  const downloadButton = page.getByRole("button", { name: /download/i });
  await expect(downloadButton).toBeVisible();
  await downloadButton.click();

  const shareButton = page.getByRole("button", { name: /share/i });
  await expect(shareButton).toBeVisible();
  await shareButton.click();

  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
});
