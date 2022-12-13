import Service, { service } from '@ember/service';
import LocalStorageService from './local-storage';

export enum Theme {
  default,
  white,
}

export function isValidTheme(value: number) {
  return Object.values(Theme).includes(value);
}

export default class RendererService extends Service {
  @service declare localStorage: LocalStorageService;

  desktopMinWidth = 768;

  initialize() {
    this.currentTheme = this.localStorage.theme;
  }

  get isDesktop() {
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    return vw >= this.desktopMinWidth;
  }

  get currentTheme() {
    return this.localStorage.theme;
  }

  set currentTheme(theme: Theme) {
    this.localStorage.setTheme(theme);
    document.documentElement.className = `theme-${Theme[theme]}`;
  }
}
