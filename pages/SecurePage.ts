import { Page } from '@playwright/test';

export class SecurePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/secure');
  }

  async getTitle() {
    return this.page.title();
  }

  getLogoutButton() {
    return this.page.getByRole('link', { name: 'Logout' });
  }

  getFlashMessage() {
    return this.page.locator('#flash');
  }

  async getPageContent() {
    return this.page.content();
  }
}
