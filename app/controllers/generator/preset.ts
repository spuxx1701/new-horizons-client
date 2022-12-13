import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import GeneratorService from 'new-horizons-client/services/generator';
import LocalStorageService from 'new-horizons-client/services/local-storage';

export default class GeneratorPresetController extends Controller {
  @service declare localStorage: LocalStorageService;
  @service declare generator: GeneratorService;

  @action toggleTutorials() {
    this.localStorage.setTutorialsEnabled(!this.localStorage.tutorialsEnabled);
  }
}
