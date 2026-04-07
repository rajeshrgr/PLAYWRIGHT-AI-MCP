import { Page, Locator } from '@playwright/test';

export class FillActions {
  constructor(private page: Page) {}

  private buildError(operation: string, locator: string, details: string = ''): Error {
    return new Error(`FillActions: ${operation} failed for ${locator}${details ? ` (${details})` : ''}`);
  }

  async fill(locator: Locator, text: string): Promise<void> {
    try {
      await locator.fill(text);
    } catch (error) {
      throw this.buildError('fill', locator.toString(), `text='${text}'`);
    }
  }

  async clearAndFill(locator: Locator, text: string): Promise<void> {
    try {
      await locator.fill('');
      await locator.fill(text);
    } catch (error) {
      throw this.buildError('clearAndFill', locator.toString(), `text='${text}'`);
    }
  }

  async typeText(locator: Locator, text: string, delay: number = 50): Promise<void> {
    try {
      await locator.click();
      await locator.fill('');
      await locator.type(text, { delay });
    } catch (error) {
      throw this.buildError('typeText', locator.toString(), `text='${text}', delay=${delay}`);
    }
  }

  async fillMultiple(fields: Array<{ locator: Locator; text: string }>): Promise<void> {
    try {
      for (const field of fields) {
        await field.locator.fill(field.text);
      }
    } catch (error) {
      throw this.buildError('fillMultiple', 'multiple-locators');
    }
  }

  async selectOption(locator: Locator, value: string): Promise<void> {
    try {
      await locator.selectOption(value);
    } catch (error) {
      throw this.buildError('selectOption', locator.toString(), `value='${value}'`);
    }
  }

  async selectMultipleOptions(locator: Locator, values: string[]): Promise<void> {
    try {
      await locator.selectOption(values);
    } catch (error) {
      throw this.buildError('selectMultipleOptions', locator.toString(), `values=${JSON.stringify(values)}`);
    }
  }

  async getInputValue(locator: Locator): Promise<string> {
    try {
      return await locator.inputValue();
    } catch (error) {
      throw this.buildError('getInputValue', locator.toString());
    }
  }

  async clearInput(locator: Locator): Promise<void> {
    try {
      await locator.fill('');
    } catch (error) {
      throw this.buildError('clearInput', locator.toString());
    }
  }
}