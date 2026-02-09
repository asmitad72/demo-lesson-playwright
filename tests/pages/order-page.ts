import { Locator, Page } from '@playwright/test'

export class OrderPage {
  readonly page: Page
  readonly statusButton: Locator
  readonly createOrderTitle: Locator
  readonly usernameInput: Locator
  readonly phoneInput: Locator
  readonly commentInput: Locator
  readonly createOrderButton: Locator
  readonly searchOrderInput: Locator
  readonly trackButton: Locator
  readonly okButton: Locator
  readonly logoutButton: Locator

  constructor(page: Page) {
    this.page = page
    this.statusButton = page.getByTestId('openStatusPopup-button')
    this.createOrderTitle = page.getByRole('heading', { name: 'Create order' })
    //
    this.usernameInput = page.getByTestId('username-input')
    this.commentInput = page.getByTestId('comment-input')
    this.phoneInput = page.getByTestId('phone-input')
    this.createOrderButton = page.getByTestId('createOrder-button')
    this.searchOrderInput = page.getByTestId('searchOrder-input')
    this.trackButton = page.getByTestId('searchOrder-submitButton')
    this.okButton = page.getByTestId('orderSuccessfullyCreated-popup-ok-button')
    this.logoutButton = page.getByTestId('logout-button')
  }
  async createOrder(username: string, phone: string, comment: string) {
    await this.usernameInput.fill(username)
    await this.phoneInput.fill(phone)
    await this.commentInput.fill(comment)
    await this.createOrderButton.click()
  }

}