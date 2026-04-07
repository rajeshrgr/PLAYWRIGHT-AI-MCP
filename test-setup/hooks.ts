import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export const setupHooks = () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
  });

  test.afterEach(async ({ page }, testInfo) => {
    // Take screenshot on failure
    if (testInfo.status === 'failed') {
      const screenshotsDir = 'test-results/screenshots';
      
      // Ensure directory exists
      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
      }

      const sanitizedTitle = testInfo.title.replace(/[^a-zA-Z0-9]/g, '_');
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const screenshotPath = path.join(screenshotsDir, `${sanitizedTitle}_${timestamp}_failed.png`);
      
      await page.screenshot({ path: screenshotPath });
      console.log(`Failed test screenshot saved: ${screenshotPath}`);
    }
  });
};