import { test, expect } from "../fixtures/test-fixture";
import { user1 } from "../../utils/users";
import { expectedDeleteMsg } from "../../utils/messageAndTitles";
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
  productInfo5,
} from "../../utils/productsAndItems";

import {
  expectedDeliveryInfo1,
  paymentDetails1,
} from "../../utils/paymentsAndDeliveries";

test.describe.serial("Cart and Order Management", () => {
  test("test 01 Add Products in Cart", async ({
    homepage,
    productspage,
    productpage,
    cartpage,
  }) => {
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

  test("test 02 Verify Product quantity in Cart", async ({
    homepage,
    productspage,
    productpage,
    cartpage,
  }) => {
    await homepage.clickProductsButton();
    await productspage.selectViewProductByName(productsList1[3]);
    await productpage.verifyProductInfo(productInfo3);
    await productpage.fillQuantityField("4");
    await productpage.addToCartAndViewCart();
    await cartpage.findProductInCart(productsList1[3], async () => {});
    await cartpage.verifyProductInfoInCart(prod2);
  });

  test("test 03 Place Order: Register while Checkout", async ({
    homepage,
    productspage,
    productpage,
    cartpage,
    loginsignuppage,
    signuppage,
    accountcreatedpage,
    checkoutpage,
    paymentpage,
    deletepage,
  }) => {
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
    await paymentpage.fillAndSubmitPaymentDetails(paymentDetails1);
    await paymentpage.verifyConfirmationPayment();
    await paymentpage.clickContinueButton();
    await homepage.clickDeleteAccountButton();
    await deletepage.verifyDeletionAndContinue(expectedDeleteMsg);
  });

  test("test 04 Register before Checkout ", async ({
    homepage,
    productspage,
    productpage,
    cartpage,
    loginsignuppage,
    signuppage,
    accountcreatedpage,
    checkoutpage,
    paymentpage,
    deletepage,
  }) => {
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
    await paymentpage.fillAndSubmitPaymentDetails(paymentDetails1);
    await paymentpage.verifyConfirmationPayment();
    await paymentpage.clickContinueButton();
    await homepage.clickDeleteAccountButton();
    await deletepage.verifyDeletionAndContinue(expectedDeleteMsg);
  });
});
