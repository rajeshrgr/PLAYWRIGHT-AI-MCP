import { test, expect } from '@playwright/test';
import { setupHooks } from '../test-runner/hooks';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

setupHooks();

test('verify inventory page after login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  // Login with valid credentials
  await loginPage.login('standard_user', 'secret_sauce');

  // Verify inventory page is displayed
  await inventoryPage.verifyInventoryPageIsDisplayed();
});

test('verify products are displayed on inventory page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  // Login with valid credentials
  await loginPage.login('standard_user', 'secret_sauce');

  // Verify products are displayed
  await inventoryPage.verifyProductsAreDisplayed();

  // Get product count
  const productCount = await inventoryPage.getProductCount();
  expect(productCount).toBeGreaterThan(0);
});

test('add product to cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  // Login with valid credentials
  await loginPage.login('standard_user', 'secret_sauce');

  // Add first product to cart
  await inventoryPage.addProductToCart(0);

  // Verify cart badge shows count
  const cartCount = await inventoryPage.getCartBadgeCount();
  expect(cartCount).toBe(1);
});