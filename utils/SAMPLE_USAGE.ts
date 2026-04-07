import { Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

/**
 * Sample file demonstrating how to use all PlaywrightUtils in your tests
 * This serves as a reference guide for developers
 */

export class SampleUtilsUsage extends BasePage {
  readonly sampleInput = this.page.locator('input#sample');
  readonly submitButton = this.page.locator('button#submit');
  readonly resultText = this.page.locator('div#result');
  readonly checkbox = this.page.locator('input[type="checkbox"]');
  readonly dropdown = this.page.locator('select#options');

  constructor(page: Page) {
    super(page);
  }

  async demonstrateClickActions() {
    // Basic click
    await this.utils.clickActions.click(this.submitButton);

    // Double click
    await this.utils.clickActions.doubleClick(this.sampleInput);

    // Right click
    await this.utils.clickActions.rightClick(this.sampleInput);

    // Force click (if element is disabled)
    await this.utils.clickActions.forceClick(this.submitButton);

    // Click with delay
    await this.utils.clickActions.clickWithDelay(this.submitButton, 500);

    // Click nth element
    await this.utils.clickActions.clickNthElement(this.submitButton, 0);

    // Click and wait for navigation
    await this.utils.clickActions.clickAndWaitForNavigation(this.submitButton);
  }

  async demonstrateFillActions() {
    // Fill text input
    await this.utils.fillActions.fill(this.sampleInput, 'test value');

    // Clear and fill
    await this.utils.fillActions.clearAndFill(this.sampleInput, 'new value');

    // Type text with character delay
    await this.utils.fillActions.typeText(this.sampleInput, 'slow typing');

    // Get input value
    const value = await this.utils.fillActions.getInputValue(this.sampleInput);

    // Clear input
    await this.utils.fillActions.clearInput(this.sampleInput);

    // Select dropdown option
    await this.utils.fillActions.selectOption(this.dropdown, 'option1');

    // Select multiple options
    await this.utils.fillActions.selectMultipleOptions(this.dropdown, ['option1', 'option2']);

    // Fill multiple fields
    await this.utils.fillActions.fillMultiple([
      { locator: this.sampleInput, text: 'Field 1' },
      { locator: this.sampleInput, text: 'Field 2' },
    ]);
  }

  async demonstrateWaitActions() {
    // Wait for element visibility
    await this.utils.waitActions.waitForElementVisible(this.resultText);

    // Wait for element to be hidden
    await this.utils.waitActions.waitForElementHidden(this.sampleInput);

    // Wait for element enabled
    await this.utils.waitActions.waitForElementEnabled(this.submitButton);

    // Wait for element disabled
    await this.utils.waitActions.waitForElementDisabled(this.submitButton);

    // Wait for URL match
    await this.utils.waitActions.waitForURL(/.*result/);

    // Wait for custom function
    await this.utils.waitActions.waitForFunction(
      () => this.page.locator('div#result').isVisible(),
      10000
    );

    // Wait for element count
    await this.utils.waitActions.waitForElementCount(this.sampleInput, 1);

    // Wait for page load
    await this.utils.waitActions.waitForPageLoadComplete();

    // Custom delay
    await this.utils.waitActions.wait(2000);
  }

  async demonstrateNavigationActions() {
    // Navigate to URL
    await this.utils.navigationActions.navigateTo('https://example.com');

    // Navigate to relative path
    await this.utils.navigationActions.navigateToPath('/results');

    // Go back
    await this.utils.navigationActions.goBack();

    // Go forward
    await this.utils.navigationActions.goForward();

    // Reload page
    await this.utils.navigationActions.reload();

    // Get current URL
    const url = await this.utils.navigationActions.getCurrentURL();

    // Get page title
    const title = await this.utils.navigationActions.getPageTitle();

    // Navigate and wait
    await this.utils.navigationActions.navigateAndWait('https://example.com', 'networkidle');

    // Close page
    // await this.utils.navigationActions.closePage();
  }

  async demonstrateVerificationActions() {
    // Verify element visible
    await this.utils.verificationActions.verifyElementVisible(this.submitButton);

    // Verify element hidden
    await this.utils.verificationActions.verifyElementHidden(this.resultText);

    // Verify element contains text
    await this.utils.verificationActions.verifyElementContainsText(
      this.resultText,
      'Success'
    );

    // Verify element has exact text
    await this.utils.verificationActions.verifyElementHasText(this.resultText, 'Success');

    // Verify element attribute
    await this.utils.verificationActions.verifyElementHasAttribute(
      this.submitButton,
      'type',
      'submit'
    );

    // Verify element enabled
    await this.utils.verificationActions.verifyElementEnabled(this.submitButton);

    // Verify element disabled
    await this.utils.verificationActions.verifyElementDisabled(this.sampleInput);

    // Verify element checked
    await this.utils.verificationActions.verifyElementChecked(this.checkbox);

    // Verify page title
    await this.utils.verificationActions.verifyPageTitle(/Sample Page/);

    // Verify current URL
    await this.utils.verificationActions.verifyCurrentURL(/.*sample/);

    // Get element text
    const text = await this.utils.verificationActions.getElementText(this.resultText);

    // Check if element present
    const isPresent = await this.utils.verificationActions.isElementPresent(
      this.resultText
    );

    // Get element count
    const count = await this.utils.verificationActions.getElementCount(this.submitButton);
  }

  async demonstrateScreenshotActions() {
    // Take page screenshot
    await this.utils.screenshotActions.takeScreenshot('sample-page');

    // Take element screenshot
    await this.utils.screenshotActions.takeElementScreenshot(
      this.resultText,
      'result-element'
    );

    // Take screenshot on failure
    await this.utils.screenshotActions.takeScreenshotOnFailure('sample-test');

    // Take full page screenshot
    await this.utils.screenshotActions.takeFullPageScreenshot('sample-full-page');

    // Get page HTML
    const html = await this.utils.screenshotActions.getPageHTML();

    // Save page HTML
    await this.utils.screenshotActions.savePageHTML('sample-page-html');
  }

  async demonstrateInteractionActions() {
    // Hover over element
    await this.utils.interactionActions.hover(this.submitButton);

    // Focus element
    await this.utils.interactionActions.focus(this.sampleInput);

    // Blur element
    await this.utils.interactionActions.blur(this.sampleInput);

    // Drag and drop
    const source = this.page.locator('div#source');
    const target = this.page.locator('div#target');
    await this.utils.interactionActions.dragAndDrop(source, target);

    // Press single key
    await this.utils.interactionActions.pressKey('Enter');

    // Press multiple keys
    await this.utils.interactionActions.pressKeys(['Control', 'A', 'Delete']);

    // Check checkbox
    await this.utils.interactionActions.checkCheckbox(this.checkbox);

    // Uncheck checkbox
    await this.utils.interactionActions.uncheckCheckbox(this.checkbox);

    // Scroll element into view
    await this.utils.interactionActions.scrollIntoView(this.resultText);

    // Scroll page by coordinates
    await this.utils.interactionActions.scrollPageBy(0, 100);

    // Scroll to top
    await this.utils.interactionActions.scrollToTop();

    // Scroll to bottom
    await this.utils.interactionActions.scrollToBottom();

    // Get element position
    const position = await this.utils.interactionActions.getElementPosition(
      this.resultText
    );

    // Check if element in viewport
    const inViewport = await this.utils.interactionActions.isElementInViewport(
      this.resultText
    );
  }
}