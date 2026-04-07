import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  // Locators
  readonly cartItems = this.page.locator('[data-test="cart-list-container"]');
  readonly cartItemRows = this.page.locator('div.cart_item');
  readonly checkoutButton = this.page.locator('[data-test="checkout"]');
  readonly continueShoppingButton = this.page.locator('[data-test="continue-shopping"]');
  readonly cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
  readonly totalPrice = this.page.locator('[data-test="subtotal-label"]');

  constructor(page: Page) {
    super(page);
  }

  async verifyCartPageIsDisplayed() {
    await this.utils.verificationActions.verifyCurrentURL(/.*cart/);
  }

  async getCartItemCount() {
    return await this.utils.verificationActions.getElementCount(this.cartItemRows);
  }

  async verifyItemIsInCart(itemName: string) {
    const item = this.page.locator(`text=${itemName}`);
    await this.utils.verificationActions.verifyElementVisible(item);
  }

  async clickCheckout() {
    await this.utils.clickActions.click(this.checkoutButton);
  }

  async clickContinueShopping() {
    await this.utils.clickActions.click(this.continueShoppingButton);
  }

  async getTotalPrice() {
    const priceText = await this.utils.verificationActions.getElementText(this.totalPrice);
    return priceText ? parseFloat(priceText.replace(/[^0-9.]/g, '')) : 0;
  }
}