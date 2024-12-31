import {expect} from "@playwright/test";
export default class PaymentPage {
    #cardNameField;
    #cardNumberField;
    #cardCVCField;
    #cardMonthExpiryField;
    #cardYearExpiryField;
    #payConfirmOrderButton;
    #titleOrderPlaced;
    #confirmationMessage;
    #continueButton;

    constructor(page) {
       this.page = page;
       this.#cardNameField = page.locator("[data-qa='name-on-card']");
       this.#cardNumberField = page.locator("[data-qa='card-number']");
       this.#cardCVCField = page.locator("[data-qa='cvc']");
       this.#cardMonthExpiryField = page.locator("[data-qa='expiry-month']");
       this.#cardYearExpiryField = page.locator("[data-qa='expiry-year']");
       this.#payConfirmOrderButton = page.locator("[data-qa='pay-button']");
       this.#titleOrderPlaced = page.locator("#form h2 > b");
       this.#confirmationMessage = page.locator("#form p");
       this.#continueButton = page.locator("[data-qa='continue-button']");   
    }
  
    async getTitleOrderPlaced() {
        return this.#titleOrderPlaced.innerText();
    }

    async verifyTitleOrderPlaced() {
        const actualTitle = await this.getTitleOrderPlaced()
        const expectedTitle = "ORDER PLACED!";
        return expect(actualTitle).toEqual(expectedTitle)
    }

    async getConfirnationMessage() {
        return this.#confirmationMessage.innerText();
    }

    async verifyConfirnationMessage() {
        const actualConfMsg = await this.getConfirnationMessage();
        const expectedConfMsg = "Congratulations! Your order has been confirmed!";
        return expect(actualConfMsg).toEqual(expectedConfMsg);
    }

    async verifyConfirmationPayment() {
       await this.verifyTitleOrderPlaced();
       await this.verifyConfirnationMessage();
       return this;
    }

    async fillNameCardField(name) {
        await this.#cardNameField.fill(name);
        return this;
    }

    async fillNumberCardField(cardNumber) {
        await this.#cardNumberField.fill(cardNumber);
        return this;
    }

    async fillCVCCardField(cvcNumber) {
        await this.#cardCVCField.fill(cvcNumber);
        return this;
    }

    async fillMonthExpiryCardField(month) {
        await this.#cardMonthExpiryField.fill(month);
        return this;
    }

    async fillYearExpiryCardField(year) {
        await this.#cardYearExpiryField.fill(year);
        return this;
    }

    async fillExpiryCardDate({month, year}) {
        await this.fillMonthExpiryCardField(month);
        await this.fillYearExpiryCardField(year);
        return this;
    }

    async fillAndSubmitPaymentDetails({name, cardNumber, cvcNumber, expiryDate}) {
        await this.fillNameCardField(name);
        await this.fillNumberCardField(cardNumber);
        await this.fillCVCCardField(cvcNumber);
        await this.fillExpiryCardDate(expiryDate);
        await this.clickPayConfirmOrderButton()
        return this
    }

    async clickPayConfirmOrderButton() {
        await this.#payConfirmOrderButton.click();
        return this;
    }

    async clickContinueButton() {
        await this.#continueButton.click();
        return this;
    }

}