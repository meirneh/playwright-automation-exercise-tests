import { expect } from "@playwright/test";
import Basepage from "./basepage";
export default class HomePage extends Basepage {
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
    super(page);
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
    await this.click(this.#signuploginlogoutButton);
  }

  async clickHomeButton() {
    await this.click(this.#homeButton);
  }

  async clickDeleteAccountButton() {
    await this.click(this.#deleteAccountButton);
  }

  async clickContactUsButton() {
    await this.click(this.#contactUsButton);
  }

  async clickProductsButton() {
    await this.click(this.#productsButton);
  }

  async clickCartButton() {
    await this.click(this.#cartButton);
  }

  async suscribeUser(email) {
    await this.#emailSuscriptionField.scrollIntoViewIfNeeded();
    await this.fill(this.#emailSuscriptionField, email);
    await this.click(this.#suscribeButton);
    return this;
  }

  async verifyHomeButton() {
    return await this.isVisible(this.#homeButton);
  }

  async verifyLoggedInUser(expectedName) {
    const expectedText = `Logged in as ${expectedName}`;
    const actualText = await this.#loggedUser.textContent();
    expect(actualText.trim()).toBe(expectedText);
    return this;
  }
 
  async verifySignupLoginLogoutButton() {
    return await this.isVisible(this.#signuploginlogoutButton);
  }

  async verifySuscribeMessageVisible() {
    return await this.isVisible(this.#suscribeSuccessMsg);
  }

  async verifySuscribeSuscribeText() {
    const expectedMsg = "You have been successfully subscribed!";
    const actualMsg = await this.#suscribeSuccessMsg.innerText();
    return expect(actualMsg).toEqual(expectedMsg);
  }

  async verifySuscribeMessage() {
    await this.verifySuscribeMessageVisible();
    await this.verifySuscribeSuscribeText();
    return this;
  }
}
