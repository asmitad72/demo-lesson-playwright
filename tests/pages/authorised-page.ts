import { Locator, Page } from '@playwright/test'
import { BasePage } from './base-page'

export class AuthorisedPage extends BasePage{
  readonly logoutButton: Locator
  readonly statusButton: Locator

  constructor(page: Page) {
    super(page);
    this.statusButton = page.getByTestId('openStatusPopup-button')
    this.logoutButton = page.getByTestId('logout-button')
  }
}