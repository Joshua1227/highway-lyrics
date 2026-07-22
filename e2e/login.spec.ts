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

  test('should preserve redirect URL when trying to access protected page unauthenticated', async ({ page }) => {
    // Try to access edit page directly
    await page.goto('/editSong?songId=someInvalidId');

    // Expect redirect to login page with correct redirectTo parameter
    await expect(page).toHaveURL(/.*login\?redirectTo=.*/);
    expect(page.url()).toContain('redirectTo=%2FeditSong%3FsongId%3DsomeInvalidId');

    // Fill correct password and authenticate
    await page.fill('input[name="answer"]', process.env.PASSWORD || 'HeartOfWorship');
    await page.click('button:has-text("Authenticate")');

    // Should successfully navigate back to the original editSong URL
    await page.waitForURL('**/editSong?songId=someInvalidId', { timeout: 10000 });
    await expect(page).toHaveURL(/.*editSong\?songId=someInvalidId/);
  });

  test('should preserve redirect URL when trying to access addSongs unauthenticated', async ({ page }) => {
    // Try to access addSongs page directly
    await page.goto('/addSongs');

    // Expect redirect to login page with correct redirectTo parameter
    await expect(page).toHaveURL(/.*login\?redirectTo=%2FaddSongs/);

    // Fill correct password and authenticate
    await page.fill('input[name="answer"]', process.env.PASSWORD || 'HeartOfWorship');
    await page.click('button:has-text("Authenticate")');

    // Should successfully navigate back to the /addSongs URL
    await page.waitForURL('**/addSongs', { timeout: 10000 });
    await expect(page).toHaveURL(/.*addSongs/);
  });
});
