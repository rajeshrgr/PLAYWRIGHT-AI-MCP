import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  // Locators
  readonly pageTitle = this.page.locator('[data-test="title"]');
  readonly productList = this.page.locator('[data-test="inventory-list"]');
  readonly productItems = this.page.locator('[data-test="inventory-item"]');
  readonly addToCartButtons = this.page.locator('button:has-text("Add to cart")');
  readonly cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
  readonly cartLink = this.page.locator('[data-test="shopping-cart-link"]');

  constructor(page: Page) {
    super(page);
  }

  async verifyInventoryPageIsDisplayed() {
    await this.utils.verificationActions.verifyElementContainsText(this.pageTitle, 'Products');
    await this.utils.verificationActions.verifyCurrentURL(/.*inventory/);
  }

  async verifyProductsAreDisplayed() {
    await this.utils.verificationActions.verifyElementVisible(this.productList);
    const count = await this.utils.verificationActions.getElementCount(this.productItems);
    expect(count).toBeGreaterThan(0);
  }

  async getProductCount() {
    return await this.utils.verificationActions.getElementCount(this.productItems);
  }

  async addProductToCart(index: number) {
    const buttons = await this.addToCartButtons.all();
    if (index < buttons.length) {
      await this.utils.clickActions.click(this.addToCartButtons.nth(index));
    }
  }

  async getCartBadgeCount() {
    const badge = await this.utils.verificationActions.getElementText(this.cartBadge);
    return parseInt(badge || '0');
  }

  async goToCart() {
    await this.utils.clickActions.click(this.cartLink);
  }

  async clickCartIcon() {
    // Alias for goToCart() for convenience
    await this.goToCart();
  }
}