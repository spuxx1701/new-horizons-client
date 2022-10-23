import Service from '@ember/service';

export default class ThemeService extends Service {
  initialize() {
    this.setTheme(this.currentTheme);
  }

  get currentTheme() {
    return 'default';
  }

  setTheme(theme: string) {
    document.documentElement.className = `theme-${theme}`;
  }
}
