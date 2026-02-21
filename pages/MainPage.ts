import { Page } from '@playwright/test';

export class MainPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async getTitle() {
    return this.page.title();
  }

  getForkMeOnGithubLink() {
    return this.page.getByRole('link', { name: /fork me on github/i });
  }

  getAllLinks() {
    return this.page.locator('a[href]');
  }

  getContentLinks() {
    return this.page.locator('#content a[href]');
  }

  async getLinksCount() {
    return (await this.getContentLinks().count());
  }

  async clickFormAuthentication() {
    await this.page.getByRole('link', { name: 'Form Authentication' }).click();
  }
}
