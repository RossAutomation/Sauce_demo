// pages/cart-page.ts

import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.saucedemo.com/cart.html');
  }

  async clickCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
  }

  async clickContinueShopping() {
    await this.page.locator('[data-test="continue-shopping"]').click();
  }

  async removeItem(item: string) {
    await this.page.locator(`[data-test="remove-${item}"]`).click();
  }

  get cartItems() {
    return this.page.locator('.cart_item');
  }
}
