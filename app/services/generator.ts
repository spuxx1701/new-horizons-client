import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import CharacterGameObject from 'new-horizons-client/game-objects/character';
import CharacterPreset from 'new-horizons-client/game-objects/character-preset';
import ENV from 'new-horizons-client/config/environment';

export default class GeneratorService extends Service {
  @service declare intl: any;

  @tracked state: 'preset' | 'origin' | 'post-origin' = 'preset';

  character: CharacterGameObject | undefined;

  // Point budgets
  @tracked attributePoints = 0;

  startGeneration(characterPreset: CharacterPreset) {
    // Initialize character
    this.character = new CharacterGameObject(
      ENV.gameVersion,
      characterPreset.id,
      this.intl.t('generator.character-default-name')
    );
    // Set proper state
    this.state = 'origin';
  }
}
