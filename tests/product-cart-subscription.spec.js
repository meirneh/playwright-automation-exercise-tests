import { test, expect } from "../fixtures/test-fixture";
import {
  quantityProducts1,
  quantityProducts2,
  productsList1,
  productsList2,
  productInfo1,
  productItem,
} from "../utils/productsAndItems";
import { user1 } from "../utils/users";

test.describe.serial("Product, Cart, and Subscription Functionality", () => {
  test("test 01 Verify All Products and product detail page ", async ({
    homepage,
    productspage,
    productpage,
  }) => {
    await homepage.clickProductsButton();
    console.log(await productspage.getProductsNames(quantityProducts1));
    await productspage.verifyProductsNames(productsList1);
    await productspage.selectViewProductByName(productsList1[0]);
    await productpage.verifyProductInfo(productInfo1);
  });

  test("test 02 Search Product", async ({ homepage, productspage }) => {
    await homepage.clickProductsButton();
    await productspage.searchProduct(productItem);
    console.log(await productspage.getQuantityProducts());
    await productspage.verifyQuantityProducts(quantityProducts2);
    console.log(await productspage.getProductsNames(quantityProducts2));
    await productspage.verifyProductsNames(productsList2);
  });

  test("test 03 Verify Subscription in home page", async ({ homepage }) => {
    await homepage.clickHomeButton();
    await homepage.suscribeUser(user1.email);
    await homepage.verifySuscribeMessage();
  });

  test("test 04 Verify Subscription in Cart page ", async ({
    homepage,
    cartpage,
  }) => {
    await homepage.clickCartButton();
    await cartpage.suscribeUser(user1.email);
    await cartpage.verifySuscribeMessage();
  });
});
