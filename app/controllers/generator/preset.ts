import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import GeneratorService from 'new-horizons-client/services/generator';
import TutorialsService from 'new-horizons-client/services/tutorials';

export default class GeneratorPresetController extends Controller {
  @service declare tutorials: TutorialsService;
  @service declare generator: GeneratorService;

  get showTutorials() {
    return this.tutorials.showTutorials;
  }

  set showTutorials(state: boolean) {
    this.tutorials.showTutorials = state;
  }

  @action toggleShowTutorials() {
    this.showTutorials = !this.showTutorials;
  }
}
