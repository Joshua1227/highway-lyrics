import { test, expect } from '@playwright/test';

test.describe('Homepage Navigation & FAQ Separate Page', () => {
  test('should navigate to FAQ page from home, interact with FAQs, and go back home', async ({ page }) => {
    // 1. Start on Homepage
    await page.goto('http://localhost:3001');
    await expect(page.locator('h1')).toContainText('Highway Lyrics');

    // 2. Locate and click the FAQ button in the top bar
    const faqButton = page.locator('button:has-text("FAQ")');
    await expect(faqButton).toBeVisible();
    await faqButton.click();

    // 3. Verify navigation to the FAQ separate page
    await page.waitForURL('**/faq');
    await expect(page).toHaveURL(/.*faq/);

    // 4. Verify FAQ Heading on /faq
    const faqHeading = page.locator('h2:has-text("Frequently Asked Questions")');
    await expect(faqHeading).toBeVisible();

    // 5. Verify questions exist on this page
    const question1 = page.locator('button:has-text("When will you add more features?")');
    await expect(question1).toBeVisible();

    const question2 = page.locator('button:has-text("How can someone get the password to add songs?")');
    await expect(question2).toBeVisible();

    // 6. Test collapsible accordion on /faq
    const answer1Text = "I want to add the ability to edit existing songs";
    await expect(page.locator(`text=${answer1Text}`)).not.toBeVisible();
    await question1.click();
    await expect(page.locator(`text=${answer1Text}`)).toBeVisible();

    // 7. Click Back to Home and verify navigation back
    const backButton = page.locator('button:has-text("Back to Home")');
    await expect(backButton).toBeVisible();
    await backButton.click();

    await page.waitForURL('http://localhost:3001/');
    await expect(page).toHaveURL('http://localhost:3001/');
  });
});
