import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import CharacterGameObject from 'new-horizons-client/game-objects/character';

export default class GeneratorService extends Service {
  @service declare intl: any;

  character: CharacterGameObject | undefined;

  @tracked state: 'preset' | 'origin' | 'post-origin' = 'preset';

  // Point budgets
  @tracked attributePoints = 0;

  startGeneration() {
    this.character = new CharacterGameObject(
      1.0,
      this.intl.t('generator.character-default-name')
    );
    console.log(this.character);
  }
}
