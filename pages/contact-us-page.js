import { expect } from "@playwright/test";
import Basepage from "./basepage";
export default class ContactUsPage extends Basepage {
  #getInTouchTitle;
  #nameField;
  #subjectField;
  #emailField;
  #messageTextArea;
  #submitButon;
  #succesMsg;

  constructor(page) {
    super(page);
    this.page = page;
    this.#getInTouchTitle = page.locator(".row .col-sm-8 h2");
    this.#nameField = page.locator("[data-qa='name']");
    this.#subjectField = page.locator("[data-qa='subject']");
    this.#emailField = page.locator("[data-qa='email']");
    this.#messageTextArea = page.locator("#message");
    this.#submitButon = page.locator("[data-qa='submit-button']");
    this.#succesMsg = page.locator(".status.alert.alert-success");
  }

  async fillName(name) {
    await this.fill(this.#nameField, name);
  }

  async fillEmail(email) {
    await this.fill(this.#emailField, email);
  }

  async fillSubject(subject) {
    await this.fill(this.#subjectField, subject);
  }

  async fillMessage(text) {
    await this.fill(this.#messageTextArea, text);
  }

  async clickSubmitButon() {
    await this.click(this.#submitButon);
    return this;
  }

  async getInTouch(name, email, subject, text) {
    await this.fillName(name);
    await this.fillEmail(email);
    await this.fillSubject(subject);
    await this.fillMessage(text);
    await this.clickSubmitButon({ force: true });
    return this;
  }

  async getTextTitle() {
    return await this.getTextWithInnerText(this.#getInTouchTitle);
  }

  async verifyGetInTouchTitle(title) {
    const actualTitle = await this.getTextTitle();
    return expect(actualTitle).toEqual(title);
  }

  async getSuccessMsg() {
    return await this.getTextWithInnerText(this.#succesMsg);
  }
}
