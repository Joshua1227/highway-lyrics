import { test, expect } from '@playwright/test';

test('lyrics should be expandable', async ({ page, baseURL }) => {
  await page.goto(baseURL || 'http://localhost:3000');
  
  // Select a song if possible, or wait for one to appear
  const songButton = page.locator('ol button').first();
  await songButton.click();
  
  const expandButton = page.getByTitle('Toggle Expand');
  await expect(expandButton).toBeVisible();
  
  // Click expand
  await expandButton.click();
  
  // Verify lyrics container is expanded (e.g., search list is hidden)
  await expect(page.locator('ol')).not.toBeVisible();
  
  // Click expand again to collapse
  await expandButton.click();
  await expect(page.locator('ol')).toBeVisible();
});
