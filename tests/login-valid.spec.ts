import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SecurePage } from '../pages/SecurePage';

const VALID_USERNAME = 'tomsmith';
const VALID_PASSWORD = 'SuperSecretPassword!';

test.describe('Scenario 3 - Login to the site', () => {
  let loginPage: LoginPage;
  let securePage: SecurePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    securePage = new SecurePage(page);
    await loginPage.goto();
  });

  test('Login with valid credentials - full flow', async ({ page }) => {
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);

    await expect(page).toHaveURL(/\/secure/);

    const title = await securePage.getTitle();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);

    const content = await securePage.getPageContent();
    expect(content).toContain('Secure Area');
    expect(content).toContain('Welcome to the Secure Area');

    await expect(securePage.getLogoutButton()).toBeVisible();

    await securePage.getLogoutButton().click();

    await expect(page).toHaveURL(/\/login/);
    await expect(loginPage.getFlashMessage()).toContainText(/logout|logged out/i);
  });
});
