import { Page } from '@playwright/test';
import { PlaywrightUtils } from '../utils/index';

export class BasePage {
  readonly page: Page;
  readonly utils: PlaywrightUtils;

  constructor(page: Page) {
    this.page = page;
    this.utils = new PlaywrightUtils(page);
    this.setupPopupHandlers();
  }

  /**
   * Setup automatic popup and dialog handlers
   */
  private setupPopupHandlers() {
    // Handle browser dialogs (alert, confirm, prompt)
    this.page.on('dialog', async (dialog) => {
      console.log(`Browser dialog detected: ${dialog.type()} - ${dialog.message()}`);
      try {
        if (dialog.type() === 'alert' || dialog.type() === 'confirm') {
          await dialog.accept();
        } else if (dialog.type() === 'prompt') {
          await dialog.accept('');
        } else {
          await dialog.dismiss();
        }
      } catch (e) {
        console.log(`Failed to handle dialog: ${e}`);
      }
    });

    // Handle new popup windows
    this.page.on('popup', async (popup) => {
      console.log('Popup window detected, attempting to close...');
      try {
        await popup.close();
      } catch (e) {
        console.log(`Failed to close popup window: ${e}`);
      }
    });

    // Handle page errors
    this.page.on('pageerror', (error) => {
      console.warn(`Page error: ${error.message}`);
    });

    // Listen for new pages in the browser context
    this.page.context()?.on('page', async (newPage) => {
      console.log('New page/tab opened, auto-closing...');
      try {
        await newPage.close();
      } catch (e) {
        console.log(`Failed to close new page: ${e}`);
      }
    });
  }

  async goto(path: string = '/') {
    await this.utils.navigationActions.navigateToPath(path);
  }

  /**
   * Enhanced popup handler with aggressive retry logic and multiple strategies
   */
  async handlePasswordPopup() {
    try {
      const maxRetries = 5;
      let retryCount = 0;

      while (retryCount < maxRetries) {
        // Wait briefly for popup to appear
        await this.page.waitForTimeout(500);

        // Strategy 1: Look for password change popup
        try {
          const popupTitle = this.page.locator('text=Change your password');
          if (await popupTitle.isVisible().catch(() => false)) {
            console.log('Password popup detected, closing...');
            const okButton = this.page.locator('button:has-text("OK")').first();
            if (await okButton.isVisible().catch(() => false)) {
              await okButton.click({ force: true });
              await this.page.waitForTimeout(1000);
              return true;
            }
          }
        } catch (e) {
          console.log('Strategy 1 (password popup) - no match');
        }

        // Strategy 2: Look for any modal/dialog overlay
        try {
          const overlay = this.page.locator('[role="dialog"], .modal, .popup, .overlay');
          const overlayCount = await overlay.count().catch(() => 0);
          
          if (overlayCount > 0) {
            console.log(`Modal dialog found (${overlayCount}), attempting to close...`);
            
            // Try close button
            const closeButton = this.page.locator('[role="dialog"] button[aria-label="Close"], [role="dialog"] .close, button:has-text("Close")').first();
            if (await closeButton.isVisible().catch(() => false)) {
              await closeButton.click({ force: true });
              await this.page.waitForTimeout(1000);
              return true;
            }

            // Try OK button
            const okBtn = this.page.locator('[role="dialog"] button:has-text("OK")').first();
            if (await okBtn.isVisible().catch(() => false)) {
              await okBtn.click({ force: true });
              await this.page.waitForTimeout(1000);
              return true;
            }

            // Try Cancel button
            const cancelBtn = this.page.locator('[role="dialog"] button:has-text("Cancel")').first();
            if (await cancelBtn.isVisible().catch(() => false)) {
              await cancelBtn.click({ force: true });
              await this.page.waitForTimeout(1000);
              return true;
            }
          }
        } catch (e) {
          console.log('Strategy 2 (modal dialog) - no match');
        }

        // Strategy 3: Press Escape key
        try {
          await this.page.keyboard.press('Escape');
          await this.page.waitForTimeout(500);
          console.log('Escape key pressed');
        } catch (e) {
          console.log('Escape key press failed');
        }

        // Strategy 4: Check for any visible button that might close popup
        try {
          const buttons = await this.page.locator('button').all();
          for (const btn of buttons) {
            const text = await btn.textContent().catch(() => '');
            if (text && ['OK', 'Cancel', 'Close', 'Done', 'Skip', 'No'].includes(text.trim())) {
              const isVisible = await btn.isVisible().catch(() => false);
              if (isVisible) {
                console.log(`Found and clicking button: ${text}`);
                await btn.click({ force: true });
                await this.page.waitForTimeout(1000);
                return true;
              }
            }
          }
        } catch (e) {
          console.log('Strategy 4 (button scan) failed');
        }

        retryCount++;
        console.log(`Popup check attempt ${retryCount}/${maxRetries}`);
      }

      console.log('No popup detected after all attempts');
      return false;
    } catch (error) {
      console.error(`Popup handler error: ${error}`);
      return false;
    }
  }

  /**
   * Dismiss all visible popups/modals on the page
   */
  async dismissAllPopups() {
    try {
      // Try common popup close patterns
      const closeSelectors = [
        'button[class*="close"]',
        'button[aria-label*="close"]',
        'button[aria-label*="Close"]',
        'button:has-text("OK")',
        'button:has-text("Cancel")',
        'button:has-text("Done")',
        '[role="dialog"] button:first-child',
      ];

      for (const selector of closeSelectors) {
        const buttons = this.page.locator(selector);
        const count = await buttons.count();

        if (count > 0) {
          console.log(`Closing popup with selector: ${selector}`);
          await this.utils.clickActions.click(buttons.first());
          await this.page.waitForTimeout(500);
        }
      }
    } catch (error) {
      console.log(`Error dismissing popups: ${error}`);
    }
  }
}