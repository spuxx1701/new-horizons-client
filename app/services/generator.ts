import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import CharacterPreset from 'new-horizons-client/game-objects/character/character-preset';
import ENV from 'new-horizons-client/config/environment';
import Origin from 'new-horizons-client/game-objects/character/origin';
import Character from 'new-horizons-client/game-objects/character';
import UtilityService from './utility';
import DatabaseService from './database';

export default class GeneratorService extends Service {
  @service declare database: DatabaseService;
  @service declare intl: any;
  @service declare utility: UtilityService;

  @tracked state: 'preset' | 'origin' | 'post-origin' = 'preset';

  character: Character | undefined;

  // Point budgets
  @tracked attributePoints = 0;

  /**
   * Initializes a character and starts the generation process. Doing so will
   * reset the service's state.
   * @param characterPreset The character preset that will be used during generation.
   */
  async startGeneration(characterPreset: CharacterPreset) {
    // Initialize character
    this.character = new Character(
      this.utility.getUuid(),
      ENV.gameVersion,
      characterPreset.id,
      this.intl.t('generator.character-default-name')
    );
    await this.initializeAttributes();
    await this.initializeSkills();
    // Set proper state
    this.state = 'origin';
  }

  /**
   * Will initialize the character's primary and secondary attributes.
   */
  private async initializeAttributes() {
    this.characterIsDefinedOrThrow();
    const primaryAttributes = await this.database.getPrimaryAttributes();
    for (const primaryAttribute of primaryAttributes) {
      primaryAttribute.addToCharacter(this.character as Character);
    }
  }

  /**
   * Will initialize the character's basic skills.
   */
  private async initializeSkills() {
    this.characterIsDefinedOrThrow();
  }

  /**
   * Sets a character's origin.
   * @param origin
   */
  setOrigin(origin: Origin) {
    (this.character as Character).originId = origin.id;
  }

  private characterIsDefinedOrThrow() {
    if (!this.character) {
      throw new Error('Character is not defined.');
    } else return true;
  }
}
