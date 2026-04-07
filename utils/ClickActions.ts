import { Page, Locator } from '@playwright/test';

export class ClickActions {
  constructor(private page: Page) {}

  private buildError(operation: string, locatorOrIndex: string): Error {
    return new Error(`ClickActions: ${operation} failed for ${locatorOrIndex}`);
  }

  async click(locator: Locator): Promise<void> {
    try {
      await locator.click();
    } catch (error) {
      throw this.buildError('click', locator.toString());
    }
  }

  async clickAndWaitForNavigation(locator: Locator): Promise<void> {
    try {
      await Promise.all([this.page.waitForNavigation(), locator.click()]);
    } catch (error) {
      throw this.buildError('clickAndWaitForNavigation', locator.toString());
    }
  }

  async doubleClick(locator: Locator): Promise<void> {
    try {
      await locator.dblclick();
    } catch (error) {
      throw this.buildError('doubleClick', locator.toString());
    }
  }

  async rightClick(locator: Locator): Promise<void> {
    try {
      await locator.click({ button: 'right' });
    } catch (error) {
      throw this.buildError('rightClick', locator.toString());
    }
  }

  async clickWithDelay(locator: Locator, delay: number): Promise<void> {
    try {
      await locator.click({ delay });
    } catch (error) {
      throw this.buildError(`clickWithDelay(${delay}ms)`, locator.toString());
    }
  }

  async forceClick(locator: Locator): Promise<void> {
    try {
      await locator.click({ force: true });
    } catch (error) {
      throw this.buildError('forceClick', locator.toString());
    }
  }

  async clickNthElement(locator: Locator, index: number): Promise<void> {
    try {
      const elements = await locator.all();
      if (index < 0 || index >= elements.length) {
        throw new Error(`ClickActions: clickNthElement index ${index} out of bounds (${elements.length})`);
      }
      await elements[index].click();
    } catch (error) {
      if (error instanceof Error && error.message.includes('out of bounds')) {
        throw error;
      }
      throw this.buildError(`clickNthElement(${index})`, locator.toString());
    }
  }
}