import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import GeneratorService from './generator';
import RendererService from './renderer';
import UtilityService from './utility';
import ENV from 'new-horizons-client/config/environment';

export default class ManagerService extends Service {
  @service declare renderer: RendererService;
  @service declare intl: any;
  @service declare utility: UtilityService;
  @service declare generator: GeneratorService;

  @action initialize() {
    this.intl.setLocale(['de-de']);
    this.renderer.initialize();
    // Add beforeunload listener that checks whether there are unsaved changes. Can be enabled/disabled.
    if (ENV.APP['USE_ONBEFOREUNLOAD']) {
      window.onbeforeunload = this.handleBeforeUnload;
    }
  }

  @action handleBeforeUnload() {
    if (this.generator.character) {
      return this.utility.translate('misc.warn-unsaved-changes');
    } else {
      return null;
    }
  }
}
