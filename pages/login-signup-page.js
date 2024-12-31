import { expect } from "@playwright/test";
export default class LoginSignUpPage {
  #newUserTitle;
  #loginAccountTitle;
  #signupNameField;
  #signupEmailField;
  #loginEmailField;
  #loginPasswordField;
  #signUpButton;
  #loginButton;
  #errorLoginMsg;
  #errorMailExistMsg;

  constructor(page) {
    this.page = page;
    this.#newUserTitle = page.locator("#form :nth-child(3) h2");
    this.#loginAccountTitle = page.locator("#form .col-sm-offset-1 h2");
    this.#signupNameField = page.locator("[data-qa='signup-name']");
    this.#signupEmailField = page.locator("[data-qa='signup-email']");
    this.#signUpButton = page.locator("[data-qa='signup-button']");
    this.#loginEmailField = page.locator("[data-qa='login-email']");
    this.#loginPasswordField = page.locator("[data-qa='login-password']");
    this.#loginButton = page.locator("[data-qa='login-button']");
    this.#errorLoginMsg = page.locator(
      "#form .col-sm-4.col-sm-offset-1 form p"
    );
    this.#errorMailExistMsg = page.locator("#form :nth-child(3)  form  p");
  }

  async fillSignUpName(name) {
    await this.#signupNameField.fill(name);
    return this;
  }

  async fillSignUpEmail(email) {
    await this.#signupEmailField.fill(email);
    return this;
  }

  async clickSignUpButton() {
    await this.#signUpButton.click();
    return this;
  }

  async fillLoginEmail(email) {
    await this.#loginEmailField.fill(email);
    return this;
  }

  async fillLoginPassword(password) {
    await this.#loginPasswordField.fill(password);
    return this;
  }

  async clickLoginButton() {
    await this.#loginButton.click();
    return this;
  }

  async createNewUser(name, email) {
    await this.fillSignUpName(name);
    await this.fillSignUpEmail(email);
    await this.clickSignUpButton();
    return this;
  }

  async LoginUser(email, password) {
    await this.fillLoginEmail(email);
    await this.fillLoginPassword(password);
    await this.clickLoginButton();
    return this;
  }

  async getNewUserTitleText() {
    return await this.#newUserTitle.innerText();
  }

  async getErrorLoginMsgText() {
    return await this.#errorLoginMsg.innerText();
  }

  async verifyNewUserTitleText(title) {
    const actualTitle = await this.getNewUserTitleText();
    return expect(actualTitle).toEqual(title);
  }

  async verifyVisibleNewUserTitle() {
    return await this.#newUserTitle.isVisible();
  }

  async verifyNewUserTitle(title) {
    await this.verifyNewUserTitleText(title);
    await this.verifyVisibleNewUserTitle();
  }

  async getLoginTitleText() {
    return await this.#loginAccountTitle.innerText();
  }

  async verifyLoginTitleText(title) {
    const actualTitle = await this.getLoginTitleText();
    return expect(actualTitle).toEqual(title);
  }

  async verifyVisibleLoginTitle() {
    return await this.#loginAccountTitle.isVisible();
  }

  async verifyLoginTitle(title) {
    await this.verifyLoginTitleText(title);
    await this.verifyVisibleLoginTitle();
  }

  async verifyerrorLoginText(errorMsg) {
    const actualTitle = await this.getErrorLoginMsgText();
    return expect(actualTitle).toEqual(errorMsg);
  }

  async getErrorMailExistMsgText() {
    return await this.#errorMailExistMsg.innerText();
  }

  async verifyerrorMailExistMsgText(errorMsg) {
    const actualTitle = await this.getErrorMailExistMsgText()
    return expect(actualTitle).toEqual(errorMsg);
  }
}
