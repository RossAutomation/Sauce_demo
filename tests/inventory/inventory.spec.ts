import { expect, test } from '@playwright/test';

import { InventoryPage } from '../../pages/inventory-page';
import { LoginPage } from '../../pages/login-page';
import { Menu } from '../../pages/menu';

test.describe('Product Browsing', () => {
  let loginPage: LoginPage;
  let menu: Menu;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    menu = new Menu(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test.afterEach(async () => {
    await menu.openMenu();
    await menu.clickResetAppState();
  });

  test('View Product Inventory', async ({ page }) => {
    await expect(inventoryPage.products).toHaveCount(6);
  });

  test('Product Details View', async ({ page }) => {
    await inventoryPage.clickProductTitle('4');
    await expect(page).toHaveURL(/inventory-item.html/);
    await page.locator('[data-test="back-to-products"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });
});
