import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
export default class LocalStorageService extends Service {
  @tracked tutorialsEnabled =
    localStorage.getItem('tutorialsEnabled') === '1' || false;

  setTutorialsEnabled(value: boolean) {
    this.tutorialsEnabled = value;
    localStorage.setItem('tutorialsEnabled', (+value).toString());
  }
}
