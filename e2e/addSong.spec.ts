import { test, expect } from '@playwright/test';

test.describe('Add Song Flow', () => {
  test('should submit a new song', async ({ page }) => {
    // Navigate to /login to authenticate first
    await page.goto('/login');
    
    // Fill the correct password
    await page.fill('input[name="answer"]', process.env.PASSWORD || 'HeartOfWorship');
    
    // Click and wait for navigation
    await Promise.all([
      page.waitForURL('**/addSongs'),
      page.click('button:has-text("Authenticate")', { force: true }),
    ]);
    
    // Click the "Add Song" button to open the editor
    await page.click('button:has-text("Add Song")');

    // Wait for the form to appear and fill it
    const rand = Math.random().toString(36).substring(7);
    const uniqueTitle = `Title${rand}`;
    await page.fill('input[placeholder="Title"]', uniqueTitle);
    await page.fill('textarea[placeholder="Lyrics"]', `Lyrics${rand}`);
    
    // Submit the form
    await page.click('button:has-text("Add Song")');

    // After submission, it should redirect to home
    await expect(page).toHaveURL('/');
  });
});
