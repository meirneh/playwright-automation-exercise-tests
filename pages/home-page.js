import { expect } from "@playwright/test";
export default class HomePage {
  #homeButton;
  #signuploginlogoutButton;
  #deleteAccountButton;
  #contactUsButton;
  #cartButton;
  #loggedUser;
  #productsButton;
  #emailSuscriptionField;
  #suscribeButton;
  #suscribeSuccessMsg;

  constructor(page) {
    this.page = page;
    this.#homeButton = page.locator(".col-sm-8 :nth-child(1) > a");
    this.#signuploginlogoutButton = page.locator(".col-sm-8 :nth-child(4) > a");
    this.#cartButton = page.locator(".col-sm-8 :nth-child(3) > a");
    this.#loggedUser = page.locator(".col-sm-8 :nth-child(10) > a");
    this.#deleteAccountButton = page.locator(".col-sm-8 :nth-child(5) > a");
    this.#contactUsButton = page.locator(".col-sm-8 :nth-child(8) > a");
    this.#productsButton = page.locator(".col-sm-8 :nth-child(2) > a");
    this.#emailSuscriptionField = page.locator("#susbscribe_email");
    this.#suscribeButton = page.locator("#subscribe");
    this.#suscribeSuccessMsg = page.locator("#success-subscribe");
  }

  async clickSignupLoginLogoutButton() {
    await this.#signuploginlogoutButton.click();
    return this;
  }

  async clickHomeButton() {
    await this.#homeButton.click();
    return;
  }

  async clickDeleteAccountButton() {
    await this.#deleteAccountButton.click();
    return this;
  }

  async clickContactUsButton() {
    await this.#contactUsButton.click();
    return this;
  }

  async clickProductsButton() {
    await this.#productsButton.click();
    return this;
  }

  async clickCartButton() {
    await this.#cartButton.click();
    return this;
  }

  async suscribeUser(email) {
    await this.#emailSuscriptionField.scrollIntoViewIfNeeded();
    await this.#emailSuscriptionField.fill(email);
    await this.#suscribeButton.click();
    return this;
  }

  async verifyHomeButton() {
    return await this.#homeButton.isVisible();
  }

  async verifyLoggedInUser(expectedName) {
    const expectedText = `Logged in as ${expectedName}`;
    const actualText = await this.#loggedUser.textContent();
    expect(actualText.trim()).toBe(expectedText);
    return this;
  }

  async verifySignupLoginLogoutButton() {
    return await this.#signuploginlogoutButton.isVisible();
  }

  async verifySuscribeMessageVisible() {
    return await this.#suscribeSuccessMsg.isVisible();
  }

  async verifySuscribeSuscribeText() {
    const expectedMsg = "You have been successfully subscribed!";
    const actualMsg = await this.#suscribeSuccessMsg.innerText();
    return expect(actualMsg).toEqual(expectedMsg);
  }

  async verifySuscribeMessage() {
    await this.verifySuscribeMessageVisible();
    await this.verifySuscribeSuscribeText()
    return this;
  }
}
