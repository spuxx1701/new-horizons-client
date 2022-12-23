import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import GeneratorService from 'new-horizons-client/services/generator';

export default class GeneratorRoute extends Route {
  @service declare generator: GeneratorService;
  @service declare router: RouterService;

  redirect(): void {
    if (this.generator.state !== 'preset') {
      this.router.transitionTo('generator.origin');
    } else {
      this.router.transitionTo('generator.preset');
    }
  }
}
