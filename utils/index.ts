import { Page } from '@playwright/test';
import { ClickActions } from './ClickActions';
import { FillActions } from './FillActions';
import { WaitActions } from './WaitActions';
import { NavigationActions } from './NavigationActions';
import { VerificationActions } from './VerificationActions';
import { ScreenshotActions } from './ScreenshotActions';
import { InteractionActions } from './InteractionActions';

export class PlaywrightUtils {
  readonly clickActions: ClickActions;
  readonly fillActions: FillActions;
  readonly waitActions: WaitActions;
  readonly navigationActions: NavigationActions;
  readonly verificationActions: VerificationActions;
  readonly screenshotActions: ScreenshotActions;
  readonly interactionActions: InteractionActions;

  constructor(private page: Page) {
    this.clickActions = new ClickActions(page);
    this.fillActions = new FillActions(page);
    this.waitActions = new WaitActions(page);
    this.navigationActions = new NavigationActions(page);
    this.verificationActions = new VerificationActions(page);
    this.screenshotActions = new ScreenshotActions(page);
    this.interactionActions = new InteractionActions(page);
  }
}

export { ClickActions } from './ClickActions';
export { FillActions } from './FillActions';
export { WaitActions } from './WaitActions';
export { NavigationActions } from './NavigationActions';
export { VerificationActions } from './VerificationActions';
export { ScreenshotActions } from './ScreenshotActions';
export { InteractionActions } from './InteractionActions';