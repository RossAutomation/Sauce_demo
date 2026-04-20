// pages/checkout-complete-page.ts

import { Page } from '@playwright/test';

export class CheckoutCompletePage {
  constructor(private page: Page) {}

  async clickBackHome() {
    await this.page.locator('[data-test="back-to-products"]').click();
  }

  get completeHeader() {
    return this.page.locator('[data-test="complete-header"]');
  }
}
