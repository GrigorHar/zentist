import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/MainPage';
import { LoginPage } from '../pages/LoginPage';
import { SecurePage } from '../pages/SecurePage';

test.describe('Scenario 2 - Login Page - Invalid Credentials', () => {
  let mainPage: MainPage;
  let loginPage: LoginPage;
  let securePage: SecurePage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    loginPage = new LoginPage(page);
    securePage = new SecurePage(page);
    await mainPage.goto();
    await mainPage.clickFormAuthentication();
  });

  test('Empty username and empty password - cannot login', async ({ page }) => {
    await loginPage.login('', '');
    await expect(loginPage.getFlashMessage()).toBeVisible();
    await expect(loginPage.getFlashMessage()).toContainText(/invalid/i);
    await expect(page).toHaveURL(/\/login$/);
  });

  test('Valid username, wrong password - cannot login', async ({ page }) => {
    await loginPage.login('tomsmith', 'WrongPassword');
    await expect(loginPage.getFlashMessage()).toBeVisible();
    await expect(loginPage.getFlashMessage()).toContainText(/invalid/i);
    await expect(page).toHaveURL(/\/login$/);
  });

  test('Wrong username, valid password - cannot login', async ({ page }) => {
    await loginPage.login('wronguser', 'SuperSecretPassword!');
    await expect(loginPage.getFlashMessage()).toBeVisible();
    await expect(loginPage.getFlashMessage()).toContainText(/invalid/i);
    await expect(page).toHaveURL(/\/login$/);
  });

  test('Wrong username, wrong password - cannot login', async ({ page }) => {
    await loginPage.login('invaliduser', 'invalidpass');
    await expect(loginPage.getFlashMessage()).toBeVisible();
    await expect(loginPage.getFlashMessage()).toContainText(/invalid/i);
    await expect(page).toHaveURL(/\/login$/);
  });

  test('Empty username, valid password - cannot login', async ({ page }) => {
    await loginPage.login('', 'SuperSecretPassword!');
    await expect(loginPage.getFlashMessage()).toBeVisible();
    await expect(loginPage.getFlashMessage()).toContainText(/invalid/i);
    await expect(page).toHaveURL(/\/login$/);
  });

  test('Valid username, empty password - cannot login', async ({ page }) => {
    await loginPage.login('tomsmith', '');
    await expect(loginPage.getFlashMessage()).toBeVisible();
    await expect(loginPage.getFlashMessage()).toContainText(/invalid/i);
    await expect(page).toHaveURL(/\/login$/);
  });

  test('Case-sensitive: wrong username case - cannot login', async ({ page }) => {
    await loginPage.login('TomSmith', 'SuperSecretPassword!');
    await expect(loginPage.getFlashMessage()).toBeVisible();
    await expect(loginPage.getFlashMessage()).toContainText(/invalid/i);
    await expect(page).toHaveURL(/\/login$/);
  });

  test('Case-sensitive: wrong password case - cannot login', async ({ page }) => {
    await loginPage.login('tomsmith', 'supersecretpassword!');
    await expect(loginPage.getFlashMessage()).toBeVisible();
    await expect(loginPage.getFlashMessage()).toContainText(/invalid/i);
    await expect(page).toHaveURL(/\/login$/);
  });

  test('Whitespace-only username - cannot login', async ({ page }) => {
    await loginPage.login('   ', 'SuperSecretPassword!');
    await expect(loginPage.getFlashMessage()).toBeVisible();
    await expect(loginPage.getFlashMessage()).toContainText(/invalid/i);
    await expect(page).toHaveURL(/\/login$/);
  });

  test('Username with leading/trailing spaces - cannot login', async ({ page }) => {
    await loginPage.login('  tomsmith  ', 'SuperSecretPassword!');
    await expect(loginPage.getFlashMessage()).toBeVisible();
    await expect(loginPage.getFlashMessage()).toContainText(/invalid/i);
    await expect(page).toHaveURL(/\/login$/);
  });

  test('SQL injection attempt - cannot login', async ({ page }) => {
    await loginPage.login("' OR '1'='1", "' OR '1'='1");
    await expect(loginPage.getFlashMessage()).toBeVisible();
    await expect(loginPage.getFlashMessage()).toContainText(/invalid/i);
    await expect(page).toHaveURL(/\/login$/);
  });

  test('Special characters in credentials - cannot login', async ({ page }) => {
    await loginPage.login('user@#$%', 'pass!@#$%');
    await expect(loginPage.getFlashMessage()).toBeVisible();
    await expect(loginPage.getFlashMessage()).toContainText(/invalid/i);
    await expect(page).toHaveURL(/\/login$/);
  });

  test('Similar but wrong password (missing punctuation) - cannot login', async ({ page }) => {
    await loginPage.login('tomsmith', 'SuperSecretPassword');
    await expect(loginPage.getFlashMessage()).toBeVisible();
    await expect(loginPage.getFlashMessage()).toContainText(/invalid/i);
    await expect(page).toHaveURL(/\/login$/);
  });

  test('Similar but wrong password (extra character) - cannot login', async ({ page }) => {
    await loginPage.login('tomsmith', 'SuperSecretPassword!!');
    await expect(loginPage.getFlashMessage()).toBeVisible();
    await expect(loginPage.getFlashMessage()).toContainText(/invalid/i);
    await expect(page).toHaveURL(/\/login$/);
  });
});
