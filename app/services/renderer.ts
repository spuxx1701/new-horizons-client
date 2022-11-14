import Service from '@ember/service';

export default class RendererService extends Service {
  desktopMinWidth = 768;

  initialize() {
    this.setTheme(this.currentTheme);
  }

  get isDesktop() {
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    return vw >= this.desktopMinWidth;
  }

  get currentTheme() {
    return 'default';
  }

  setTheme(theme: string) {
    document.documentElement.className = `theme-${theme}`;
  }
}
