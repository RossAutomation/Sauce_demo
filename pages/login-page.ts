// pages/login-page.ts

import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async fillUsername(username: string) {
    await this.page.locator('[data-test="username"]').fill(username);
  }

  async fillPassword(password: string) {
    await this.page.locator('[data-test="password"]').fill(password);
  }

  async clickLogin() {
    await this.page.locator('[data-test="login-button"]').click();
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  get errorMessage() {
    return this.page.locator('[data-test="error"]');
  }
}
