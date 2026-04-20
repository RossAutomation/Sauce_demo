// tests/checkout/checkout.spec.ts

import { expect, test } from '@playwright/test';

import { CartPage } from '../../pages/cart-page';
import { CheckoutCompletePage } from '../../pages/checkout-complete-page';
import { CheckoutInfoPage } from '../../pages/checkout-info-page';
import { CheckoutOverviewPage } from '../../pages/checkout-overview-page';
import { InventoryPage } from '../../pages/inventory-page';
import { LoginPage } from '../../pages/login-page';
import { Menu } from '../../pages/menu';

test.describe('Checkout Process', () => {
  let loginPage: LoginPage;
  let menu: Menu;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutInfoPage: CheckoutInfoPage;
  let checkoutOverviewPage: CheckoutOverviewPage;
  let checkoutCompletePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    menu = new Menu(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutInfoPage = new CheckoutInfoPage(page);
    checkoutOverviewPage = new CheckoutOverviewPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test.afterEach(async ({ page }) => {
    await menu.openMenu();
    await menu.clickResetAppState();
  });

  test('Checkout Information', async ({ page }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await cartPage.goto();
    await cartPage.clickCheckout();
    await checkoutInfoPage.clickContinue();
    await expect(checkoutInfoPage.errorMessage).toBeVisible();
  });

  test('Checkout Overview', async ({ page }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await cartPage.goto();
    await cartPage.clickCheckout();
    await checkoutInfoPage.fillInfo('John', 'Doe', '12345');
    await expect(checkoutOverviewPage.total).toBeVisible();
    await checkoutOverviewPage.clickCancel();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Order Completion', async ({ page }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await cartPage.goto();
    await cartPage.clickCheckout();
    await checkoutInfoPage.fillInfo('John', 'Doe', '12345');
    await checkoutOverviewPage.clickFinish();
    await expect(checkoutCompletePage.completeHeader).toBeVisible();
  });
});
