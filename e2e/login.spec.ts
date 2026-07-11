import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should authenticate with correct password', async ({ page }) => {
    await page.goto('/login');
    
    // Fill correct password
    await page.fill('input[name="answer"]', process.env.PASSWORD || 'HeartOfWorship');
    await page.click('button:has-text("Authenticate")');
    
    // Wait for navigation to /addSongs
    await page.waitForURL('**/addSongs', { timeout: 10000 });
    await expect(page).toHaveURL(/.*addSongs/);
  });

  test('should show error with lowercase password', async ({ page }) => {
    await page.goto('/login');
    
    // Fill lowercase (incorrect) password
    await page.fill('input[name="answer"]', 'heartofworship');
    await page.click('button:has-text("Authenticate")');
    
    // It should not navigate and should show the error message "Incorrect password"
    const errorMessage = await page.locator('#error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Incorrect password');
    await expect(page).toHaveURL(/.*login/);
  });

  test('should work after a long session (simulated)', async ({ page, context }) => {
    await page.goto('/login');
    
    // Clear cookies to simulate expired session
    await context.clearCookies();
    
    // Enter correct password to log in again
    await page.fill('input[name="answer"]', process.env.PASSWORD || 'HeartOfWorship');
    await page.click('button:has-text("Authenticate")');
    
    // Should successfully redirect
    await page.waitForURL('**/addSongs', { timeout: 10000 });
    await expect(page).toHaveURL(/.*addSongs/);
  });
});
