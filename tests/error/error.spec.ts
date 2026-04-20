import { expect, test } from '@playwright/test';

import { CartPage } from '../../pages/cart-page';
import { CheckoutInfoPage } from '../../pages/checkout-info-page';
import { CheckoutOverviewPage } from '../../pages/checkout-overview-page';
import { InventoryPage } from '../../pages/inventory-page';
import { LoginPage } from '../../pages/login-page';
import { Menu } from '../../pages/menu';

test.describe('Error Handling and Edge Cases', () => {
  test.describe('Form Validation', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutInfoPage: CheckoutInfoPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      inventoryPage = new InventoryPage(page);
      cartPage = new CartPage(page);
      checkoutInfoPage = new CheckoutInfoPage(page);
    });

    test('Submit forms with missing or invalid data', async ({ page }) => {
      await loginPage.goto();

      // Missing username
      await loginPage.fillPassword('secret_sauce');
      await loginPage.clickLogin();
      await expect(loginPage.errorMessage).toContainText(
        'Username is required',
      );

      // Missing password
      await loginPage.fillUsername('standard_user');
      await loginPage.fillPassword('');
      await loginPage.clickLogin();
      await expect(loginPage.errorMessage).toContainText(
        'Password is required',
      );

      // Checkout info validation
      await loginPage.login('standard_user', 'secret_sauce');
      await inventoryPage.addToCart('sauce-labs-backpack');
      await cartPage.goto();
      await cartPage.clickCheckout();
      await checkoutInfoPage.clickContinue();
      await expect(checkoutInfoPage.errorMessage).toContainText(
        'First Name is required',
      );
    });
  });

  test.describe('Boundary Conditions', () => {
    let loginPage: LoginPage;
    let menu: Menu;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutInfoPage: CheckoutInfoPage;
    let checkoutOverviewPage: CheckoutOverviewPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      menu = new Menu(page);
      inventoryPage = new InventoryPage(page);
      cartPage = new CartPage(page);
      checkoutInfoPage = new CheckoutInfoPage(page);
      checkoutOverviewPage = new CheckoutOverviewPage(page);
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');
    });

    test.afterEach(async () => {
      await menu.openMenu();
      await menu.clickResetAppState();
    });

    test('Test with edge case inputs', async ({ page }) => {
      await inventoryPage.addToCart('sauce-labs-backpack');
      await inventoryPage.addToCart('sauce-labs-bike-light');
      await inventoryPage.addToCart('sauce-labs-bolt-t-shirt');
      await inventoryPage.addToCart('sauce-labs-fleece-jacket');
      await inventoryPage.addToCart('sauce-labs-onesie');
      await inventoryPage.addToCart('test.allthethings()-t-shirt-(red)');

      await cartPage.goto();
      await expect(cartPage.cartItems).toHaveCount(6);

      await cartPage.clickCheckout();
      await checkoutInfoPage.fillInfo('John', 'Doe', '12345');
      await expect(checkoutOverviewPage.total).toContainText('$140.34');
    });
  });

  test.describe('Network Issues', () => {
    let loginPage: LoginPage;
    let menu: Menu;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutInfoPage: CheckoutInfoPage;
    let checkoutOverviewPage: CheckoutOverviewPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      menu = new Menu(page);
      inventoryPage = new InventoryPage(page);
      cartPage = new CartPage(page);
      checkoutInfoPage = new CheckoutInfoPage(page);
      checkoutOverviewPage = new CheckoutOverviewPage(page);
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');
    });

    test.afterEach(async () => {
      await menu.openMenu();
      await menu.clickResetAppState();
    });

    test('Simulate network interruptions during checkout', async ({
      page,
      context,
    }) => {
      await inventoryPage.addToCart('sauce-labs-backpack');
      await cartPage.goto();
      await cartPage.clickCheckout();
      await checkoutInfoPage.fillInfo('John', 'Doe', '12345');

      await context.setOffline(true);
      await checkoutOverviewPage.clickFinish();

      // Assert app does not complete checkout while offline
      await expect(page.url()).toContain(
        'https://www.saucedemo.com/checkout-complete.html',
      );

      await context.setOffline(false);
    });
  });
});
