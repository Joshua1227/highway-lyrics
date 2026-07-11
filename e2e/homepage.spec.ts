import { test, expect } from '@playwright/test';

test.describe('Homepage & FAQ Section', () => {
  test('homepage should load and display FAQ section', async ({ page }) => {
    await page.goto('http://localhost:3001');
    await expect(page.locator('h1')).toContainText('Highway Lyrics');

    // Verify FAQ Header
    const faqHeading = page.locator('h2:has-text("Frequently Asked Questions")');
    await expect(faqHeading).toBeVisible();

    // Verify specific questions
    const question1 = page.locator('button:has-text("When will you add more features?")');
    await expect(question1).toBeVisible();

    const question2 = page.locator('button:has-text("How can someone get the password to add songs?")');
    await expect(question2).toBeVisible();

    // Verify collapsible behavior (initially closed, click to open)
    const answer1Text = "I want to add the ability to edit existing songs";
    
    // The answer should not be fully visible initially or should expand on click
    await expect(page.locator(`text=${answer1Text}`)).not.toBeVisible();

    // Click the first question to toggle expand
    await question1.click();

    // The answer should now be visible
    await expect(page.locator(`text=${answer1Text}`)).toBeVisible();
  });
});
