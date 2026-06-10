import { test, expect } from '@playwright/test';

test.describe.skip('Add Song Flow', () => {
  test('should submit a new song', async ({ page }) => {
    // Navigate to /login to authenticate first
    await page.goto('/login');
    
    // Get the question
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

    await page.fill('input[name="answer"]', answer!);
    
    // Click and wait for navigation
    await Promise.all([
      page.waitForURL('**/addSongs'),
      page.click('button:has-text("Authenticate")', { force: true }),
    ]);
    
    // Click the "Add Song" button to open the editor
    await page.click('button:has-text("Add Song")');

    // Wait for the form to appear and fill it
    await page.fill('input[placeholder="Title"]', 'Test Song Title');
    await page.fill('textarea[placeholder="Lyrics"]', 'Test Lyrics Content');
    
    // Submit the form
    await page.click('button:has-text("Add Song")');

    // After submission, it should redirect to home
    await expect(page).toHaveURL('/');
  });
});
