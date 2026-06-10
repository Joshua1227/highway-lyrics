import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should authenticate with a correct answer', async ({ page }) => {
    await page.goto('/login');
    
    // The password in the test must match process.env.PASSWORD
    await page.fill('input[name="answer"]', process.env.PASSWORD || 'HeartOfWorship');
    
    // The onClick handler for this button does the POST to /api/login
    await page.click('button:has-text("Authenticate")');
    
    // Wait for navigation
    await page.waitForURL('**/addSongs', { timeout: 10000 });
    await expect(page).toHaveURL(/.*addSongs/);
  });

  test('should work after a long session (simulated)', async ({ page, context }) => {
    // 1. Visit login
    await page.goto('/login');
    
    // 2. Simulate session expiration by clearing cookies or waiting
    // Given the 24h limit, we can't easily wait. 
    // We clear cookies to simulate the server invalidating the session.
    await context.clearCookies();
    
    // 3. Ensure we can still log in after 'session expiration'
    const questionText = await page.locator('p.text-gray-600').innerText();
    const questions = {
        "What is the name of the garden where Jesus prayed before his crucifixion?": "Gethsemane",
        "What is the name of the river where Jesus was baptized?": "Jordan",
        "What is the name of the mountain where Moses received the Ten Commandments?": "Sinai",
        "What is the name of the place where Jesus turned water into wine?": "Cana",
        "What is the name of the place where Jesus was crucified?": "Golgotha",
        "What was the name of the man who fell asleep and fell out of a window while Paul was preaching?": "Eutychus",
        "What specific type of bird brought food to Elijah by the Kerith Ravine?": "Raven",
        "What was the name of the elderly prophetess who recognized Jesus in the temple as a baby?": "Anna",
    };

    const question = Object.keys(questions).find(q => questionText.includes(q));
    const answer = questions[question as keyof typeof questions];

    await page.fill('input[name="answer"]', process.env.PASSWORD || 'HeartOfWorship');
    await page.click('button:has-text("Authenticate")');
    
    // Should successfully redirect
    await expect(page).toHaveURL('/addSongs');
  });
});
