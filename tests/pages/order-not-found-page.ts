import { Locator, Page } from '@playwright/test'
import { AuthorisedPage } from './authorised-page'

export class OrderNotFoundPage extends AuthorisedPage {
  private path = '/order/0'

  readonly container: Locator

  constructor(page: Page) {
    super(page)
    this.container = page.getByTestId('orderNotFound-container')
  }

  async open() {
    await this.page.goto(this.path)
  }
}
