import { chromium, expect, test } from "@playwright/test";
import HomePage from "../pages/home-page";
import LoginSignUpPage from "../pages/login-signup-page";
import SignUpPage from "../pages/sign-up-page";
import AccountCreatedPage from "../pages/account-created-page";
import DeletePage from "../pages/delete-account-page";
import ContactUsPage from "../pages/contact-us-page";
import {title, titleLogin, expectedDeleteMsg, enterAccountTitle, errorLoginMessage, errorExistMailMsg, getInTouchTitle, testText} from "../../utils/messageAndTitles.js"
import {user1, user2} from "../../utils/users.js"

const maxWindow = { width: 1920, height: 1080 };

test.describe("Login,Register,Contact Us", () => {
  let browser, context, page;
  /**@type {HomePage} */
  let homepage;
  /**@type {LoginSignUpPage} */
  let loginsignuppage;
  /**@type{SignUpPage} */
  let signuppage;
  /**@type{AccountCreatedPage} */
  let accountcreatedpage;
  /**@type{DeletePage} */
  let deletepage;
  /**@type{ContactUsPage}*/
  let contacuspage;
 

  test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    await page.setViewportSize(maxWindow);
    await page.goto("https://www.automationexercise.com/");
    homepage = new HomePage(page);
    loginsignuppage = new LoginSignUpPage(page);
    signuppage = new SignUpPage(page);
    accountcreatedpage = new AccountCreatedPage(page);
    deletepage = new DeletePage(page);
    contacuspage = new ContactUsPage(page);
  });

  test.afterAll(async () => {
    // await new Promise((resolve) => setTimeout(resolve, 60000));
    await context.close();
    await page.close();
  });

  test("test 01 Register User", async () => {
    await homepage.verifyHomeButton();
    await homepage.clickSignupLoginLogoutButton();
    await loginsignuppage.verifyNewUserTitle(title);
    await loginsignuppage.verifyVisibleNewUserTitle();
    await loginsignuppage.verifyNewUserTitleText(title);
    await loginsignuppage.createNewUser(user1.name, user1.email);
    await signuppage.verifyUserAccountTitleText(enterAccountTitle);
    await signuppage.registerNewAccount(user1);
    await accountcreatedpage.verifyAccountCreatedMsg();
    await accountcreatedpage.clickContinueButton();
    await homepage.verifyLoggedInUser(user1.name);
    await homepage.clickDeleteAccountButton();
    await deletepage.verifyDeletionAndContinue(expectedDeleteMsg);
  });

  test("test 02 Login User with correct email and password", async () => {
    await homepage.verifyHomeButton();
    await homepage.clickSignupLoginLogoutButton();
    await loginsignuppage.createNewUser(user2.name, user2.email);
    await signuppage.registerNewAccount(user2);
    await accountcreatedpage.clickContinueButton();
    await homepage.verifyLoggedInUser(user2.name);
    await homepage.clickSignupLoginLogoutButton();
    await homepage.verifySignupLoginLogoutButton();
    await homepage.clickSignupLoginLogoutButton();
    await loginsignuppage.verifyLoginTitle(titleLogin);
    await loginsignuppage.LoginUser(user2.email, user2.password);
    await homepage.verifyLoggedInUser(user2.name);
    await homepage.clickDeleteAccountButton();
    await deletepage.verifyDeletionAndContinue(expectedDeleteMsg);
  });

  test("test 03 Login User with incorrect email and password", async () => {
    await homepage.verifyHomeButton();
    await homepage.clickSignupLoginLogoutButton();
    await loginsignuppage.verifyLoginTitle(titleLogin);
    await loginsignuppage.LoginUser(user2.email, user2.password);
    console.log(await loginsignuppage.getErrorLoginMsgText());
    await loginsignuppage.verifyerrorLoginText(errorLoginMessage);
  });

  test("test 04 Logout User", async () => {
    await homepage.clickSignupLoginLogoutButton();
    await loginsignuppage.createNewUser(user2.name, user2.email);
    await signuppage.registerNewAccount(user2);
    await accountcreatedpage.clickContinueButton();
    await homepage.verifyLoggedInUser(user2.name);
    await homepage.clickSignupLoginLogoutButton();
    await homepage.verifySignupLoginLogoutButton();
    await homepage.clickSignupLoginLogoutButton();
    await loginsignuppage.verifyLoginTitle(titleLogin);
    await loginsignuppage.LoginUser(user2.email, user2.password);
    await homepage.verifyLoggedInUser(user2.name);
    await homepage.clickDeleteAccountButton();
    await deletepage.verifyDeletionAndContinue(expectedDeleteMsg);
  });

  test("test 05 Register User with existing email", async () => {
    await homepage.clickSignupLoginLogoutButton();
    await loginsignuppage.createNewUser(user2.name, user2.email);
    await signuppage.registerNewAccount(user2);
    await homepage.clickSignupLoginLogoutButton();
    await homepage.clickSignupLoginLogoutButton();
    await loginsignuppage.createNewUser(user2.name, user2.email);
    await loginsignuppage.verifyerrorMailExistMsgText(errorExistMailMsg);
    await loginsignuppage.LoginUser(user2.email, user2.password);
    await homepage.verifyLoggedInUser(user2.name);
    await homepage.clickDeleteAccountButton();
    await page.pause()
    await deletepage.verifyDeletionAndContinue(expectedDeleteMsg);
  });

  test("test 06  Contact Us Form", async () => {
    await homepage.verifyHomeButton();
    await homepage.clickContactUsButton();
    await contacuspage.verifyGetInTouchTitle(getInTouchTitle);
    await contacuspage.getInTouch(user2.name,user2.email,testText,testText)
    await homepage.clickHomeButton()
    await homepage.verifyHomeButton() 
  });
});
