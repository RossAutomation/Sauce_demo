import { expect, test } from '@playwright/test';

import { LoginPage } from '../../pages/login-page';
import { Menu } from '../../pages/menu';
import { SocialLinks } from '../../pages/social-links';

test.describe('Navigation and Menu', () => {
  let loginPage: LoginPage;
  let menu: Menu;
  let socialLinks: SocialLinks;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    menu = new Menu(page);
    socialLinks = new SocialLinks(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Menu Navigation', async ({ page }) => {
    await menu.openMenu();
    await menu.clickAllItems();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Social Media Links', async ({ page }) => {
    await socialLinks.clickTwitter();
    const twitterPage = await page.context().waitForEvent('page');
    await expect(twitterPage.url()).toBe('https://x.com/saucelabs');
  });
});
