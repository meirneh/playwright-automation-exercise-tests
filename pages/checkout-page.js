import {expect} from "@playwright/test";
export default class CheckoutPage {
    #addressDeliveryFullName;
    #addressDeliveryCompany;
    #addressDeliveryFirstAddress;
    #addressDeliverySecondAddress;
    #addressDeliveryCityStatezip;
    #addressDeliveryCountry;
    #addresDeliveryPhone;
    #productWrapper;
    #productName;
    #productDescription;
    #price;
    #quantity;
    #productTotalPrice;
    #placeOrderButton;

    constructor(page) {
       this.page = page;
       this.#addressDeliveryFullName = page.locator("#address_delivery .address_firstname.address_lastname");
       this.#addressDeliveryCompany = page.locator("#address_delivery :nth-child(3)");
       this.#addressDeliveryFirstAddress = page.locator("#address_delivery :nth-child(4)");
       this.#addressDeliverySecondAddress = page.locator("#address_delivery :nth-child(5)");
       this.#addressDeliveryCityStatezip = page.locator("#address_delivery .address_postcode");
       this.#addressDeliveryCountry = page.locator("#address_delivery .address_country_name");
       this.#addresDeliveryPhone = page.locator("#address_delivery .address_phone");
       this.#productWrapper = page.locator("[id^='product-']"); 
       this.#productName = page.locator(".cart_description h4 ");
       this.#productDescription = page.locator(".cart_description > p");
       this.#price = page.locator(".cart_price");
       this.#quantity = page.locator(".cart_quantity");
       this.#productTotalPrice = page.locator(".cart_total_price");
       this.#placeOrderButton = page.locator(".btn.btn-default.check_out");      
    }

    async clickPlaceOrderButton() {
      await this.#placeOrderButton.click();
      return this;
    }

    async getProductsNamesInCart() {
        const productInCartList = [];
        const actualQuantity = await this.countProducts();
        for (let i = 0; i < actualQuantity; i++) {
          const name = await this.#productName.nth(i).innerText();
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

      async countProducts() {
        return await this.#productWrapper.count();
      }

      async findProductInCart(productName, callback= async () => {}, logSelectedProduct = true) {
        const actualQuantity = await this.countProducts(); // Counts the products in the cart
        for (let i = 0; i < actualQuantity; i++) { // Iterates on each product.
            const currentProductName = await this.#productName.nth(i).innerText(); // gets the name of the product
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
          return await this.#productDescription.nth(i).innerText();
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
          return await this.#productTotalPrice.nth(i).innerText();
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
    

    async getAddressDeliveryFullName() {
        return await this.#addressDeliveryFullName.innerText();
    }

    async verifyAddressDeliveryFullName(expectedFullName) {
        const actualFullName = await this.getAddressDeliveryFullName()
        return expect(actualFullName).toEqual(expectedFullName);
    }

    async getAddressDeliveryCompany() {
        return await this.#addressDeliveryCompany.innerText();
    }

    async verifyAddressDeliveryCompany(expectCompany) {
        const actualCompany = await this.getAddressDeliveryCompany();
        return expect(actualCompany).toEqual(expectCompany);
    }

    async getAddressDeliveryFirstAddress() {
        return await this.#addressDeliveryFirstAddress.innerText();
    }

    async verifyAddressDeliveryFirstAddress(expectFirstAddress) {
        const actualFirstAddress = await this.getAddressDeliveryFirstAddress();
        return expect(actualFirstAddress).toEqual(expectFirstAddress);
    }

    async getAddressDeliverySecondAddress() {
        return await this.#addressDeliverySecondAddress.innerText();
    }

    async verifyAddressDeliverySecondAddress(expectSecondAddress) {
        const actualSecondAddress = await this.getAddressDeliverySecondAddress();
        return expect(actualSecondAddress).toEqual(expectSecondAddress);
    }

    async getAddresDeliveryCityStateZip() {
        return await this.#addressDeliveryCityStatezip.innerText();
    }

    async verifyAddresDeliveryCityStateZip(expectCityStateZip) {
        const actualCityStateZip = await this.getAddresDeliveryCityStateZip();
        return expect(actualCityStateZip).toEqual(expectCityStateZip);
    }

    async getAddressDeliveryCountry() {
        return await this.#addressDeliveryCountry.innerText();
    }

    async verifyAddressDeliveryCountry(expectedCountry) {
        const actualCountry = await this.getAddressDeliveryCountry();
        return expect(actualCountry).toEqual(expectedCountry);
    }

    async getAddressDeliveryPhone() {
        return await this.#addresDeliveryPhone.innerText();
    }

    async verifyAddressDeliveryPhone(expectedPhone) {
        const actualPhone = await this.getAddressDeliveryPhone();
        return expect(actualPhone).toEqual(expectedPhone);
    }

    async verifyAddressDeliveryInfo({expectedFullName, expectedCompany, expectedFirstAddress, 
                                    expectedSecondAddress, expectedCityStateZip, 
                                    expectedCountry,expectedPhone}) {
      await this.verifyAddressDeliveryFullName(expectedFullName);
      await this.verifyAddressDeliveryCompany(expectedCompany);
      await this.verifyAddressDeliveryFirstAddress(expectedFirstAddress);
      await this.verifyAddressDeliverySecondAddress(expectedSecondAddress );
      await this.verifyAddresDeliveryCityStateZip(expectedCityStateZip);
      await this.verifyAddressDeliveryCountry(expectedCountry);
      await this.verifyAddressDeliveryPhone(expectedPhone);
    }
}