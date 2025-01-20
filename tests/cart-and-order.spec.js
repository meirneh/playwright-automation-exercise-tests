import { chromium, expect, test } from "@playwright/test";
import HomePage from "../pages/home-page";
import ProductsPage from "../pages/products-page";
import ProductPage from "../pages/product-page";
import CartPage from "../pages/cart-pages";
import LoginSignUpPage from "../pages/login-signup-page";
import SignUpPage from "../pages/sign-up-page";
import CheckoutPage from "../pages/checkout-page";
import PaymentPage from "../pages/payment-page";
import AccountCreatedPage from "../pages/account-created-page";
import DeletePage from "../pages/delete-account-page";
import {user1} from "../../utils/users"
import {expectedDeleteMsg} from "../../utils/messageAndTitles"
import {
  productsList1,
  quantityProductsInCart,
  productsInCart,
  prod0,
  prod1,
  prod2,
  prod3,
  prod4,
  productInfo3,
  productInfo4,
  productInfo5
} from "../../utils/productsAndItems";

import { expectedDeliveryInfo1, paymentDetails1 } from "../../utils/paymentsAndDeliveries";

const maxSizeWindow = { width: 1920, height: 1080 };

test.describe.serial("Cart and Order Management", () => {
  let browser, context, page;
  /**@type {HomePage} */
  let homepage;
  /**@type {ProductsPage} */
  let productspage;
  /**@type{ProductPage} */
  let productpage;
  /**@type{CartPage} */
  let cartpage;
  /**@type{LoginSignUpPage} */
  let loginsignuppage;
  /**@type{CheckoutPage} */
  let checkoutpage;
  /**@type{SignUpPage} */
  let signuppage;
   /**@type{PaymentPage} */
   let paymentpage
  /**@type{AccountCreatedPage} */
  let accountcreatedpage;
  /**@type{DeletePage} */
  let deletepage;

  test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    await page.setViewportSize(maxSizeWindow);
    await page.goto("https://www.automationexercise.com/");
    homepage = new HomePage(page);
    productspage = new ProductsPage(page);
    productpage = new ProductPage(page);
    cartpage = new CartPage(page);
    loginsignuppage = new LoginSignUpPage(page);
    signuppage = new SignUpPage(page);
    checkoutpage = new CheckoutPage(page);
    paymentpage = new PaymentPage(page);
    accountcreatedpage = new AccountCreatedPage(page);
    deletepage = new DeletePage(page);
  });

  test.afterAll(async () => {
    context.close();
    page.close();
  });

  test("test 01 Add Products in Cart", async () => {
    await homepage.clickProductsButton();
    await productspage.selectViewProductByName(productsList1[0]);
    await productpage.addToCartAndContinueShopping();
    await homepage.clickProductsButton();
    await productspage.selectViewProductByName(productsList1[5]);
    await productpage.addToCartAndViewCart();
    await cartpage.verifyQuantityProducts(quantityProductsInCart);
    await cartpage.verifyProdNamesInCart(productsInCart);
    await cartpage.findProductInCart(productsInCart[0], async () => {});
    await cartpage.verifyProductInfoInCart(prod0);
    await cartpage.findProductInCart(productsInCart[1], async () => {});
    await cartpage.verifyProductInfoInCart(prod1);
  });

  test("test 02 Verify Product quantity in Cart", async () => {
    await homepage.clickProductsButton();
    await productspage.selectViewProductByName(productsList1[3]);
    await productpage.verifyProductInfo(productInfo3);
    await productpage.fillQuantityField("4");
    await productpage.addToCartAndViewCart();
    await cartpage.findProductInCart(productsList1[3], async () => {});
    await cartpage.verifyProductInfoInCart(prod2);
  });

  test("test 03 Place Order: Register while Checkout", async () => {
    await homepage.clickProductsButton();
    await productspage.selectViewProductByName(productsList1[22]);
    await productpage.verifyProductInfo(productInfo4);
    await productpage.addToCartAndViewCart();
    await cartpage.findProductInCart(productsList1[22], async () => {});
    await cartpage.verifyProductInfoInCart(prod3);
    await cartpage.clickCheckoutButton();
    await cartpage.clickRegisterLoginButton();
    await loginsignuppage.createNewUser(user1.name, user1.email);
    await signuppage.registerNewAccount(user1);
    await accountcreatedpage.verifyAccountCreatedMsg();
    await accountcreatedpage.clickContinueButton();
    await homepage.verifyLoggedInUser(user1.name);
    await homepage.clickCartButton();
    await cartpage.clickCheckoutButton();
    await checkoutpage.verifyAddressDeliveryInfo(expectedDeliveryInfo1);
    await checkoutpage.findProductInCart(productsList1[22], async () => {});
    await checkoutpage.verifyProductInfoInCart(prod3);
    await checkoutpage.clickPlaceOrderButton();
    await paymentpage.fillAndSubmitPaymentDetails(paymentDetails1)
    await paymentpage.verifyConfirmationPayment();
    await paymentpage.clickContinueButton();
    await homepage.clickDeleteAccountButton();
    await deletepage.verifyDeletionAndContinue(expectedDeleteMsg);
  });

  test("test 04 Register before Checkout ", async () => {
    await homepage.clickProductsButton();
    await homepage.clickSignupLoginLogoutButton();
    await loginsignuppage.createNewUser(user1.name, user1.email);
    await signuppage.registerNewAccount(user1);
    await accountcreatedpage.verifyAccountCreatedMsg();
    await accountcreatedpage.clickContinueButton();
    await homepage.verifyLoggedInUser(user1.name);
    await homepage.clickProductsButton();
    await productspage.selectViewProductByName(productsList1[24]);
    await productpage.verifyProductInfo(productInfo5);
    await productpage.addToCartAndViewCart();
    await cartpage.findProductInCart(productsList1[24], async () => {});
    await cartpage.verifyProductInfoInCart(prod4);
    await cartpage.clickCheckoutButton();
    await checkoutpage.verifyAddressDeliveryInfo(expectedDeliveryInfo1);
    await checkoutpage.findProductInCart(productsList1[24], async () => {});
    await checkoutpage.verifyProductInfoInCart(prod4);
    await checkoutpage.clickPlaceOrderButton();
    await paymentpage.fillAndSubmitPaymentDetails(paymentDetails1)
    await paymentpage.verifyConfirmationPayment();
    await paymentpage.clickContinueButton();
    await homepage.clickDeleteAccountButton();
    await deletepage.verifyDeletionAndContinue(expectedDeleteMsg);
  });
});
