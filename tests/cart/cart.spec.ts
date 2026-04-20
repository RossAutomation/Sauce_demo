// tests/cart/cart.spec.ts

import { expect, test } from '@playwright/test';

import { CartPage } from '../../pages/cart-page';
import { InventoryPage } from '../../pages/inventory-page';
import { LoginPage } from '../../pages/login-page';
import { Menu } from '../../pages/menu';

test.describe('Shopping Cart', () => {
  let loginPage: LoginPage;
  let menu: Menu;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    menu = new Menu(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test.afterEach(async ({ page }) => {
    await menu.openMenu();
    await menu.clickResetAppState();
  });

  test('Add and Remove Items', async ({ page }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await expect(inventoryPage.cartBadge).toBeVisible();
    await inventoryPage.removeFromCart('sauce-labs-backpack');
    await expect(inventoryPage.cartBadge).not.toBeVisible();
  });

  test('View Cart Contents', async ({ page }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await cartPage.goto();
    await expect(cartPage.cartItems).toHaveCount(1);
  });

  test('Multiple Items in Cart', async ({ page }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.addToCart('sauce-labs-bike-light');
    await cartPage.goto();
    await expect(cartPage.cartItems).toHaveCount(2);
  });

  test('Cart Persistence', async ({ page }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await page.reload();
    await cartPage.goto();
    await expect(cartPage.cartItems).toHaveCount(1);
  });
});
