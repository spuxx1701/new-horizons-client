import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import CharacterPreset from 'new-horizons-client/game-objects/character-preset';
import ENV from 'new-horizons-client/config/environment';
import Origin from 'new-horizons-client/game-objects/origin';
import Character from 'new-horizons-client/game-objects/character';

export default class GeneratorService extends Service {
  @service declare intl: any;

  @tracked state: 'preset' | 'origin' | 'post-origin' = 'preset';

  character: Character | undefined;

  // Point budgets
  @tracked attributePoints = 0;

  /**
   * Initializes a character and starts the generation process. Doing so will
   * reset the service's state.
   * @param characterPreset The character preset that will be used during generation.
   */
  startGeneration(characterPreset: CharacterPreset) {
    // Initialize character
    this.character = new Character(
      ENV.gameVersion,
      characterPreset.id,
      this.intl.t('generator.character-default-name')
    );
    this._initializeSkills();
    // Set proper state
    this.state = 'origin';
  }

  /**
   * Will initialize the character's basic skills.
   */
  _initializeSkills() {
    // do something
  }

  /**
   * Sets a character's origin.
   * @param origin
   */
  setOrigin(origin: Origin) {
    (this.character as Character).originId = origin.id;
  }
}
