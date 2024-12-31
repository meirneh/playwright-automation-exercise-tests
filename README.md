# Automation Project with Playwright for Automation Exercise

## Overview

This project automates various functionalities of the website [Automation Exercise](https://www.automationexercise.com/) using Playwright and JavaScript. The automation is built following the **Page Object Model (POM)** design pattern, which ensures reusability, maintainability, and scalability of the code.

## Project Structure

```
playwright-automation-exercise-tests/
├── node_modules/
├── pages/
│   ├── account-created-page.js
│   ├── cart-pages.js
│   ├── checkout-page.js
│   ├── contact-us-page.js
│   ├── delete-account-page.js
│   ├── home-page.js
│   ├── login-signup-page.js
│   ├── payment-page.js
│   ├── product-page.js
│   ├── products-page.js
│   ├── sign-up-page.js
├── tests/
│   ├── cart-and-order.spec.js
│   ├── login-register.spec.js
│   ├── product-cart-subscription.spec.js
├── playwright-report/
├── test-results/
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.js
```

## Test Specifications

### **`login-register.spec.js`**

**Describe:** Login, Register, Contact Us

- **Test 01:** Register User
- **Test 02:** Login User with correct email and password
- **Test 03:** Login User with incorrect email and password
- **Test 04:** Logout User
- **Test 05:** Register User with existing email
- **Test 06:** Contact Us Form

### **`cart-and-order.spec.js`**

**Describe:** Cart and Order Management

- **Test 01:** Add Products in Cart
- **Test 02:** Verify Product quantity in Cart
- **Test 05:** Place Order: Register while Checkout
- **Test 06:** Register before Checkout

### **`product-cart-subscription.spec.js`**

**Describe:** Product, Cart, and Subscription Functionality

- **Test 01:** Verify All Products and product detail page
- **Test 02:** Search Product
- **Test 03:** Verify Subscription in home page
- **Test 04:** Verify Subscription in Cart page

## Configuration

### **BeforeAll** and **AfterAll**

Each test spec includes a `beforeAll` block for initializing the browser, context, and page, and an `afterAll` block for cleanup.

#### Example `beforeAll` and `afterAll`:

```javascript
// beforeAll: Initializes browser and page
beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    await page.setViewportSize(maxSizeWindow);
    await page.goto("https://www.automationexercise.com/");
    homepage = new HomePage(page);
    productspage = new ProductsPage(page);
    productpage = new ProductPage(page);
    cartpage = new CartPage(page);
});

// afterAll: Closes context and browser
afterAll(async () => {
    await context.close();
    await browser.close();
});
```

## How to Run

### Prerequisites

- Node.js installed
- Playwright installed via npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/playwright-automation-exercise-tests.git
   ```
2. Navigate to the project directory:
   ```bash
   cd playwright-automation-exercise-tests
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Run Tests

Run all tests:

```bash
npx playwright test
```

Run a specific test spec:

```bash
npx playwright test tests/login-register.spec.js
```

Generate a report:

```bash
npx playwright show-report
```

## Key Features

- **POM Design Pattern**: Each page is represented as a class with locators and methods, ensuring code reusability and maintainability.
- **Scalable Test Cases**: Tests cover login, registration, cart management, order placement, and subscription functionality.
- **Playwright Framework**: Provides fast and reliable browser automation.

## Contact

For any inquiries, please reach out at [[meirnehemkin@gmail.com](mailto\:meirnehemkin@gmail.com)].





