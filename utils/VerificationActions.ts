import { Page, Locator, expect } from '@playwright/test';

export class VerificationActions {
  constructor(private page: Page) {}

  private buildError(operation: string, locator: string, details: string = ''): Error {
    return new Error(`VerificationActions: ${operation} failed for ${locator}${details ? ` (${details})` : ''}`);
  }

  async verifyElementVisible(locator: Locator): Promise<void> {
    try {
      await expect(locator).toBeVisible();
    } catch (error) {
      throw this.buildError('verifyElementVisible', locator.toString());
    }
  }

  async verifyElementHidden(locator: Locator): Promise<void> {
    try {
      await expect(locator).toBeHidden();
    } catch (error) {
      throw this.buildError('verifyElementHidden', locator.toString());
    }
  }

  async verifyElementContainsText(locator: Locator, text: string): Promise<void> {
    try {
      await expect(locator).toContainText(text);
    } catch (error) {
      throw this.buildError('verifyElementContainsText', locator.toString(), `text='${text}'`);
    }
  }

  async verifyElementHasText(locator: Locator, text: string): Promise<void> {
    try {
      await expect(locator).toHaveText(text);
    } catch (error) {
      throw this.buildError('verifyElementHasText', locator.toString(), `text='${text}'`);
    }
  }

  async verifyElementHasAttribute(locator: Locator, attribute: string, value: string): Promise<void> {
    try {
      await expect(locator).toHaveAttribute(attribute, value);
    } catch (error) {
      throw this.buildError('verifyElementHasAttribute', locator.toString(), `${attribute}='${value}'`);
    }
  }

  async verifyElementEnabled(locator: Locator): Promise<void> {
    try {
      await expect(locator).toBeEnabled();
    } catch (error) {
      throw this.buildError('verifyElementEnabled', locator.toString());
    }
  }

  async verifyElementDisabled(locator: Locator): Promise<void> {
    try {
      await expect(locator).toBeDisabled();
    } catch (error) {
      throw this.buildError('verifyElementDisabled', locator.toString());
    }
  }

  async verifyElementChecked(locator: Locator): Promise<void> {
    try {
      await expect(locator).toBeChecked();
    } catch (error) {
      throw this.buildError('verifyElementChecked', locator.toString());
    }
  }

  async verifyPageTitle(titlePattern: string | RegExp): Promise<void> {
    try {
      await expect(this.page).toHaveTitle(titlePattern);
    } catch (error) {
      throw this.buildError('verifyPageTitle', 'page', `pattern='${titlePattern}'`);
    }
  }

  async verifyCurrentURL(urlPattern: string | RegExp): Promise<void> {
    try {
      await expect(this.page).toHaveURL(urlPattern);
    } catch (error) {
      throw this.buildError('verifyCurrentURL', 'page', `pattern='${urlPattern}'`);
    }
  }

  async getElementText(locator: Locator): Promise<string> {
    try {
      const text = await locator.textContent();
      return text ?? '';
    } catch (error) {
      throw this.buildError('getElementText', locator.toString());
    }
  }

  async isElementPresent(locator: Locator): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'attached', timeout: 1000 });
      return true;
    } catch {
      return false;
    }
  }

  async getElementCount(locator: Locator): Promise<number> {
    try {
      return await locator.count();
    } catch (error) {
      throw this.buildError('getElementCount', locator.toString());
    }
  }
}