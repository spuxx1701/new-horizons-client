import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Origin from 'new-horizons-client/game-objects/character/origin';
import DatabaseService from 'new-horizons-client/services/database';
import GeneratorService from 'new-horizons-client/services/generator';

const DEFAULT_MOTHER_TONGUE = 'Solaire';

export interface GeneratorOriginRouteModel {
  origins: Origin[];
}

export default class GeneratorOriginRoute extends Route {
  @service declare database: DatabaseService;
  @service declare generator: GeneratorService;
  @service declare router: RouterService;

  async model(): Promise<GeneratorOriginRouteModel> {
    const origins = await this.database.getOrigins();
    return {
      origins,
    } as GeneratorOriginRouteModel;
  }

  async afterModel() {
    // Initialize default selection
    if (!this.generator.selectedOriginId) {
      const defaultOrigin = (await this.database.getOrigins())[0] as Origin;
      this.generator.selectedOriginId = defaultOrigin.id;
      this.generator.selectedOriginSkillOptions =
        defaultOrigin.getSkillOptionDefaults();
      this.generator.selectedMotherTongue = DEFAULT_MOTHER_TONGUE;
    }
  }

  redirect(): void {
    if (this.generator.state === 'preset') {
      this.router.transitionTo('generator.preset');
    }
  }
}
