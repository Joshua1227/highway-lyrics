import { test, expect } from '@playwright/test';

test.describe('Edit Song Flow & Authentication', () => {
  test('should redirect to login when accessing editSong unauthenticated', async ({ page }) => {
    // 1. Try to access edit page directly
    await page.goto('/editSong?songId=someInvalidId');
    
    // 2. Expect redirect to login page
    await expect(page).toHaveURL(/.*login/);
  });

  test('should successfully edit an existing song when authenticated', async ({ page }) => {
    // 1. Log in first
    await page.goto('/login');
    await page.fill('input[name="answer"]', process.env.PASSWORD || 'HeartOfWorship');
    await page.click('button:has-text("Authenticate")');
    await page.waitForURL('**/addSongs');

    // 2. Add a new song to edit
    await page.click('button:has-text("Add Song")');
    const rand = Math.random().toString(36).substring(7);
    const originalTitle = `TitleToEdit${rand}`;
    const originalLyrics = `LyricsToEdit${rand}`;
    
    await page.fill('input[placeholder="Title"]', originalTitle);
    await page.fill('textarea[placeholder="Lyrics"]', originalLyrics);
    await page.click('button:has-text("Add Song")');

    // 3. We are back home. Find and click the newly added song to view it
    await page.waitForURL('http://localhost:3001/');
    const songButton = page.locator(`button:has-text("${originalTitle}")`);
    await expect(songButton).toBeVisible();
    await songButton.click();

    // 4. Verify original lyrics are shown and the edit button is visible
    await expect(page.locator(`text=${originalLyrics}`)).toBeVisible();
    const editButton = page.locator('button[title="Edit Song"]');
    await expect(editButton).toBeVisible();

    // 5. Click the Edit button
    await editButton.click();

    // 6. Verify we are on the Edit Song page with pre-filled fields
    await page.waitForURL(/.*editSong.*/);
    const titleInput = page.locator('input[placeholder="Title"]');
    const lyricsInput = page.locator('textarea[placeholder="Lyrics"]');
    
    await expect(titleInput).toHaveValue(originalTitle);
    await expect(lyricsInput).toHaveValue(originalLyrics);

    // 7. Make modifications and click Save Changes
    const updatedTitle = `${originalTitle} Updated`;
    const updatedLyrics = `${originalLyrics} Updated`;
    
    await page.fill('input[placeholder="Title"]', updatedTitle);
    await page.fill('textarea[placeholder="Lyrics"]', updatedLyrics);
    await page.click('button:has-text("Save Changes")');

    // 8. Verify redirect to homepage and verify updated title and lyrics are visible
    await page.waitForURL('http://localhost:3001/');
    const updatedSongButton = page.locator(`button:has-text("${updatedTitle}")`);
    await expect(updatedSongButton).toBeVisible();
    await updatedSongButton.click();
    await expect(page.locator(`text=${updatedLyrics}`)).toBeVisible();
  });
});
