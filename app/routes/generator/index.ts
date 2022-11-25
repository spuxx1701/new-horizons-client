import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import transition from '@ember/routing/transition';
import { service } from '@ember/service';
import GeneratorService from 'new-horizons-client/services/generator';

export default class GeneratorRoute extends Route {
  @service declare generator: GeneratorService;
  @service declare router: RouterService;

  redirect(model: unknown, transition: transition<unknown>): void {
    console.log(transition.to);
    if (this.generator.generationInProgress) {
      this.router.transitionTo('generator.generator.origin');
    } else {
      this.transitionTo('generator.preset');
    }
  }
}
