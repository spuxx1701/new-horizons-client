import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { isValidTheme, Theme } from './renderer';
export default class LocalStorageService extends Service {
  @tracked tutorialsEnabled =
    localStorage.getItem('tutorialsEnabled') === '1' || false;

  setTutorialsEnabled(value: boolean) {
    this.tutorialsEnabled = value;
    localStorage.setItem('tutorialsEnabled', (+value).toString());
  }

  @tracked theme = this.readTheme();

  readTheme(): Theme {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme && isValidTheme(parseInt(storedTheme))) {
      return parseInt(storedTheme);
    } else {
      return Theme.default;
    }
  }

  setTheme(theme: Theme) {
    this.theme = theme;
    localStorage.setItem('theme', theme.toString());
  }
}
