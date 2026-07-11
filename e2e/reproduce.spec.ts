import { test, expect } from '@playwright/test';

test.describe('Verify authentication fix', () => {
  test('should fail to navigate when typing lowercase password and show a valid error', async ({ page }) => {
    await page.goto('/login');
    
    // Fill the lowercase version of process.env.PASSWORD
    await page.fill('input[name="answer"]', 'heartofworship');
    
    // Click authenticate
    await page.click('button:has-text("Authenticate")');
    
    // It should not navigate and should show the error message "Incorrect password"
    const errorMessage = await page.locator('#error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Incorrect password');
    await expect(page).toHaveURL(/.*login/);
  });

  test('should successfully navigate when typing the correct password', async ({ page }) => {
    await page.goto('/login');
    
    // Fill the correct password
    await page.fill('input[name="answer"]', process.env.PASSWORD || 'HeartOfWorship');
    
    // Click authenticate
    await page.click('button:has-text("Authenticate")');
    
    // It should successfully navigate to /addSongs
    await page.waitForURL('**/addSongs', { timeout: 10000 });
    await expect(page).toHaveURL(/.*addSongs/);
  });
});
