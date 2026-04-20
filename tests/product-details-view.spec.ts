// spec: test-plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '@playwright/test';

import { InventoryPage } from '../pages/inventory-page';
import { LoginPage } from '../pages/login-page';

test.describe('Product Browsing', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Product Details View', async ({ page }) => {
    // 1. Click on product title link
    await inventoryPage.clickProductTitle('4');
    // expect: Product details page opens with larger image, full description
    await expect(
      page.locator('[data-test="item-sauce-labs-backpack-img"]'),
    ).toBeVisible();
    await expect(
      page.locator('[data-test="inventory-item-desc"]'),
    ).toBeVisible();

    // 2. Click 'Back to products' button
    await page.locator('[data-test="back-to-products"]').click();
    // expect: Back to products button returns to inventory
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
  });
});
