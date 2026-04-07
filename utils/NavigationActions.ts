import { Page } from '@playwright/test';

export class NavigationActions {
  constructor(private page: Page) {}

  private buildError(operation: string, details: string = ''): Error {
    return new Error(`NavigationActions: ${operation} failed${details ? ` (${details})` : ''}`);
  }

  async navigateTo(url: string): Promise<void> {
    if (!url) throw this.buildError('navigateTo', 'url is empty');
    try {
      await this.page.goto(url);
    } catch (error) {
      throw this.buildError('navigateTo', url);
    }
  }

  async navigateToPath(path: string): Promise<void> {
    if (!path) throw this.buildError('navigateToPath', 'path is empty');
    try {
      await this.page.goto(path);
    } catch (error) {
      throw this.buildError('navigateToPath', path);
    }
  }

  async goBack(): Promise<void> {
    try {
      await this.page.goBack();
    } catch (error) {
      throw this.buildError('goBack');
    }
  }

  async goForward(): Promise<void> {
    try {
      await this.page.goForward();
    } catch (error) {
      throw this.buildError('goForward');
    }
  }

  async reload(): Promise<void> {
    try {
      await this.page.reload();
    } catch (error) {
      throw this.buildError('reload');
    }
  }

  async getCurrentURL(): Promise<string> {
    try {
      return this.page.url();
    } catch (error) {
      throw this.buildError('getCurrentURL');
    }
  }

  async getPageTitle(): Promise<string> {
    try {
      return this.page.title();
    } catch (error) {
      throw this.buildError('getPageTitle');
    }
  }

  async navigateAndWait(url: string, waitUntil: 'load' | 'domcontentloaded' | 'networkidle' = 'load'): Promise<void> {
    if (!url) throw this.buildError('navigateAndWait', 'url is empty');
    try {
      await this.page.goto(url, { waitUntil });
    } catch (error) {
      throw this.buildError('navigateAndWait', `${url} waitUntil=${waitUntil}`);
    }
  }

  async closePage(): Promise<void> {
    try {
      await this.page.close();
    } catch (error) {
      throw this.buildError('closePage');
    }
  }
}