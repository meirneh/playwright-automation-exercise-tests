import Basepage from "./basepage";

export default class AccountCreatedPage extends Basepage {
  #accountCreatedTitle;
  #continueButton;

  constructor(page) {
    super(page);
    this.page = page;
    this.#accountCreatedTitle = page.locator("#form h2 b");
    this.#continueButton = page.locator("[data-qa='continue-button']");
  }

  async clickContinueButton() {
    return await this.click(this.#continueButton);
  }

  async verifyAccountCreatedMsg() {
    await this.isVisible(this.#accountCreatedTitle);
  }
}
