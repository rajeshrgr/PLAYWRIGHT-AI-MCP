import { test, expect } from '@playwright/test';
import { setupHooks } from '../test-runner/hooks';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

setupHooks();

test('E2E: Complete order placement flow - single product', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Step 1: Navigate to login page
  await page.goto('https://www.saucedemo.com/');
  await loginPage.handlePasswordPopup();
  
  // Step 2: Login with valid credentials
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.handlePasswordPopup();

  // Step 3: Verify inventory page is displayed
  await inventoryPage.verifyInventoryPageIsDisplayed();
  await loginPage.handlePasswordPopup();

  // Step 4: Add first product to cart
  await inventoryPage.addProductToCart(0);

  // Step 5: Verify product is added to cart (check cart badge)
  let cartCount = await inventoryPage.getCartBadgeCount();
  expect(cartCount).toBe(1);

  // Step 6: Navigate to cart
  await inventoryPage.goToCart();
  await loginPage.handlePasswordPopup();

  // Step 7: Verify cart page is displayed
  await cartPage.verifyCartPageIsDisplayed();

  // Step 8: Verify product is in cart
  const originalCartItemCount = await cartPage.getCartItemCount();
  expect(originalCartItemCount).toBeGreaterThan(0);

  // Step 9: Click checkout
  await cartPage.clickCheckout();
  await loginPage.handlePasswordPopup();

  // Step 10: Verify checkout page is displayed
  await checkoutPage.verifyCheckoutStepOne();

  // Step 11: Fill checkout information and continue
  await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
  await checkoutPage.clickContinue();

  // Step 12: Verify checkout overview page and order details
  await checkoutPage.verifyOverviewDetails();

  // Step 13: Finish order
  await checkoutPage.clickFinish();
  await checkoutPage.verifyOrderConfirmation();
});

test('E2E: Add multiple products and place order', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Step 1: Navigate and login
  await page.goto('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'secret_sauce');

  // Step 2: Verify inventory page
  await inventoryPage.verifyInventoryPageIsDisplayed();

  // Step 3: Add multiple products to cart
  await inventoryPage.addProductToCart(0);
  await inventoryPage.addProductToCart(1);
  await inventoryPage.addProductToCart(2);

  // Step 4: Verify cart count
  const cartCount = await inventoryPage.getCartBadgeCount();
  expect(cartCount).toBe(3);

  // Step 5: Navigate to cart
  await inventoryPage.goToCart();

  // Step 6: Verify all products are in cart
  await cartPage.verifyCartPageIsDisplayed();
  const itemCount = await cartPage.getCartItemCount();
  expect(itemCount).toBe(3);

  // Step 7: Verify total price is calculated
  const totalPrice = await cartPage.getTotalPrice();
  expect(totalPrice).toBeGreaterThan(0);

  // Step 8: Click checkout
  await cartPage.clickCheckout();

  // Step 9: Verify checkout page appears and continue
  await checkoutPage.verifyCheckoutStepOne();
  await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
  await checkoutPage.clickContinue();
  await checkoutPage.verifyOverviewDetails();
  await checkoutPage.clickFinish();
  await checkoutPage.verifyOrderConfirmation();
});

test('E2E: Remove product from cart before checkout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  // Step 1: Navigate and login
  await page.goto('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'secret_sauce');

  // Step 2: Add two products to cart
  await inventoryPage.addProductToCart(0);
  await inventoryPage.addProductToCart(1);

  // Step 3: Verify cart has 2 items
  let cartCount = await inventoryPage.getCartBadgeCount();
  expect(cartCount).toBe(2);

  // Step 4: Navigate to cart
  await inventoryPage.goToCart();

  // Step 5: Verify cart page displayed
  await cartPage.verifyCartPageIsDisplayed();
  let itemCount = await cartPage.getCartItemCount();
  expect(itemCount).toBe(2);

  // Step 6: Remove first product
  const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]').first();
  await removeButton.click();

  // Step 7: Verify cart now has 1 item
  await page.waitForTimeout(500);
  itemCount = await cartPage.getCartItemCount();
  expect(itemCount).toBe(1);

  // Step 8: Continue to checkout
  await cartPage.clickCheckout();

  // Step 9: Verify checkout page
  await page.waitForURL(/.*checkout-step-one/);
  expect(page.url()).toContain('checkout-step-one');
});

test('E2E: Continue shopping and add more items', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Step 1: Navigate and login
  await page.goto('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'secret_sauce');

  // Step 2: Add product to cart
  await inventoryPage.addProductToCart(0);

  // Step 3: Navigate to cart
  await inventoryPage.goToCart();

  // Step 4: Verify cart
  await cartPage.verifyCartPageIsDisplayed();
  let itemCount = await cartPage.getCartItemCount();
  expect(itemCount).toBe(1);

  // Step 5: Click continue shopping
  await cartPage.clickContinueShopping();

  // Step 6: Verify back on inventory page
  await inventoryPage.verifyInventoryPageIsDisplayed();

  // Step 7: Add more products
  await inventoryPage.addProductToCart(2);
  await inventoryPage.addProductToCart(3);

  // Step 8: Navigate to cart again
  await inventoryPage.goToCart();

  // Step 9: Verify cart now has 3 items
  await cartPage.verifyCartPageIsDisplayed();
  itemCount = await cartPage.getCartItemCount();
  expect(itemCount).toBe(3);

  // Step 10: Proceed to checkout
  await cartPage.clickCheckout();
  await checkoutPage.verifyCheckoutStepOne();
  await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
  await checkoutPage.clickContinue();
  await checkoutPage.verifyOverviewDetails();
  await checkoutPage.clickFinish();
  await checkoutPage.verifyOrderConfirmation();
});

test('E2E: Verify order summary before final confirmation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Step 1: Navigate and login
  await page.goto('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'secret_sauce');

  // Step 2: Add products
  await inventoryPage.addProductToCart(0);
  await inventoryPage.addProductToCart(1);

  // Step 3: Go to cart
  await inventoryPage.goToCart();

  // Step 4: Verify cart details
  await cartPage.verifyCartPageIsDisplayed();
  const itemCount = await cartPage.getCartItemCount();
  const totalPrice = await cartPage.getTotalPrice();

  expect(itemCount).toBe(2);
  expect(totalPrice).toBeGreaterThan(0);

  // Step 5: Proceed to checkout
  await cartPage.clickCheckout();
  await checkoutPage.verifyCheckoutStepOne();
  await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
  await checkoutPage.clickContinue();
  await checkoutPage.verifyOverviewDetails();
  await checkoutPage.clickFinish();
  await checkoutPage.verifyOrderConfirmation();
});

test('E2E: Complete full order from login to confirmation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Step 1: Navigate to site
  await page.goto('https://www.saucedemo.com/');

  // Step 2: Login
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.verifyInventoryPageIsDisplayed();

  // Step 3: Add products
  await inventoryPage.addProductToCart(0);
  await inventoryPage.addProductToCart(1);

  // Step 4: Go to cart and verify
  await inventoryPage.goToCart();
  await cartPage.verifyCartPageIsDisplayed();

  // Step 5: Checkout
  await cartPage.clickCheckout();

  // Step 6: Fill checkout info
  await checkoutPage.verifyCheckoutStepOne();
  await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
  await checkoutPage.clickContinue();

  // Step 8: Verify overview page and finish order
  await checkoutPage.verifyOverviewDetails();
  await checkoutPage.clickFinish();
  await checkoutPage.verifyOrderConfirmation();
});
