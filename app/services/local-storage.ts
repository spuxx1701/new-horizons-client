import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { isValidTheme, Theme } from './renderer';

const PREFIX = 'newhorizons-';

export default class LocalStorageService extends Service {
  @tracked tutorialsEnabled =
    localStorage.getItem(PREFIX + 'tutorialsEnabled') === '1' || false;

  setTutorialsEnabled(value: boolean) {
    this.tutorialsEnabled = value;
    localStorage.setItem(PREFIX + 'tutorialsEnabled', (+value).toString());
  }

  @tracked theme = this.readTheme();

  readTheme(): Theme {
    const storedTheme = localStorage.getItem(PREFIX + 'theme');
    if (storedTheme && isValidTheme(parseInt(storedTheme))) {
      return parseInt(storedTheme);
    } else {
      return Theme.default;
    }
  }

  setTheme(theme: Theme) {
    this.theme = theme;
    localStorage.setItem(PREFIX + 'theme', theme.toString());
  }
}
