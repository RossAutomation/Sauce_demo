// pages/social-links.ts

import { Page } from '@playwright/test';

export class SocialLinks {
  constructor(private page: Page) {}

  async clickTwitter() {
    await this.page.locator('[data-test="social-twitter"]').click();
  }

  async clickFacebook() {
    await this.page.locator('[data-test="social-facebook"]').click();
  }

  async clickLinkedIn() {
    await this.page.locator('[data-test="social-linkedin"]').click();
  }
}
