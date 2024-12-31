import { expect } from "@playwright/test";
export default class ContactUsPage {
  #getInTouchTitle;
  #nameField;
  #subjectField;
  #emailField;
  #messageTextArea;
  #submitButon;
  #succesMsg;

  constructor(page) {
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
    await this.#nameField.fill(name);
    return this;
  }

  async fillEmail(email) {
    await this.#emailField.fill(email);
    return this;
  }

  async fillSubject(subject) {
    await this.#subjectField.fill(subject);
    return this;
  }

  async fillMessage(text) {
    await this.#messageTextArea.fill(text)
    return this;
}

async clickSubmitButon() {
    await this.#submitButon.click();
    return this;
}

async getInTouch(name, email, subject, text) {
    await this.fillName(name);
    await this.fillEmail(email);
    await this.fillSubject(subject);
    await this.fillMessage(text);
    await this.clickSubmitButon({force:true});
    return this
}

  async getTextTitle() {
    return await this.#getInTouchTitle.innerText();
  }

  async verifyGetInTouchTitle(title) {
    const actualTitle = await this.getTextTitle();
    return expect(actualTitle).toEqual(title);
  }

  async getSuccessMsg() {
    return await this.#succesMsg.innerText();
  }
}
