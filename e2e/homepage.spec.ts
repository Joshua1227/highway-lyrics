import { test, expect } from '@playwright/test';

test('homepage should load', async ({ page }) => {
  await page.goto('http://localhost:3001');
  await expect(page.locator('h1')).toContainText('Highway Lyrics');
});
