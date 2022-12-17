import Route from '@ember/routing/route';
import { service } from '@ember/service';
import CharacterPreset from 'new-horizons-client/game-objects/character-preset';
import DatabaseService from 'new-horizons-client/services/database';
import RSVP from 'rsvp';

export interface GeneratorPresetRouteModel {
  characterPresets: CharacterPreset[];
}

export default class GeneratorPresetRoute extends Route {
  @service declare database: DatabaseService;

  async model(): Promise<GeneratorPresetRouteModel> {
    return RSVP.hash({
      characterPresets: await this.database.getCharacterPresets(),
    });
  }
}
