import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/MainPage';

test.describe('Scenario 1 - Main Page', () => {
  let mainPage: MainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.goto();
  });

  test('Open Main Page - assert page has title', async () => {
    const title = await mainPage.getTitle();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
  });

  test('Assert page has Fork me on Github element', async () => {
    const forkMeLink = mainPage.getForkMeOnGithubLink();
    await expect(forkMeLink).toBeAttached();
  });

  test('Assert page content contains 44 links', async () => {
    const linksCount = await mainPage.getLinksCount();
    expect(linksCount).toBe(44);
  });
});
