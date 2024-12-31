import { expect } from "@playwright/test";
export default class ProductsPage {
  #productsTitle;
  #productImageWrapper;
  #singleProducts;
  #viewProductButton;
  #productInfoText;
  #searchProductsField;
  #searchProductsButton;
  
  constructor(page) {
    this.page = page;
    this.#productsTitle = page.locator("body > section:nth-child(3) > div > div > div.col-sm-9.padding-right > div > h2");
    this.#productImageWrapper = page.locator(".product-image-wrapper");
    this.#singleProducts = page.locator(".single-products");
    this.#productInfoText = page.locator(".productinfo.text-center p");
    this.#viewProductButton = page.locator(".fa.fa-plus-square");
    this.#searchProductsField = page.locator(".form-control.input-lg");
    this.#searchProductsButton = page.locator(".btn.btn-default.btn-lg");
  }

  async selectViewProductByName(name) {
    const productCount = await this.#productImageWrapper.count();
    const actualNames = await this.getProductsNames();
    for (let i = 0; i < productCount; i++) {
      if (actualNames[i].trim() === name.trim()) {
        console.log("The selected product is:" + (await actualNames[i]));
        await this.#viewProductButton.nth(i).click();
        break;
      }
    }
    return this;
  }

  async searchProduct(product) {
    await this.#searchProductsField.fill(product);
    await this.#searchProductsButton.click();
    return this;
  }

  async verifyProductsTitleVisible() {
    return await this.#productsTitle.isVisible();
  }

  async verifyProductsTitle(title) {
    await this.verifyProductsTitleVisible();
    await this.getProductsTitleText(title);
    return this;
  }

  async verifyQuantityProducts(expectedCount) {
    const actualCount = await this.#productImageWrapper.count();
    return expect(actualCount).toEqual(expectedCount);
  }

  async getQuantityProducts() {
    return await this.#productImageWrapper.count();
  }

  async getProductsNames() {
    const namesList = [];
    const productCount = await this.#productInfoText.count();
    for (let i = 0; i < productCount; i++) {
      const name = await this.#productInfoText.nth(i).innerText();
      namesList.push(name);
    }
    return namesList;
  }

  async verifyProductsNames(expectedProductsNames) {
    const productCount = await this.#productInfoText.count();
    const actualNames = await this.getProductsNames();
    for (let i = 0; i < productCount.length; i++) {
      expect(await actualNames[i].trim()).toEqual(
        expectedProductsNames[i].trim()
      );
    }
    return this;
  }
}
