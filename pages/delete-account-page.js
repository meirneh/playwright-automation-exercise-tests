import { expect } from "@playwright/test";
import Basepage from "./basepage";
export default class DeletePage extends Basepage {
  #accountDeletedMessage;
  #continueButton;

  constructor(page) {
    super(page);
    this.page = page;
    this.#continueButton = page.locator("[data-qa='continue-button']");
    this.#accountDeletedMessage = page.locator("#form  h2 > b");
  }

  async clickContinueButton() {
    await this.click(this.#continueButton);
  }

  async getDeletedMessage() {
    return await this.getTextWithTextContent(this.#accountDeletedMessage);
  }

  async verifyDeletedMessage(expectedMessage) {
    const actualMessage = await this.getDeletedMessage();
    expect(expectedMessage).toContain(actualMessage);
    return this;
  }

  async verifyDeletionAndContinue(expectedMessage) {
    await this.verifyDeletedMessage(expectedMessage);
    await this.clickContinueButton();
    return this;
  }
}
