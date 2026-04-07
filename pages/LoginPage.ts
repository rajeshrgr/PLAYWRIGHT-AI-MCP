import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Locators
  readonly usernameInput = this.page.locator('input[data-test="username"]');
  readonly passwordInput = this.page.locator('input[data-test="password"]');
  readonly loginButton = this.page.locator('input[data-test="login-button"]');
  readonly pageTitle = this.page.locator('div[class*="login_logo"]');

  constructor(page: Page) {
    super(page);
  }

  async navigateToLogin() {
    await this.goto('/');
  }

  async verifyLoginPageIsDisplayed() {
    await this.utils.verificationActions.verifyPageTitle(/Swag Labs/);
  }

  async enterUsername(username: string) {
    await this.utils.fillActions.fill(this.usernameInput, username);
  }

  async enterPassword(password: string) {
    await this.utils.fillActions.fill(this.passwordInput, password);
  }

  async clickLoginButton() {
    await this.utils.clickActions.click(this.loginButton);
  }

  async login(username: string, password: string) {
    await this.navigateToLogin();
    await this.verifyLoginPageIsDisplayed();
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
    await this.handlePasswordPopup();
  }
}