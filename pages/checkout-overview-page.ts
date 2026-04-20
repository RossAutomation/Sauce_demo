// pages/checkout-overview-page.ts

import { Page } from '@playwright/test';

export class CheckoutOverviewPage {
  constructor(private page: Page) {}

  async clickFinish() {
    await this.page.locator('[data-test="finish"]').click();
  }

  async clickCancel() {
    await this.page.locator('[data-test="cancel"]').click();
  }

  get itemTotal() {
    return this.page.locator('[data-test="subtotal-label"]');
  }

  get tax() {
    return this.page.locator('[data-test="tax-label"]');
  }

  get total() {
    return this.page.locator('[data-test="total-label"]');
  }

  get paymentInfo() {
    return this.page.locator('[data-test="payment-info-value"]');
  }

  get shippingInfo() {
    return this.page.locator('[data-test="shipping-info-value"]');
  }
}
