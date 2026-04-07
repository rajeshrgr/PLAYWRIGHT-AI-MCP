import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly firstNameInput = this.page.locator('[data-test="firstName"]');
  readonly lastNameInput = this.page.locator('[data-test="lastName"]');
  readonly postalCodeInput = this.page.locator('[data-test="postalCode"]');
  readonly continueButton = this.page.locator('[data-test="continue"]');
  readonly cancelButton = this.page.locator('[data-test="cancel"]');
  readonly finishButton = this.page.locator('[data-test="finish"]');
  readonly paymentInfo = this.page.locator('[data-test="payment-info-value"]');
  readonly orderSummary = this.page.locator('.summary_info');
  readonly cartList = this.page.locator('[data-test="cart-list"]');
  readonly itemTotal = this.page.locator('.summary_subtotal_label');
  readonly taxLabel = this.page.locator('.summary_tax_label');
  readonly totalLabel = this.page.locator('.summary_total_label');
  readonly confirmationHeader = this.page.locator('[data-test="complete-header"]');

  constructor(page: Page) {
    super(page);
  }

  async verifyCheckoutStepOne() {
    await expect(this.page).toHaveURL(/.*checkout-step-one*/);
    await expect(this.firstNameInput).toBeVisible();
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clickContinue() {
    await this.utils.clickActions.click(this.continueButton);
  }

  async verifyCheckoutOverview() {
    await expect(this.page).toHaveURL(/.*checkout-step/);
    await expect(this.paymentInfo).toBeVisible();
    await expect(this.orderSummary).toBeVisible();
    await expect(this.cartList).toBeVisible();
    await expect(this.itemTotal).toBeVisible();
    await expect(this.taxLabel).toBeVisible();
    await expect(this.totalLabel).toBeVisible();
  }

  async verifyOverviewDetails() {
    await this.verifyCheckoutOverview();
    await expect(this.cartList).toContainText('Sauce Labs Backpack');
    await expect(this.paymentInfo).toContainText('SauceCard #31337');
    await expect(this.totalLabel).toContainText('Total:');
  }

  async clickFinish() {
    await this.utils.clickActions.click(this.finishButton);
  }

  async verifyOrderConfirmation() {
    await expect(this.page).toHaveURL(/.*checkout-complete/);
    await expect(this.confirmationHeader).toContainText('Thank you');
  }
}
