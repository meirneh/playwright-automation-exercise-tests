import { chromium, expect, test } from "@playwright/test";
import HomePage from "../pages/home-page";
import ProductsPage from "../pages/products-page";
import ProductPage from "../pages/product-page";
import CartPage from "../pages/cart-pages";
import {quantityProducts1, quantityProducts2, productsList1, productsList2, productInfo1, productItem} from "../../utils/productsAndItems";
import {user1} from "../../utils/users";
const maxSizeWindow = { width: 1920, height: 1080 };

test.describe.serial("Product, Cart, and Subscription Functionality", () => {
  let browser, context, page;
  /**@type {HomePage} */
  let homepage;
  /**@type {ProductsPage} */
  let productspage;
  /**@type {ProductPage} */
  let productpage;
  /**@type{CartPage}*/
  let cartpage;

  test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    await page.setViewportSize(maxSizeWindow);
    await page.goto("https://www.automationexercise.com/");
    homepage = new HomePage(page);
    productspage = new ProductsPage(page);
    productpage = new ProductPage(page);
    cartpage = new CartPage(page)
  });

  test.afterAll(async () => {
    await context.close();
    await page.close();
  });

  test("test 01 Verify All Products and product detail page ", async () => {
    await homepage.clickProductsButton();
    console.log(await productspage.getProductsNames(quantityProducts1));
    await productspage.verifyProductsNames(productsList1);
    await productspage.selectViewProductByName(productsList1[0]);
    await productpage.verifyProductInfo(productInfo1);
  });

  test("test 02 Search Product", async () => {
    await homepage.clickProductsButton();
    await productspage.searchProduct(productItem);
    console.log(await productspage.getQuantityProducts());
    await productspage.verifyQuantityProducts(quantityProducts2);
    console.log(await productspage.getProductsNames(quantityProducts2));
    await productspage.verifyProductsNames(productsList2);
  });

  test("test 03 Verify Subscription in home page", async () => {
    await homepage.clickHomeButton();
    await homepage.suscribeUser(user1.email);
    await homepage.verifySuscribeMessage();
  });

  test("test 04 Verify Subscription in Cart page ",async ()=>{
    await homepage.clickCartButton();
    await cartpage.suscribeUser(user1.email);
    await cartpage.verifySuscribeMessage()
  })
});
