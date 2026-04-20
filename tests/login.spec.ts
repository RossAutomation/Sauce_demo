// tests/auth/login.spec.ts

import { expect, test } from '@playwright/test';

import { LoginPage } from '../pages/login-page';

test.describe('Authentication', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Successful Login', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Invalid Login Attempts', async ({ page }) => {
    await loginPage.login('invalid_user', 'invalid_pass');
    await expect(loginPage.errorMessage).toBeVisible();
  });
});
