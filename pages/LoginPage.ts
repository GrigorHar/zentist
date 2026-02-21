import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/login');
  }

  getUsernameInput() {
    return this.page.locator('#username');
  }

  getPasswordInput() {
    return this.page.locator('#password');
  }

  getLoginButton() {
    return this.page.getByRole('button', { name: 'Login' });
  }

  getFlashMessage() {
    return this.page.locator('#flash');
  }

  async isFlashError() {
    const flash = this.getFlashMessage();
    await flash.waitFor({ state: 'visible' });
    const className = await flash.getAttribute('class');
    return className?.includes('error') ?? false;
  }

  async login(username: string, password: string) {
    await this.getUsernameInput().fill(username);
    await this.getPasswordInput().fill(password);
    await this.getLoginButton().click();
  }

  async getFlashMessageText() {
    return (await this.getFlashMessage().textContent())?.trim() ?? '';
  }
}
