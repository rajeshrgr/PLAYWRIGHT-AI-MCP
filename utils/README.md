# Playwright Common Actions Utilities

This folder contains reusable common actions for Playwright automation testing, organized by functionality. All utilities are wrapped around the `Page` object and can be accessed from any page object through the `PlaywrightUtils` class.

## Structure

### Files

1. **ClickActions.ts** - Click-related operations
   - `click()` - Click on element
   - `doubleClick()` - Double click
   - `rightClick()` - Right click
   - `forceClick()` - Force click bypassing visibility
   - `clickWithDelay()` - Click with delay
   - `clickNthElement()` - Click nth element in collection

2. **FillActions.ts** - Input and form-related operations
   - `fill()` - Fill text input
   - `clearAndFill()` - Clear and fill
   - `typeText()` - Type text with delay
   - `fillMultiple()` - Fill multiple fields
   - `selectOption()` - Select dropdown option
   - `selectMultipleOptions()` - Select multiple dropdown options
   - `getInputValue()` - Get input value
   - `clearInput()` - Clear input field

3. **WaitActions.ts** - Wait and synchronization operations
   - `waitForElementVisible()` - Wait for element visibility
   - `waitForElementHidden()` - Wait for element to be hidden
   - `waitForElementEnabled()` - Wait for element to be enabled
   - `waitForElementDisabled()` - Wait for element to be disabled
   - `waitForURL()` - Wait for URL change
   - `waitForFunction()` - Wait for function condition
   - `waitForElementCount()` - Wait for element count
   - `waitForPageLoadComplete()` - Wait for page load
   - `wait()` - Custom delay

4. **NavigationActions.ts** - Navigation operations
   - `navigateTo()` - Navigate to URL
   - `navigateToPath()` - Navigate to relative path
   - `goBack()` - Go back
   - `goForward()` - Go forward
   - `reload()` - Reload page
   - `getCurrentURL()` - Get current URL
   - `getPageTitle()` - Get page title
   - `navigateAndWait()` - Navigate and wait
   - `closePage()` - Close page

5. **VerificationActions.ts** - Assertion and verification operations
   - `verifyElementVisible()` - Verify element is visible
   - `verifyElementHidden()` - Verify element is hidden
   - `verifyElementContainsText()` - Verify element contains text
   - `verifyElementHasText()` - Verify element exact text
   - `verifyElementHasAttribute()` - Verify element attribute
   - `verifyElementEnabled()` - Verify element is enabled
   - `verifyElementDisabled()` - Verify element is disabled
   - `verifyElementChecked()` - Verify element is checked
   - `verifyPageTitle()` - Verify page title
   - `verifyCurrentURL()` - Verify current URL
   - `getElementText()` - Get element text
   - `isElementPresent()` - Check if element exists
   - `getElementCount()` - Get element count

6. **ScreenshotActions.ts** - Screenshot and logging operations
   - `takeScreenshot()` - Take page screenshot
   - `takeElementScreenshot()` - Take element screenshot
   - `takeScreenshotOnFailure()` - Take screenshot on failure
   - `takeFullPageScreenshot()` - Take full page screenshot
   - `getPageHTML()` - Get page HTML
   - `savePageHTML()` - Save page HTML to file

7. **InteractionActions.ts** - Mouse and keyboard interactions
   - `hover()` - Hover over element
   - `focus()` - Focus element
   - `blur()` - Blur element
   - `dragAndDrop()` - Drag and drop
   - `pressKey()` - Press keyboard key
   - `pressKeys()` - Press multiple keys
   - `checkCheckbox()` - Check checkbox
   - `uncheckCheckbox()` - Uncheck checkbox
   - `scrollIntoView()` - Scroll element into view
   - `scrollPageBy()` - Scroll page by coordinates
   - `scrollToTop()` - Scroll to top
   - `scrollToBottom()` - Scroll to bottom
   - `getElementPosition()` - Get element position
   - `isElementInViewport()` - Check if element is in viewport

8. **index.ts** - Main export file
   - Exports `PlaywrightUtils` class
   - Exports all individual action classes

## Usage

### In Page Objects

```typescript
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput = this.page.locator('input[data-test="username"]');
  readonly passwordInput = this.page.locator('input[data-test="password"]');
  readonly loginButton = this.page.locator('input[data-test="login-button"]');

  async login(username: string, password: string) {
    // Using click utilities
    await this.utils.clickActions.click(this.loginButton);
    
    // Using fill utilities
    await this.utils.fillActions.fill(this.usernameInput, username);
    
    // Using verification utilities
    await this.utils.verificationActions.verifyElementVisible(this.usernameInput);
    
    // Using wait utilities
    await this.utils.waitActions.waitForElementVisible(this.passwordInput);
    
    // Using navigation utilities
    const currentUrl = await this.utils.navigationActions.getCurrentURL();
  }
}
```

### In Test Files

```typescript
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  // All utilities are available through the page object
  await loginPage.utils.screenshotActions.takeScreenshot('before-login');
  await loginPage.login('user', 'password');
  await loginPage.utils.screenshotActions.takeScreenshot('after-login');
});
```

## Access Pattern

```typescript
// Access utilities through any page object
page.utils.clickActions.click(locator);
page.utils.fillActions.fill(locator, 'text');
page.utils.waitActions.waitForElementVisible(locator);
page.utils.navigationActions.navigateTo('url');
page.utils.verificationActions.verifyElementVisible(locator);
page.utils.screenshotActions.takeScreenshot('name');
page.utils.interactionActions.hover(locator);
```

## Benefits

✅ **Reusable** - Common actions across all tests  
✅ **Maintainable** - Localized to utilities folder  
✅ **Organized** - Grouped by functionality  
✅ **Scalable** - Easy to add new utilities  
✅ **Readable** - Clear method names and organization  
✅ **DRY** - Don't repeat yourself  
