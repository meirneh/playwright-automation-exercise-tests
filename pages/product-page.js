import { expect } from "@playwright/test";
export default class ProductPage {
  #productName;
  #productDetails;
  #availabilityValue;
  #conditionValue;
  #brandValue;
  #addToCartButton;
  #continueShoppingButton;
  #viewCartButton;
  #quantityField
  constructor(page) {
    this.page = page;
    this.#productName = page.locator(".col-sm-7 h2");
    this.#productDetails = page.locator(".col-sm-7 p:nth-child(3)");
    this.#availabilityValue = page.locator(".col-sm-7 p:nth-child(6)");
    this.#conditionValue = page.locator(".col-sm-7 p:nth-child(7)");
    this.#brandValue = page.locator(".col-sm-7 p:nth-child(8)");
    this.#addToCartButton = page.locator(".btn.btn-default.cart");
    this.#continueShoppingButton = page.locator(".btn.btn-success.close-modal.btn-block");
    this.#viewCartButton = page.locator(".modal-body :nth-child(2)");
    this.#quantityField = page.locator("#quantity")
  }

  async clickAddToCartButton() {
    await this.#addToCartButton.click();
    return this;
  }

  async clickViewCartButton() {
    await this.#viewCartButton.click();
    return this;
  }

  async clickContinueShoppingButton() {
    await this.#continueShoppingButton.click();
    return this;
  }

  async fillQuantityField(quantity) {
    await this.#quantityField.fill(quantity);
    return this;
  }

  async addToCartAndContinueShopping() {
    await this.clickAddToCartButton();
    await this.clickContinueShoppingButton()
    return this;
  }

  async addToCartAndViewCart() {
    await this.clickAddToCartButton();
    await this.clickViewCartButton();
    return this;
  }

  async verifyProductNameVisible() {
    return await this.#productName.isVisible();
  }

  async verifyProductNameText(name) {
    const actualName = await this.#productName.innerText();
    expect(actualName).toEqual(name);
  }

  async verifyProductName(name) {
    await this.verifyProductNameVisible();
    await this.verifyProductNameText(name);
    return this;
  }

  async getProductDetails() {
    return await this.#productDetails.innerText();
  }
  async verifyProductDetailsVisible() {
    return await this.#productDetails.isVisible();
  }

  async verifyProducDetailsText(details) {
    const actualDetails = await this.getProductDetails();
    return expect(actualDetails).toEqual(details);
  }

  async getAvailabilityValue() {
    return await this.#availabilityValue.innerText();
  }

  async verifyAvailability(availability) {
    const actualAvailability = await this.getAvailabilityValue();
    return expect(actualAvailability).toEqual(availability);
  }

  async getConditionValue() {
    return await this.#conditionValue.innerText();
  }

  async verifyCondition(condition) {
    const actualCondition = await this.getConditionValue();
    return expect(actualCondition).toEqual(condition);
  }

  async getBrandValue() {
    return await this.#brandValue.innerText();
  }

  async verifyBrand(brand) {
    const actualBrand = await this.getBrandValue();
    return expect(actualBrand).toEqual(brand);
  }

  async verifyProductInfo({ name, details, availability, condition, brand }) {
    await this.verifyProductNameText(name);
    await this.verifyProducDetailsText(details);
    await this.verifyAvailability(availability);
    await this.verifyCondition(condition);
    await this.verifyBrand(brand);
    return this;
  }
}
