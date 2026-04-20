// pages/checkout-info-page.ts

import { Page } from '@playwright/test';

export class CheckoutInfoPage {
  constructor(private page: Page) {}

  async fillFirstName(firstName: string) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.page.locator('[data-test="lastName"]').fill(lastName);
  }

  async fillPostalCode(postalCode: string) {
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
  }

  async clickContinue() {
    await this.page.locator('[data-test="continue"]').click();
  }

  async clickCancel() {
    await this.page.locator('[data-test="cancel"]').click();
  }

  async fillInfo(firstName: string, lastName: string, postalCode: string) {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillPostalCode(postalCode);
    await this.clickContinue();
  }

  get errorMessage() {
    return this.page.locator('[data-test="error"]');
  }
}
