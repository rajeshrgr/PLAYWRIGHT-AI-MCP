import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

interface EnvironmentConfig {
  baseURL: string;
  environment: string;
  isLocal: boolean;
}

const environments: Record<string, EnvironmentConfig> = {
  qa: {
    baseURL: 'https://www.saucedemo.com/',
    environment: 'QA',
    isLocal: false,
  },
  stage: {
    baseURL: 'https://stage.saucedemo.com/',
    environment: 'Stage',
    isLocal: false,
  },
  prod: {
    baseURL: 'https://saucedemo.com/',
    environment: 'Production',
    isLocal: false,
  },
  local: {
    baseURL: 'https://saucedemo.com/',
    environment: 'Local',
    isLocal: true,
  },
};

const getCurrentEnvironment = (): EnvironmentConfig => {
  const env = process.env.ENVIRONMENT?.toLowerCase() || 'qa'; // Default to QA (cloud)
  return environments[env] || environments.qa;
};

const currentEnv = getCurrentEnvironment();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: currentEnv.baseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Record video during each test run. */
    video: 'on',

    /* Optionally, store 1x speed in local artifacts with file path pattern. */
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
