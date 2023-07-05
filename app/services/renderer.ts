import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import SettingsService from './settings';

export enum Theme {
  default,
  white,
  red,
}

export function isValidTheme(value: number) {
  return Object.values(Theme).includes(value);
}

export default class RendererService extends Service {
  @service declare settings: SettingsService;
  desktopMinWidth = 768;

  initialize() {
    this.currentTheme = this.settings.getValue('theme');
  }

  get isDesktop() {
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    return vw >= this.desktopMinWidth;
  }

  get currentTheme() {
    return this.settings.getValue('theme');
  }

  set currentTheme(theme: Theme) {
    this.settings.update({ theme });
    document.documentElement.className = `theme-${Theme[theme]}`;
  }

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
      const radius = diameter / 2;
      ripple.style.width = ripple.style.height = `${diameter}px`;
      // ripple.style.left = `${event.clientX - (control.offsetLeft + radius)}px`;
      // ripple.style.top = `${event.clientY - (control.offsetTop + radius)}px`;
      ripple.classList.add('click-ripple');
      control.appendChild(ripple);
    }
  }
}
