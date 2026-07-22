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

  test('should redirect to login and back to addSongs when clicking Add Song button while unauthenticated', async ({ page }) => {
    // 1. Go to homepage
    await page.goto('/');

    // 2. Click the "Add Song" button
    const addSongButton = page.locator('button:has-text("Add Song")');
    await expect(addSongButton).toBeVisible();
    await addSongButton.click();

    // 3. Expect to be on login page with correct query param
    await page.waitForURL(/.*login\?redirectTo=%2FaddSongs/);
    await expect(page).toHaveURL(/.*login\?redirectTo=%2FaddSongs/);

    // 4. Fill password and authenticate
    await page.fill('input[name="answer"]', process.env.PASSWORD || 'HeartOfWorship');
    await page.click('button:has-text("Authenticate")');

    // 5. Should end up on the /addSongs page
    await page.waitForURL('**/addSongs', { timeout: 10000 });
    await expect(page).toHaveURL(/.*addSongs/);
    await expect(page.locator('h1:has-text("Add Songs")')).toBeVisible();
  });

  test('should redirect to login and back to editSong when clicking Edit Song button while unauthenticated', async ({ page, context }) => {
    // 1. Log in first to add a test song
    await page.goto('/login');
    await page.fill('input[name="answer"]', process.env.PASSWORD || 'HeartOfWorship');
    await page.click('button:has-text("Authenticate")');
    await page.waitForURL('**/addSongs');

    // 2. Add a new song
    await page.click('button:has-text("Add Song")');
    const rand = Math.random().toString(36).substring(7);
    const originalTitle = `RedirectUIEditTitle${rand}`;
    const originalLyrics = `RedirectUIEditLyrics${rand}`;
    
    await page.fill('input[placeholder="Title"]', originalTitle);
    await page.fill('textarea[placeholder="Lyrics"]', originalLyrics);
    await page.click('button:has-text("Add Song")');
    await page.waitForURL('http://localhost:3001/');

    // 3. Clear cookies to become unauthenticated
    await context.clearCookies();

    // 4. Go back to homepage unauthenticated
    await page.goto('/');

    // 5. Find and click the newly added song to view it
    const songButton = page.locator(`button:has-text("${originalTitle}")`);
    await expect(songButton).toBeVisible();
    await songButton.click();

    // 6. Click the Edit button
    const editButton = page.locator('button[title="Edit Song"]');
    await expect(editButton).toBeVisible();
    await editButton.click();

    // 7. Verify we are redirected to login with the correct redirectTo parameter
    await page.waitForURL(/.*login\?redirectTo=.*/);
    expect(page.url()).toContain('redirectTo=%2FeditSong%3FsongId%3D');

    // 8. Log in again
    await page.fill('input[name="answer"]', process.env.PASSWORD || 'HeartOfWorship');
    await page.click('button:has-text("Authenticate")');

    // 9. Verify we land on the Edit page for that song
    await page.waitForURL(/.*editSong.*/, { timeout: 10000 });
    await expect(page).toHaveURL(/.*editSong\?songId=.*/);
    const titleInput = page.locator('input[placeholder="Title"]');
    await expect(titleInput).toHaveValue(originalTitle);
  });
});
