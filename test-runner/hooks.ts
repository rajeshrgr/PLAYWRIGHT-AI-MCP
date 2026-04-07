import { test } from '@playwright/test';

export const setupHooks = () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
  });

  test.afterEach(async ({ page }, testInfo) => {
    // Take screenshot on failure
    if (testInfo.status === 'failed') {
      await page.screenshot({ path: `test-results/${testInfo.title.replace(/[^a-zA-Z0-9]/g, '_')}-failed.png` });
    }
  });
};