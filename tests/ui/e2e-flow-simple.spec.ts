import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/ar'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { OrderNotFoundPage } from '../pages/order-not-found-page'
import { OrderDetailsPage } from '../pages/order-details-page'
let loginPage: LoginPage
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page)
  await loginPage.open()
})

test('signIn button disabled when incorrect data inserted', async ({ page }) => {
  // const loginPage = new LoginPage(page)
  // await loginPage.open()
  await loginPage.usernameField.fill(faker.lorem.word(2))
  await loginPage.passwordField.fill(faker.lorem.word(7))
  await expect(loginPage.signInButton).toBeDisabled()
})

test('login with correct credentials and verify order creation page', async ({ page }) => {
  // const loginPage = new LoginPage(page)
  // await loginPage.open()
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.click({ force: true })
  // verify at least few elements on the order creation page
  await expect(orderCreationPage.searchOrderInput).toBeVisible()
  await expect(orderCreationPage.trackButton).toBeVisible()
})
test('create order with valid data', async ({ page }) => {
  // const loginPage = new LoginPage(page)
  // await loginPage.open()
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.createOrder(USERNAME, '0612345678', 'Test order creation')
  // verify at least few elements on the order creation page
  await expect(orderCreationPage.okButton).toBeVisible()
})
test('verify validation errors during order creation', async ({ page }) => {
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)

  // try to create order with invalid data
  await orderCreationPage.createOrder('A', '1234', 'Test comment')

  // verify validation errors
  await expect(orderCreationPage.nameError).toHaveText('The field must contain at least of characters: 2')
  await expect(orderCreationPage.phoneError).toHaveText('The field must contain at least of characters: 6')
  await expect(orderCreationPage.descriptionError).toBeVisible()

})
test('logout', async ({ page }) => {
  // const loginPage = new LoginPage(page)
  // await loginPage.open()
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.logoutButton.click()

  await expect(loginPage.signInButton).toBeVisible()
 // await expect(orderCreationPage.logoutButton).not.toBeVisible()
})


test('search for non existing order', async ({ page }) => {
  await loginPage.signIn(USERNAME, PASSWORD)
  const orderNotFoundPage = new OrderNotFoundPage(page);
  await orderNotFoundPage.open();
  await orderNotFoundPage.checkElementVisibility(orderNotFoundPage.container);
})


test('search for existing order', async ({ page }) => {
  await loginPage.signIn(USERNAME, PASSWORD)
  const orderDetailsPage = new OrderDetailsPage(page);
  await orderDetailsPage.open();
  await orderDetailsPage.checkElementVisibility(orderDetailsPage.orderDetails);
  await expect(orderDetailsPage.logoutButton).toBeVisible();
  await expect(orderDetailsPage.enLanguageButton).toBeVisible();
})

