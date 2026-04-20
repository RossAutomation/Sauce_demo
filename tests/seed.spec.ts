import { test } from '@playwright/test';

test('seed', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  // Add login or navigation steps if necessary
});
