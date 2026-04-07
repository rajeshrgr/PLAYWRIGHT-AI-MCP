import { test, expect } from '@playwright/test';
import { setupHooks } from '../test-runner/hooks';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

setupHooks();

test('navigate to cart after adding items', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  // Login with valid credentials
  await loginPage.login('standard_user', 'secret_sauce');

  // Add first product to cart
  await inventoryPage.addProductToCart(0);

  // Go to cart
  await inventoryPage.goToCart();

  // Verify cart page is displayed
  await cartPage.verifyCartPageIsDisplayed();

  // Verify item is in cart
  const cartItemCount = await cartPage.getCartItemCount();
  expect(cartItemCount).toBeGreaterThan(0);
});

test('add multiple items to cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  // Login with valid credentials
  await loginPage.login('standard_user', 'secret_sauce');

  // Add multiple products to cart
  await inventoryPage.addProductToCart(0);
  await inventoryPage.addProductToCart(1);

  // Go to cart
  await inventoryPage.goToCart();

  // Verify cart has 2 items
  await cartPage.verifyCartPageIsDisplayed();
  const cartItemCount = await cartPage.getCartItemCount();
  expect(cartItemCount).toBe(2);
});