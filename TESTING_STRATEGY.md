# Comprehensive Testing Strategy (Update)

This plan enhances the testing strategy to include end-to-end (E2E) testing for all major user functionalities using Playwright, ensuring every feature is validated in a real-browser environment.

## 1. Updated Testing Strategy
- **Unit & Integration Testing (Vitest + RTL):** Focus on business logic, utility functions, and individual React components.
- **E2E Testing (Playwright):** Focus on critical user journeys for all major features.

## 2. Playwright Test Mapping

| Functionality | Target Feature | E2E Spec File |
| :--- | :--- | :--- |
| **Homepage** | Display song list & search | `e2e/homepage.spec.ts` |
| **Authentication** | Login flow & cookie handling | `e2e/login.spec.ts` |
| **Song Management** | Adding new songs (form & submission) | `e2e/addSong.spec.ts` |
| **Song View** | Selecting a song and viewing lyrics | `e2e/songView.spec.ts` |
| **Duplicate Check** | Duplicate detection during add flow | `e2e/duplicates.spec.ts` |

## 3. Implementation Steps

1.  **Environment Setup**: Ensure `playwright` is installed and `playwright.config.ts` points correctly to the dev server.
2.  **Authentication Mocking/State**: Implement state handling (e.g., storing authenticated session cookies) to skip the login flow where necessary for specific tests.
3.  **Implement E2E Specs**:
    *   **`addSong.spec.ts`**: Test the full flow of filling out the "Add Song" form and validating the success response.
    *   **`login.spec.ts`**: Test successful/failed login scenarios and redirect logic.
    *   **`songView.spec.ts`**: Test clicking a song from the list and the lyrics component appearing.
4.  **CI/CD Integration**: Configure CI to run both `vitest` (unit/integration) and `playwright` (E2E) in parallel.

## 4. Best Practices for E2E
- **Data Isolation**: Use dedicated test databases or clean up state after every test run.
- **Locators**: Use semantic locators (e.g., `getByRole`, `getByLabel`) instead of CSS selectors where possible.
- **Test Independence**: Each test should be independent and perform its own setup (e.g., authentication).
- **Assertions**: Use web-first assertions (`await expect(...).toBeVisible()`) to avoid race conditions.

---
*To execute the E2E suite, run: `npx playwright test`*
