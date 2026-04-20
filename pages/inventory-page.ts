// pages/inventory-page.ts

import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async addToCart(item: string) {
    await this.page.locator(`[data-test="add-to-cart-${item}"]`).click();
  }

  async removeFromCart(item: string) {
    await this.page.locator(`[data-test="remove-${item}"]`).click();
  }

  async sortBy(option: string) {
    await this.page
      .locator('[data-test="product-sort-container"]')
      .selectOption(option);
  }

  async clickProductTitle(item: string) {
    await this.page.locator(`[data-test="item-${item}-title-link"]`).click();
  }

  get products() {
    return this.page.locator('.inventory_item');
  }

  get cartBadge() {
    return this.page.locator('.shopping_cart_badge');
  }
}
