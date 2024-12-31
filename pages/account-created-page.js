export default class AccountCreatedPage {
  #accountCreatedTitle;
  #continueButton;

  constructor(page) {
    this.page = page;
    this.#accountCreatedTitle = page.locator("#form h2 b");
    this.#continueButton = page.locator("[data-qa='continue-button']");
  }

  async clickContinueButton() {
    await this.#continueButton.click();
    return this;
  }

  async verifyAccountCreatedMsg() {
    return await this.#accountCreatedTitle.isVisible();
  }
}
