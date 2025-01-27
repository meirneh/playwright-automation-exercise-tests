import { test,expect } from "../fixtures/test-fixture";
import {
  title,
  titleLogin,
  expectedDeleteMsg,
  enterAccountTitle,
  errorLoginMessage,
  errorExistMailMsg,
  getInTouchTitle,
  testText,
} from "../../utils/messageAndTitles.js";
import { user1, user2 } from "../../utils/users.js";

test.describe("Login,Register,Contact Us", () => {
  test("test 01 Register User", async ({homepage,
    loginsignuppage,
    signuppage,
    accountcreatedpage,
    deletepage,
  }) => {
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

  test("test 02 Login User with correct email and password", async ({homepage,
    loginsignuppage,
    signuppage,
    accountcreatedpage,
  }) => {
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
  });

  test("test 03 Login User with incorrect email and password", async ({homepage,
    loginsignuppage,
  }) => {
    await homepage.verifyHomeButton();
    await homepage.clickSignupLoginLogoutButton();
    await loginsignuppage.verifyLoginTitle(titleLogin);
    await loginsignuppage.LoginUser(user2.email, user2.password);
    console.log(await loginsignuppage.getErrorLoginMsgText());
    await loginsignuppage.verifyerrorLoginText(errorLoginMessage);
  });

  test("test 04 Logout User", async ({homepage,
    loginsignuppage,
    signuppage,
    accountcreatedpage,
    deletepage
  }) => {
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

  test("test 05 Register User with existing email", async ({homepage,
    loginsignuppage,
    signuppage,
    deletepage,
  }) => {
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
    await deletepage.verifyDeletionAndContinue(expectedDeleteMsg);
  });

  test("test 06  Contact Us Form", async ({homepage,
    contactuspage,
  }) => {
    await homepage.verifyHomeButton();
    await homepage.clickContactUsButton();
    await contactuspage.verifyGetInTouchTitle(getInTouchTitle);
    await contactuspage.getInTouch(user2.name, user2.email, testText, testText);
    await homepage.clickHomeButton();
    await homepage.verifyHomeButton();
  });
});
