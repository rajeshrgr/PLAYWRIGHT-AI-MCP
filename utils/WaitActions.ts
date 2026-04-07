import { Page, Locator, expect } from '@playwright/test';

export class WaitActions {
  constructor(private page: Page) {}

  private buildError(operation: string, locator: string, details: string = ''): Error {
    return new Error(`WaitActions: ${operation} failed for ${locator}${details ? ` (${details})` : ''}`);
  }

  async waitForElementVisible(locator: Locator, timeout: number = 5000): Promise<void> {
    try {
      await expect(locator).toBeVisible({ timeout });
    } catch (error) {
      throw this.buildError('waitForElementVisible', locator.toString(), `timeout=${timeout}`);
    }
  }

  async waitForElementHidden(locator: Locator, timeout: number = 5000): Promise<void> {
    try {
      await expect(locator).toBeHidden({ timeout });
    } catch (error) {
      throw this.buildError('waitForElementHidden', locator.toString(), `timeout=${timeout}`);
    }
  }

  async waitForElementEnabled(locator: Locator, timeout: number = 5000): Promise<void> {
    try {
      await expect(locator).toBeEnabled({ timeout });
    } catch (error) {
      throw this.buildError('waitForElementEnabled', locator.toString(), `timeout=${timeout}`);
    }
  }

  async waitForElementDisabled(locator: Locator, timeout: number = 5000): Promise<void> {
    try {
      await expect(locator).toBeDisabled({ timeout });
    } catch (error) {
      throw this.buildError('waitForElementDisabled', locator.toString(), `timeout=${timeout}`);
    }
  }

  async waitForURL(urlPattern: string | RegExp, timeout: number = 5000): Promise<void> {
    try {
      await this.page.waitForURL(urlPattern, { timeout });
    } catch (error) {
      throw this.buildError('waitForURL', urlPattern.toString(), `timeout=${timeout}`);
    }
  }

  async waitForFunction(fn: () => boolean | Promise<boolean>, timeout: number = 5000): Promise<void> {
    try {
      await this.page.waitForFunction(fn, { timeout });
    } catch (error) {
      throw this.buildError('waitForFunction', 'customFunction', `timeout=${timeout}`);
    }
  }

  async waitForElementCount(locator: Locator, count: number, timeout: number = 5000): Promise<void> {
    try {
      await expect(locator).toHaveCount(count, { timeout });
    } catch (error) {
      throw this.buildError('waitForElementCount', locator.toString(), `expectedCount=${count}`);
    }
  }

  async waitForPageLoadComplete(): Promise<void> {
    try {
      await this.page.waitForLoadState('networkidle');
    } catch (error) {
      throw this.buildError('waitForPageLoadComplete', 'page');
    }
  }

  async wait(ms: number): Promise<void> {
    if (ms < 0) {
      throw new Error('WaitActions: wait time must be non-negative');
    }
    await this.page.waitForTimeout(ms);
  }
}