import { expect } from "@playwright/test";
export default class SignUpPage {
  #enterAccountTitle;
  #buttonMr;
  #buttonMrs;
  #nameRegisterField;
  #emailRegisterField;
  #passwordField;
  #daySelect;
  #monthSelect;
  #yearSelect;
  #newsLetterCheckBox;
  #specialOfferCheckBox;
  #firstNameField;
  #lastNameField;
  #companyField;
  #firstAddressField;
  #secondAddressField;
  #countrySelect;
  #stateField;
  #cityField;
  #zipcodeField;
  #mobileNumberField;
  #createAccountButton;

  constructor(page) {
    this.page = page;
    this.#enterAccountTitle = page.locator("#form  h2 > b");
    this.#buttonMr = page.locator("#id_gender1");
    this.#buttonMrs = page.locator("#id_gender2");
    this.#nameRegisterField = page.locator("#name");
    this.#emailRegisterField = page.locator("#email");
    this.#passwordField = page.locator("#password");
    this.#daySelect = page.locator("#days");
    this.#monthSelect = page.locator("#months");
    this.#yearSelect = page.locator("#years");
    this.#newsLetterCheckBox = page.locator("#newsletter");
    this.#specialOfferCheckBox = page.locator("#optin");
    this.#firstNameField = page.locator("#first_name");
    this.#lastNameField = page.locator("#last_name");
    this.#companyField = page.locator("#company");
    this.#firstAddressField = page.locator("#address1");
    this.#secondAddressField = page.locator("#address2");
    this.#countrySelect = page.locator("#country");
    this.#stateField = page.locator("#state");
    this.#cityField = page.locator("#city");
    this.#zipcodeField = page.locator("#zipcode");
    this.#mobileNumberField = page.locator("#mobile_number");
    this.#createAccountButton = page.locator("[data-qa='create-account']");
  }

  async clickGenderOption(option) {
    if ((option = "Mr")) {
      await this.#buttonMr.click();
    } else if ((option = "Mrs")) {
      await this.#buttonMrs.click();
    }
    return this;
  }

  async fillPassword(password) {
    await this.#passwordField.fill(password);
    return this;
  }

  async selectDay(dayNumber) {
    await this.#daySelect.selectOption({ value: dayNumber });
    return this;
  }

  async selectMonth(monthNumber) {
    await this.#monthSelect.selectOption({ value: monthNumber });
    return this;
  }

  async selectYear(yearNumber) {
    await this.#yearSelect.selectOption({ value: yearNumber });
    return this;
  }

  async fillBirthDate({ day, month, year }) {
    await this.selectDay(day);
    await this.selectMonth(month);
    await this.selectYear(year);
    return this;
  }

  async clickNewsLetter() {
    await this.#newsLetterCheckBox.click();
    return this;
  }

  async clickSpecialOfferts() {
    await this.#specialOfferCheckBox.click();
    return this;
  }

  async fillFirstNameField(firstName) {
    await this.#firstNameField.fill(firstName);
    return this;
  }

  async fillLastNameField(lastName) {
    await this.#lastNameField.fill(lastName);
    return this;
  }

  async fillPersonalInfo({
    name,
    email,
    option,
    password,
    birthDate,
    firstName,
    lastName,
  }) {
    await this.verifyRegisteredName(name);
    await this.verifyRegisteredEmail(email);
    await this.clickGenderOption(option);
    await this.fillPassword(password);
    await this.fillBirthDate(birthDate);
    await this.clickNewsLetter();
    await this.clickSpecialOfferts();
    await this.fillFirstNameField(firstName);
    await this.fillLastNameField(lastName);
    return this;
  }
  //----------------------------------------------------------------------------
  async fillCompanyName(companyName) {
    await this.#companyField.fill(companyName);
    return this;
  }

  async fillFirstAddress(firstAddress) {
    await this.#firstAddressField.fill(firstAddress);
    return this;
  }

  async fillSecondAddress(secondAddress) {
    await this.#secondAddressField.fill(secondAddress);
    return this;
  }

  async selectCountry(country) {
    await this.#countrySelect.selectOption({ value: country });
    return this;
  }

  async fillState(stateName) {
    await this.#stateField.fill(stateName);
    return this;
  }

  async fillCity(cityName) {
    await this.#cityField.fill(cityName);
    return this;
  }
  async fillUserLocation({
    companyName,
    firstAddress,
    secondAddress,
    country,
    stateName,
    cityName,
  }) {
    await this.fillCompanyName(companyName);
    await this.fillFirstAddress(firstAddress);
    await this.fillSecondAddress(secondAddress);
    await this.selectCountry(country);
    await this.fillState(stateName);
    await this.fillCity(cityName);
    return this;
  }
  //-----------------------------------------------------------------------------------------------
  async fillZipcode(zipcode) {
    await this.#zipcodeField.fill(zipcode);
    return this;
  }

  async fillMobileNumber(mobile) {
    await this.#mobileNumberField.fill(mobile);
    return this;
  }
  //-----------------------------------------------------------------------------------------------------
  async fillComUserInfo({ zipcode, mobile }) {
    await this.fillZipcode(zipcode);
    await this.fillMobileNumber(mobile);
    return this;
  }

  async clickCreateAccountButton() {
    await this.#createAccountButton.click();
    return this;
  }

  async registerNewAccount(user) {
    await this.fillPersonalInfo({
      name: user.name,
      email: user.email,
      option: user.option,
      password: user.password,
      birthDate: user.birthDate,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    await this.fillUserLocation({
      companyName: user.companyName,
      firstAddress: user.firstAddress,
      secondAddress: user.secondAddress,
      country: user.country,
      stateName: user.stateName,
      cityName: user.cityName,
    });
    await this.fillComUserInfo({ zipcode: user.zipcode, mobile: user.mobile });
    await this.clickCreateAccountButton();
    return this;
  }

  //-----------------------------------------------------------------------------------------------------
  async getUserAccountTitleText() {
    return await this.#enterAccountTitle.first().innerText();
  }

  async verifyUserAccountTitleText(title) {
    const actualTitle = await this.getUserAccountTitleText();
    return expect(actualTitle).toEqual(title);
  }

  async getinputRegisteredName() {
    return await this.#nameRegisterField.inputValue();
  }

  async verifyRegisteredName(name) {
    const actualName = await this.getinputRegisteredName();
    return expect(actualName).toEqual(name);
  }

  async getinputRegisteredEmail() {
    return this.#emailRegisterField.inputValue();
  }

  async verifyRegisteredEmail(email) {
    const actualEmail = await this.getinputRegisteredEmail();
    return expect(actualEmail).toEqual(email);
  }
}
