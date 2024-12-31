import { expect } from "@playwright/test";
export default class CartPage {
  #emailSuscriptionField;
  #suscribeButton;
  #suscribeSuccessMsg;
  #productWrapper;
  #cartDescription;
  #cartProductName;
  #price;
  #quantity;
  #cartTotalPrice;
  #checkoutButton;
  #registerLoginButton;

  constructor(page) {
    this.page = page;
    this.#emailSuscriptionField = page.locator("#susbscribe_email");
    this.#suscribeButton = page.locator("#subscribe");
    this.#suscribeSuccessMsg = page.locator("#success-subscribe");
    this.#productWrapper = page.locator("[id^='product-']");
    this.#cartDescription = page.locator(".cart_description > p");
    this.#cartProductName = page.locator(".cart_description h4 ");
    this.#price = page.locator(".cart_price");
    this.#quantity = page.locator(".cart_quantity");
    this.#cartTotalPrice = page.locator(".cart_total_price");
    this.#checkoutButton = page.locator(".btn.btn-default.check_out");
    this.#registerLoginButton = page.locator(".modal-body :nth-child(2)")
  }

  async suscribeUser(email) {
    await this.#emailSuscriptionField.fill(email);
    await this.#suscribeButton.click();
    return this;
  }

  async countProducts() {
    return await this.#productWrapper.count();
  }

  async getProductsNamesInCart() {
    const productInCartList = [];
    const actualQuantity = await this.countProducts();
    for (let i = 0; i < actualQuantity; i++) {
      const name = await this.#cartProductName.nth(i).innerText();
      productInCartList.push(name);
    }
    return productInCartList;
  }

  async verifyProdNamesInCart(expectedProductsNames) {
    const actualQuantity = await this.countProducts();
    const actualNames = await this.getProductsNamesInCart();
    for (let i = 0; i < actualQuantity; i++) {
      expect(await actualNames[i].trim()).toEqual(
        expectedProductsNames[i].trim()
      );
    }
    return this;
  }

  async clickCheckoutButton() {
    await this.#checkoutButton.click();
    return this;
  }

  async clickRegisterLoginButton() {
    await this.#registerLoginButton.click()
    return this;
  }

    async findProductInCart(productName, callback= async () => {}, logSelectedProduct = true) {
      const actualQuantity = await this.countProducts(); // Counts the products in the cart
      for (let i = 0; i < actualQuantity; i++) { // Iterates on each product.
          const currentProductName = await this.#cartProductName.nth(i).innerText(); // gets the name of the product
          if (currentProductName === productName) { // if it matches the product you are looking for:
              if (logSelectedProduct) {
                  console.log("The selected product is " + currentProductName); // Prints if is enable
              }
              return await callback(i); // calls the callback with the index of the founded product 
          }
      }
  }

  async getCartDescriptionInCart(productName) {
    return this.findProductInCart(productName,async(i)=>{
      return await this.#cartDescription.nth(i).innerText();
    },false)
  }

  async verifyDescriptionInCart(productName, expectedDescription) {
    const actualDescription = await this.getCartDescriptionInCart(productName)
    return expect(actualDescription).toEqual(expectedDescription)
  }
 

  async getPriceProdInCart(productName) {
    return this.findProductInCart(productName, async (i)=>{
     return await this.#price.nth(i).innerText();
    }, false )
  }

  async verifyPriceProdInCart(productName,expectedPrice) {
   const actualPrice = await this.getPriceProdInCart(productName)
   return expect(actualPrice).toEqual(expectedPrice)
  }

  async getQuantityProdInCart(productName) {
   return this.findProductInCart(productName, async(i)=>{
    return await this.#quantity.nth(i).innerText();
   },false)
  }

  async verifyQuantityProdInCart(productName,expectedQuantity) {
    const actualQuantity = await this.getQuantityProdInCart(productName)
    return expect(actualQuantity).toEqual(expectedQuantity);
   }

   async getTotalPriceProdInCart(productName) {
    return this.findProductInCart(productName, async (i)=>{
      return await this.#cartTotalPrice.nth(i).innerText();
    })
  }

  
  async verifyTotalPriceProdInCart(productName,expectedTotalPrice) {
   const actualTotalPrice = await this.getTotalPriceProdInCart(productName)
   return expect(actualTotalPrice).toEqual(expectedTotalPrice)
  }

  async verifyQuantityProducts(expectedQuantity) {
    const actualQuantity = await this.countProducts();
    expect(actualQuantity).toEqual(expectedQuantity);
    return this;
  }

  async verifyProductInfoInCart({productName, expectedDescription, expectedPrice, expectedQuantity, expectedTotalPrice}) {
    await this.verifyDescriptionInCart(productName,expectedDescription)
    await this.verifyPriceProdInCart(productName,expectedPrice)
    await this.verifyQuantityProdInCart(productName,expectedQuantity)
    await this.verifyTotalPriceProdInCart(productName,expectedTotalPrice)
    return this
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
    await this.verifySuscribeSuscribeText();
    return this;
  }
}
