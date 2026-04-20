// tests/auth/logout.spec.ts

import { expect, test } from '@playwright/test';

import { LoginPage } from '../pages/login-page';
import { Menu } from '../pages/menu';

test.describe('Authentication', () => {
  test('Logout Functionality', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const menu = new Menu(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await menu.openMenu();
    await menu.clickLogout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});
