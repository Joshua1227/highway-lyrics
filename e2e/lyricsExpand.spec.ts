import { test, expect } from '@playwright/test';

test.describe('Lyrics expand/collapse styling', () => {
  test('should increase font size and center-align lyrics when expanded, then revert when collapsed', async ({
    page,
  }) => {
    // 1. Start on the homepage
    await page.goto('http://localhost:3001');
    await expect(page.locator('h1')).toContainText('Highway Lyrics');

    // 2. Select the first available song so lyrics are rendered
    const firstSong = page.locator('ol li button').first();
    await expect(firstSong).toBeVisible();
    await firstSong.click();

    // 3. Wait for lyrics to render and locate the lyrics text container
    const lyrics = page.locator('div.whitespace-pre-wrap');
    await expect(lyrics).toBeVisible();

    // 4. Locate the expand button and assert it is present
    const expandButton = page.locator('button[title="Expand Lyrics"]');
    await expect(expandButton).toBeVisible();

    // 5. Assert default (collapsed) styles
    const defaultFontSize = await lyrics.evaluate(
      (el) => getComputedStyle(el).fontSize
    );
    const defaultTextAlign = await lyrics.evaluate(
      (el) => getComputedStyle(el).textAlign
    );
    expect(defaultTextAlign).toBe('left');

    // 6. Expand the lyrics
    await expandButton.click();

    // 7. Assert expanded styles: larger font-size and centered text
    const expandedFontSize = await lyrics.evaluate(
      (el) => getComputedStyle(el).fontSize
    );
    const expandedTextAlign = await lyrics.evaluate(
      (el) => getComputedStyle(el).textAlign
    );
    expect(expandedTextAlign).toBe('center');

    const defaultSize = parseFloat(defaultFontSize);
    const expandedSize = parseFloat(expandedFontSize);
    expect(expandedSize).toBeGreaterThan(defaultSize);

    // 8. Collapse again and assert styles revert to original
    const collapseButton = page.locator('button[title="Collapse Lyrics"]');
    await expect(collapseButton).toBeVisible();
    await collapseButton.click();

    const revertedFontSize = await lyrics.evaluate(
      (el) => getComputedStyle(el).fontSize
    );
    const revertedTextAlign = await lyrics.evaluate(
      (el) => getComputedStyle(el).textAlign
    );
    expect(revertedFontSize).toBe(defaultFontSize);
    expect(revertedTextAlign).toBe('left');
  });
});
