import { Locator, Page } from '@playwright/test'
import { AuthorisedPage } from './authorised-page'

export class OrderDetailsPage extends AuthorisedPage{
  private path = '/order/16317';

  readonly orderDetails: Locator;

  constructor(page: Page) {
    super(page);
    this.orderDetails = page.locator('.order-details');
  }

  async open() {
    await this.page.goto(this.path);
  }
}