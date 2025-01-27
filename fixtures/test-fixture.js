import { test as baseTest } from "@playwright/test";
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
import ContactUsPage from "../pages/contact-us-page";

// Create an extended test with custom fixtures
const maxWindow = { width: 1920, height: 1080 };
export const test = baseTest.extend({
  // Fixture Configuration
  context: async ({ browser }, use) => {
    const context = await browser.newContext();
    await use(context);
    await context.close(); // Close the context after testing
  },

  page: async ({ context }, use) => {
    const page = await context.newPage();
    await page.setViewportSize(maxWindow);
    await page.goto("https://www.automationexercise.com/");
    await use(page);
    await page.close(); // Close page after testing
  },

  // Initialize the pages (Page Objects)
  homepage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productspage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  productpage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartpage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  loginsignuppage: async ({ page }, use) => {
    await use(new LoginSignUpPage(page));
  },
  signuppage: async ({ page }, use) => {
    await use(new SignUpPage(page));
  },
  checkoutpage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  paymentpage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },
  accountcreatedpage: async ({ page }, use) => {
    await use(new AccountCreatedPage(page));
  },
  deletepage: async ({ page }, use) => {
    await use(new DeletePage(page));
  },
  contactuspage: async({page},use)=>{
   await use(new ContactUsPage(page))
  }
});
