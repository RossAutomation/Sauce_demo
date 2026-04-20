// pages/menu.ts

import { Page } from '@playwright/test';

export class Menu {
  constructor(private page: Page) {}

  async openMenu() {
    await this.page.locator('#react-burger-menu-btn').click();
  }

  async closeMenu() {
    await this.page.locator('#react-burger-cross-btn').click();
  }

  async clickAllItems() {
    await this.page.locator('#inventory_sidebar_link').click();
  }

  async clickAbout() {
    await this.page.locator('#about_sidebar_link').click();
  }

  async clickLogout() {
    await this.page.locator('#logout_sidebar_link').click();
  }

  async clickResetAppState() {
    await this.page.locator('#reset_sidebar_link').click();
  }
}
