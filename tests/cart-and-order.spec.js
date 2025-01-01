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
const maxSizeWindow = { width: 1920, height: 1080 };
const quantityProductsInCart = 2;
const productsInCart = ["Blue Top", "Summer White Top"];
const prod0 = {
  productName: productsInCart[0],
  expectedDescription: "Women > Tops",
  expectedPrice: "Rs. 500",
  expectedQuantity: "1",
  expectedTotalPrice: "Rs. 500",
};
const prod1 = {
  productName: productsInCart[1],
  expectedDescription: "Women > Tops",
  expectedPrice: "Rs. 400",
  expectedQuantity: "1",
  expectedTotalPrice: "Rs. 400",
};

const prod2 = {
  productName: productsList1[3],
  expectedDescription: "Women > Dress",
  expectedPrice: "Rs. 1500",
  expectedQuantity: "4",
  expectedTotalPrice: "Rs. 6000",
};

const prod3 = {
  productName: productsList1[22],
  expectedDescription: "Men > Tshirts",
  expectedPrice: "Rs. 1000",
  expectedQuantity: "1",
  expectedTotalPrice: "Rs. 1000",
};

const prod4 = {
  productName: productsList1[24],
  expectedDescription: "Men > Tshirts",
  expectedPrice: "Rs. 850",
  expectedQuantity: "1",
  expectedTotalPrice: "Rs. 850",
};

const productInfo3 = {
  name: productsList1[3],
  details: "Category: Women > Dress",
  availability: "Availability: In Stock",
  condition: "Condition: New",
  brand: "Brand: Madame",
};

const productInfo4 = {
  name: productsList1[22],
  details: "Category: Men > Tshirts",
  availability: "Availability: In Stock",
  condition: "Condition: New",
  brand: "Brand: Polo",
};

const productInfo5 = {
  name: productsList1[24],
  details: "Category: Men > Tshirts",
  availability: "Availability: In Stock",
  condition: "Condition: New",
  brand: "Brand: H&M",
};


const user1 = {
  name: "Haim Cohen",
  email: "cohen@gmail.com",
  option: "Mr",
  password: "1234",
  birthDate: { dayNum: "7", month: "12", yearNum: "1986" },
  firstName: "Haim",
  lastName: "Cohen",
  companyName: "Cohen ltd.",
  firstAddress: "Sabionim 1",
  secondAddress: "Sabionim 2",
  country: "Israel",
  stateName: "Central District",
  cityName: "Tel Aviv",
  zipcode: "zzz1234",
  mobile: "0501234567",
};

const expectedDeleteMsg = "ACCOUNT DELETED!";

const expectedDeliveryInfo1 = {expectedFullName:"Mr. Haim Cohen", 
                              expectedCompany: "Cohen ltd.",
                              expectedFirstAddress:"Sabionim 1",
                              expectedSecondAddress:"Sabionim 2",
                              expectedCityStateZip:"Tel Aviv Central District zzz1234",
                              expectedCountry:"Israel",
                              expectedPhone: "0501234567"};
const paymentDetails1 = 
{name: user1.name,
  cardNumber: "4580123456789012",
  cvcNumber: "123",
  expiryDate: {
      month: "10",
      year: "2030"
  }
}


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

  test("test 05 Place Order: Register while Checkout", async () => {
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

  test("test 06 Register before Checkout ", async () => {
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
