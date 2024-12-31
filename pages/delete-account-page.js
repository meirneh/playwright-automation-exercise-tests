import { expect } from "@playwright/test";
export default class DeletePage {
  #accountDeletedMessage;
  #continueButton;

  constructor(page) {
    this.page = page;
    this.#continueButton = page.locator("[data-qa='continue-button']");
    this.#accountDeletedMessage = page.locator("#form  h2 > b");
  }

  async clickContinueButton() {
    await this.#continueButton.click();
    return this;
  }

  async getDeletedMessage () {
    return await this.#accountDeletedMessage.innerText();
  }

  async verifyDeletedMessage(expectedMessage) {
    const actualMessage = await this.getDeletedMessage()
    expect(expectedMessage).toContain(actualMessage);
    return this;
  }

  async verifyDeletionAndContinue(expectedMessage){
    await this.verifyDeletedMessage(expectedMessage);
    await this.clickContinueButton();
    return this;
  }
}
