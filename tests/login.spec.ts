import { test, expect } from '@playwright/test';
import { setupHooks } from '../test-runner/hooks';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

setupHooks();

test('login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  // Login with valid credentials
  await loginPage.login('standard_user', 'secret_sauce');

  // Verify successful login
  await inventoryPage.verifyInventoryPageIsDisplayed();
  await inventoryPage.verifyProductsAreDisplayed();
});