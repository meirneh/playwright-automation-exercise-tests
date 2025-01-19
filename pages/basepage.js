export default class Basepage {
  constructor(page) {
    this.page = page;
  }

  // === Navigation ===
  async navigate(url) {
    await this.page.goto(url);
  }

  // === Actions ===
  async click(selectorOrLocator) {
    if (typeof selectorOrLocator === "string") {
      await this.page.click(selectorOrLocator);
    } else {
      await selectorOrLocator.click();
    }
  }

  async fill(selectorOrLocator, text) {
    if (typeof selectorOrLocator === "string") {
      await this.page.fill(selectorOrLocator, text);
    } else {
      await selectorOrLocator.fill(text);
    }
  }

  async check(selectorOrLocator) {
    if (typeof selectorOrLocator === "string") {
      await this.page.check(selectorOrLocator);
    } else {
      await selectorOrLocator.check();
    }
  }

  async uncheck(selectorOrLocator) {
    if (typeof selectorOrLocator === "string") {
      await this.page.uncheck(selectorOrLocator);
    } else {
      await selectorOrLocator.uncheck();
    }
  }

  async selectOption(selectorOrLocator, value) {
    if (typeof selectorOrLocator === "string") {
      await this.page.selectOption(selectorOrLocator, value);
    } else {
      await selectorOrLocator.selectOption(value);
    }
  }

  async hover(selectorOrLocator) {
    if (typeof selectorOrLocator === "string") {
      await this.page.hover(selectorOrLocator);
    } else {
      await selectorOrLocator.hover();
    }
  }

  async scrollToElement(selectorOrLocator) {
    if (typeof selectorOrLocator === "string") {
      await this.page.locator(selectorOrLocator).scrollIntoViewIfNeeded();
    } else {
      await selectorOrLocator.scrollIntoViewIfNeeded();
    }
  }

  async doubleClick(selectorOrLocator) {
    if (typeof selectorOrLocator === "string") {
      await this.page.dblclick(selectorOrLocator);
    } else {
      await selectorOrLocator.dblclick();
    }
  }

  async dragAndDrop(sourceSelectorOrLocator, targetSelectorOrLocator) {
    const source =
      typeof sourceSelectorOrLocator === "string"
        ? this.page.locator(sourceSelectorOrLocator)
        : sourceSelectorOrLocator;
    const target =
      typeof targetSelectorOrLocator === "string"
        ? this.page.locator(targetSelectorOrLocator)
        : targetSelectorOrLocator;
    await source.dragTo(target);
  }

  // === Verifications ===
  async isVisible(selectorOrLocator) {
    if (typeof selectorOrLocator === "string") {
      return await this.page.isVisible(selectorOrLocator);
    } else {
      return await selectorOrLocator.isVisible();
    }
  }

  async isHidden(selectorOrLocator) {
    return !(await this.isVisible(selectorOrLocator));
  }

  async isChecked(selectorOrLocator) {
    if (typeof selectorOrLocator === "string") {
      return await this.page.isChecked(selectorOrLocator);
    } else {
      return await selectorOrLocator.isChecked();
    }
  }

  async isUnchecked(selectorOrLocator) {
    return !(await this.isChecked(selectorOrLocator));
  }

  async waitForVisibility(selectorOrLocator, timeout = 5000) {
    if (typeof selectorOrLocator === "string") {
      await this.page
        .locator(selectorOrLocator)
        .waitFor({ state: "visible", timeout });
    } else {
      await selectorOrLocator.waitFor({ state: "visible", timeout });
    }
  }

  async getTextWithInnerText(selectorOrLocator) {
        if (typeof selectorOrLocator === "string") {
            return await this.page.locator(selectorOrLocator).innerText();
        } else {
            return await selectorOrLocator.innerText();
        }
    }

  async getTextWithTextContent(selectorOrLocator) {
    if (typeof selectorOrLocator === "string") {
      return await this.page.locator(selectorOrLocator).textContent();
    } else {
      return await selectorOrLocator.textContent();
    }
  }

  async getAttribute(selectorOrLocator, attribute) {
    if (typeof selectorOrLocator === "string") {
      return await this.page.locator(selectorOrLocator).getAttribute(attribute);
    } else {
      return await selectorOrLocator.getAttribute(attribute);
    }
  }

  // === Utility ===
  async countElements(selectorOrLocator) {
    if (typeof selectorOrLocator === "string") {
      return await this.page.locator(selectorOrLocator).count();
    } else {
      return await selectorOrLocator.count();
    }
  }

  async takeScreenshot(selectorOrLocator, path) {
    if (typeof selectorOrLocator === "string") {
      await this.page.locator(selectorOrLocator).screenshot({ path });
    } else {
      await selectorOrLocator.screenshot({ path });
    }
  }
}
