import { Page, Locator } from '@playwright/test';

export class InteractionActions {
  constructor(private page: Page) {}

  private buildError(operation: string, details: string = ''): Error {
    return new Error(`InteractionActions: ${operation} failed${details ? ` (${details})` : ''}`);
  }

  async hover(locator: Locator): Promise<void> {
    try {
      await locator.hover();
    } catch (error) {
      throw this.buildError('hover', locator.toString());
    }
  }

  async focus(locator: Locator): Promise<void> {
    try {
      await locator.focus();
    } catch (error) {
      throw this.buildError('focus', locator.toString());
    }
  }

  async blur(locator: Locator): Promise<void> {
    try {
      await locator.evaluate((el: HTMLElement) => el.blur());
    } catch (error) {
      throw this.buildError('blur', locator.toString());
    }
  }

  async dragAndDrop(sourceLocator: Locator, targetLocator: Locator): Promise<void> {
    try {
      await sourceLocator.dragTo(targetLocator);
    } catch (error) {
      throw this.buildError('dragAndDrop', `${sourceLocator.toString()} -> ${targetLocator.toString()}`);
    }
  }

  async pressKey(key: string): Promise<void> {
    if (!key) throw this.buildError('pressKey', 'key is required');
    try {
      await this.page.keyboard.press(key);
    } catch (error) {
      throw this.buildError('pressKey', key);
    }
  }

  async pressKeys(keys: string[]): Promise<void> {
    if (!keys || keys.length === 0) throw this.buildError('pressKeys', 'keys array is empty');
    try {
      for (const key of keys) {
        await this.page.keyboard.press(key);
      }
    } catch (error) {
      throw this.buildError('pressKeys', `keys=${JSON.stringify(keys)}`);
    }
  }

  async checkCheckbox(locator: Locator): Promise<void> {
    try {
      await locator.check();
    } catch (error) {
      throw this.buildError('checkCheckbox', locator.toString());
    }
  }

  async uncheckCheckbox(locator: Locator): Promise<void> {
    try {
      await locator.uncheck();
    } catch (error) {
      throw this.buildError('uncheckCheckbox', locator.toString());
    }
  }

  async scrollIntoView(locator: Locator): Promise<void> {
    try {
      await locator.scrollIntoViewIfNeeded();
    } catch (error) {
      throw this.buildError('scrollIntoView', locator.toString());
    }
  }

  async scrollPageBy(x: number, y: number): Promise<void> {
    try {
      await this.page.evaluate(({ x, y }) => window.scrollBy(x, y), { x, y });
    } catch (error) {
      throw this.buildError('scrollPageBy', `x=${x}, y=${y}`);
    }
  }

  async scrollToTop(): Promise<void> {
    try {
      await this.page.evaluate(() => window.scrollTo(0, 0));
    } catch (error) {
      throw this.buildError('scrollToTop');
    }
  }

  async scrollToBottom(): Promise<void> {
    try {
      await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    } catch (error) {
      throw this.buildError('scrollToBottom');
    }
  }

  async getElementPosition(locator: Locator): Promise<{ x: number; y: number }> {
    try {
      const box = await locator.boundingBox();
      if (!box) throw new Error('element has no bounding box');
      return { x: box.x, y: box.y };
    } catch (error) {
      throw this.buildError('getElementPosition', locator.toString());
    }
  }

  async isElementInViewport(locator: Locator): Promise<boolean> {
    try {
      return await locator.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth;
      });
    } catch (error) {
      throw this.buildError('isElementInViewport', locator.toString());
    }
  }
}