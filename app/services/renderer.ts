import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import SettingsService from './settings';
import { appConfig } from 'new-horizons-client/config/app.config';

export enum Theme {
  default,
  white,
  red,
}

/**
 * `RendererService` deals with all sorts of visuals and
 * rendering functionalities.
 */
export default class RendererService extends Service {
  @service declare settings: SettingsService;

  /**
   * Initializes the service. Loads a theme.
   */
  initialize() {
    this.setTheme(this.settings.getValue('theme'));
  }

  /**
   * Whether the application runs in desktop mode.
   */
  get isDesktop() {
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    return vw >= appConfig.desktopMinWidth;
  }

  /**
   * Sets the current theme.
   * @param theme The new theme.
   */
  setTheme(theme: Theme) {
    this.settings.update({ theme });
    document.documentElement.className = `theme-${Theme[theme]}`;
  }

  /**
   * Uses the given `MouseEvent` to create a 'click ripple'
   * on the event's source element.
   * @param event The `MouseEvent`.
   */
  @action createClickRipple(event: MouseEvent) {
    const control = event.currentTarget as HTMLElement;
    if (control) {
      const existingRipples =
        document.body.getElementsByClassName('click-ripple');
      for (const ripple of existingRipples) {
        ripple.remove();
      }
      const ripple = document.createElement('span');
      const diameter = Math.max(control.clientWidth, control.clientHeight);
      ripple.style.width = ripple.style.height = `${diameter}px`;
      ripple.classList.add('click-ripple');
      control.appendChild(ripple);
    }
  }
}
