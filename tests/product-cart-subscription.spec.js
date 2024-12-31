import { chromium, expect, test } from "@playwright/test";
import HomePage from "../pages/home-page";
import ProductsPage from "../pages/products-page";
import ProductPage from "../pages/product-page";
import CartPage from "../pages/cart-pages";
const maxSizeWindow = { width: 1920, height: 1080 };
const quantityProducts1 = 34;
const quantityProducts2 = 2;
const emailUser = "cohen@gmail.com";
const productsList1 = [
  "Blue Top",
  "Men Tshirt",
  "Sleeveless Dress",
  "Stylish Dress",
  "Winter Top",
  "Summer White Top",
  "Madame Top For Women",
  "Fancy Green Top",
  "Sleeves Printed Top - White",
  "Half Sleeves Top Schiffli Detailing - Pink",
  "Frozen Tops For Kids",
  "Full Sleeves Top Cherry - Pink",
  "Printed Off Shoulder Top - White",
  "Sleeves Top and Short - Blue & Pink",
  "Little Girls Mr. Panda Shirt",
  "Sleeveless Unicorn Patch Gown - Pink",
  "Cotton Mull Embroidered Dress",
  "Blue Cotton Indie Mickey Dress",
  "Long Maxi Tulle Fancy Dress Up Outfits -Pink",
  "Sleeveless Unicorn Print Fit & Flare Net Dress - Multi",
  "Colour Blocked Shirt – Sky Blue",
  "Pure Cotton V-Neck T-Shirt",
  "Green Side Placket Detail T-Shirt",
  "Premium Polo T-Shirts",
  "Pure Cotton Neon Green Tshirt",
  "Soft Stretch Jeans",
  "Regular Fit Straight Jeans",
  "Grunt Blue Slim Fit Jeans",
  "Rose Pink Embroidered Maxi Dress",
  "Cotton Silk Hand Block Print Saree",
  "Rust Red Linen Saree",
  "Beautiful Peacock Blue Cotton Linen Saree",
  "Lace Top For Women",
  "GRAPHIC DESIGN MEN T SHIRT - BLUE",
];

const productsList2 = ["Madame Top For Women", "Lace Top For Women"];

const productInfo1 = {
  name: productsList1[0],
  details: "Category: Women > Tops",
  availability: "Availability: In Stock",
  condition: "Condition: New",
  brand: "Brand: Polo",
};

const productItem = "Women";

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
    await homepage.suscribeUser(emailUser);
    await homepage.verifySuscribeMessage();
  });

  test("test 04 Verify Subscription in Cart page ",async ()=>{
    await homepage.clickCartButton();
    await cartpage.suscribeUser(emailUser);
    await cartpage.verifySuscribeMessage()
  })
});
