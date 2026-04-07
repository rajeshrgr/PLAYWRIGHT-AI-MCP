import { Page, Locator } from '@playwright/test';
import * as fs from 'fs';

export class ScreenshotActions {
  constructor(private page: Page) {}

  private buildError(operation: string, details: string = ''): Error {
    return new Error(`ScreenshotActions: ${operation} failed${details ? ` (${details})` : ''}`);
  }

  async takeScreenshot(fileName: string, path: string = 'screenshots'): Promise<void> {
    if (!fileName) throw this.buildError('takeScreenshot', 'fileName is required');
    try {
      await this.page.screenshot({ path: `${path}/${fileName}.png` });
    } catch (error) {
      throw this.buildError('takeScreenshot', `${fileName}`);
    }
  }

  async takeElementScreenshot(locator: Locator, fileName: string, path: string = 'screenshots'): Promise<void> {
    if (!fileName) throw this.buildError('takeElementScreenshot', 'fileName is required');
    try {
      await locator.screenshot({ path: `${path}/${fileName}.png` });
    } catch (error) {
      throw this.buildError('takeElementScreenshot', `${fileName}`);
    }
  }

  async takeScreenshotOnFailure(testName: string): Promise<void> {
    if (!testName) throw this.buildError('takeScreenshotOnFailure', 'testName is required');
    try {
      const screenshotPath = `test-results/${testName.replace(/[^a-zA-Z0-9]/g, '_')}-failed.png`;
      await this.page.screenshot({ path: screenshotPath });
    } catch (error) {
      throw this.buildError('takeScreenshotOnFailure', `${testName}`);
    }
  }

  async takeFullPageScreenshot(fileName: string, path: string = 'screenshots'): Promise<void> {
    if (!fileName) throw this.buildError('takeFullPageScreenshot', 'fileName is required');
    try {
      await this.page.screenshot({ path: `${path}/${fileName}.png`, fullPage: true });
    } catch (error) {
      throw this.buildError('takeFullPageScreenshot', `${fileName}`);
    }
  }

  async getPageHTML(): Promise<string> {
    try {
      return await this.page.content();
    } catch (error) {
      throw this.buildError('getPageHTML');
    }
  }

  async savePageHTML(fileName: string, path: string = 'html-content'): Promise<void> {
    if (!fileName) throw this.buildError('savePageHTML', 'fileName is required');
    try {
      const content = await this.page.content();
      await fs.promises.mkdir(path, { recursive: true });
      await fs.promises.writeFile(`${path}/${fileName}.html`, content, 'utf-8');
    } catch (error) {
      throw this.buildError('savePageHTML', `${fileName}`);
    }
  }
}