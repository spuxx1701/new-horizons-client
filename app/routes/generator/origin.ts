import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Origin from 'new-horizons-client/game-objects/character/origin';
import DatabaseService from 'new-horizons-client/services/database';
import GeneratorService from 'new-horizons-client/services/generator';
import RSVP from 'rsvp';

export interface GeneratorOriginRouteModel {
  origins: Origin[];
}

export default class GeneratorOriginRoute extends Route {
  @service declare database: DatabaseService;
  @service declare generator: GeneratorService;
  @service declare router: RouterService;

  async model(): Promise<GeneratorOriginRouteModel> {
    return RSVP.hash({
      origins: await this.database.getOrigins(),
    });
  }

  redirect(): void {
    if (this.generator.state === 'preset') {
      this.router.transitionTo('generator.preset');
    }
  }
}
