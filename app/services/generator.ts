import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import CharacterPreset from 'new-horizons-client/game-objects/character/character-preset';
import ENV from 'new-horizons-client/config/environment';
import Origin from 'new-horizons-client/game-objects/character/origin';
import Character from 'new-horizons-client/game-objects/character/character';
import UtilityService from './utility';
import DatabaseService from './database';
import LoggerService from './logger';

export default class GeneratorService extends Service {
  @service declare logger: LoggerService;
  @service declare database: DatabaseService;
  @service declare intl: any;
  @service declare utility: UtilityService;

  // Global state
  @tracked state: 'preset' | 'origin' | 'post-origin' = 'preset';
  // Sub-states
  @tracked selectedOriginId: string | undefined;
  @tracked selectedOriginSkillOptions: { id: string; level: number }[] = [];
  @tracked selectedMotherTongue: string | undefined;

  character: Character | undefined;

  // Point budgets
  @tracked attributePoints = 0;

  /**
   * Initializes a character and starts the generation process. Doing so will
   * reset the service's state.
   * @param characterPreset The character preset that will be used during generation.
   */
  async startGeneration(characterPreset: CharacterPreset) {
    const id = this.utility.getUuid();
    this.logger.log(`Starting generation process for character ${id}.`, {
      context: this.constructor.name,
    });
    // Initialize character
    this.character = new Character(
      this,
      id,
      ENV.gameVersion,
      characterPreset.id,
      this.intl.t('generator.character-default-name')
    );
    await this.initializeAttributes();
    await this.initializeSkills();
    // Set proper states
    this.state = 'origin';
    this.selectedOriginId = undefined;
    this.selectedOriginSkillOptions = [];
    this.selectedMotherTongue = undefined;
  }

  /**
   * Will initialize the character's primary and secondary attributes.
   */
  private async initializeAttributes() {
    const primaryAttributes = await this.database.getPrimaryAttributes();
    for (const primaryAttribute of primaryAttributes) {
      primaryAttribute.addToCharacter(this.getCharacterOrThrow());
    }
    const secondaryAttributes = await this.database.getSecondaryAttributes();
    for (const secondaryAttribute of secondaryAttributes) {
      secondaryAttribute.addToCharacter(this.getCharacterOrThrow());
    }
    this.logger.log(
      `Attributes initialized for character ${this.getCharacterOrThrow().getCharacterNameAndId()}.`,
      { context: this.constructor.name }
    );
    this.getCharacterOrThrow().recalculateSecondaryAttributes();
  }

  /**
   * Will initialize the character's basic skills.
   */
  private async initializeSkills() {
    // do something
  }

  /**
   * Sets a character's origin.
   * @param origin
   */
  setOrigin(
    origin: Origin,
    motherTongue: string,
    selectedSkills: { id: string; level: number }[]
  ) {
    (this.character as Character).originId = origin.id;
  }

  /**
   * Either returns the assigned character or throws an error if character is undefined.
   * @returns The character.
   */
  getCharacterOrThrow() {
    if (!this.character) {
      throw new Error('Character is not defined.');
    } else return this.character;
  }
}
