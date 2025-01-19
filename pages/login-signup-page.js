import { expect } from "@playwright/test";
import Basepage from "./basepage";
export default class LoginSignUpPage extends Basepage {
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
    super(page);
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
    await this.fill(this.#signupNameField, name);
  }

  async fillSignUpEmail(email) {
    await this.fill(this.#signupEmailField, email);
  }

  async clickSignUpButton() {
    await this.click(this.#signUpButton);
  }

  async fillLoginEmail(email) {
    await this.fill(this.#loginEmailField, email);
  }

  async fillLoginPassword(password) {
    await this.fill(this.#loginPasswordField, password);
  }

  async clickLoginButton() {
    await this.click(this.#loginButton);
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
    return await this.getTextWithTextContent(this.#newUserTitle);
  }

  async getErrorLoginMsgText() {
    return await this.getTextWithTextContent(this.#errorLoginMsg);
  }

  async verifyNewUserTitleText(title) {
    const actualTitle = await this.getNewUserTitleText();
    return expect(actualTitle).toEqual(title);
  }

  async verifyVisibleNewUserTitle() {
    return await this.isVisible(this.#newUserTitle);
  }

  async verifyNewUserTitle(title) {
    await this.verifyNewUserTitleText(title);
    await this.verifyVisibleNewUserTitle();
  }

  async getLoginTitleText() {
    return await this.getTextWithTextContent(this.#loginAccountTitle);
  }

  async verifyLoginTitleText(title) {
    const actualTitle = await this.getLoginTitleText();
    return expect(actualTitle).toEqual(title);
  }

  async verifyVisibleLoginTitle() {
    await this.isVisible(this.#loginAccountTitle);
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
    return await this.getTextWithTextContent(this.#errorMailExistMsg);
  }

  async verifyerrorMailExistMsgText(errorMsg) {
    const actualTitle = await this.getErrorMailExistMsgText();
    return expect(actualTitle).toEqual(errorMsg);
  }
}
