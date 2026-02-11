import { expect, Locator, Page, test } from '@playwright/test'

export class BasePage {
  readonly page: Page;
  readonly enLanguageButton: Locator;
  readonly ruLanguageButton: Locator;

  protected constructor(page: Page) {
    this.page = page;
    this.enLanguageButton = page.locator('.language__button').filter({hasText: 'EN'});
    this.ruLanguageButton = page.locator('.language__button').filter({hasText: 'RU'});
  }

  async checkElementVisibility(locator: Locator) {
    await test.step('Verify visibility of element', async ()=> {
      await expect(locator).toBeVisible();
    })
  }
}