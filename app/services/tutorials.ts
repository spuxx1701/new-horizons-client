import Service from '@ember/service';
import { tracked } from 'tracked-built-ins';

export default class TutorialsService extends Service {
  @tracked showTutorials = false;
}
