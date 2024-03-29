import EmberObject from '@ember/object';
import { service } from '@ember/service';
import LoggerService from 'new-horizons-client/services/logger';
import { tracked } from 'tracked-built-ins';
import GameObject from '../game-object';
import PrimaryAttribute from './primary-attribute';
import SecondaryAttribute from './secondary-attribute';

export default class Character extends GameObject {
  @service declare logger: LoggerService;

  @tracked gameVersion: string; // The game version that the character has been edited with last.
  @tracked characterPresetId: string; // The id of the character preset the character has been created with.

  @tracked name = 'unknown';
  originId = 'unknown';

  primaryAttributes: PrimaryAttribute[] = [];
  secondaryAttributes: SecondaryAttribute[] = [];

  constructor(
    context: EmberObject,
    id: string,
    gameVersion: string,
    characterPresetId: string,
    name: string
  ) {
    super(context);
    this.id = id;
    this.gameVersion = gameVersion;
    this.name = name;
    this.characterPresetId = characterPresetId;
  }

  /**
   * @returns A string that combines the character name and ID for logging purposes.
   */
  getCharacterNameAndId() {
    return `'${this.name}' (${this.id})`;
  }

  /**
   * Recalculate secondary attributes.
   */
  recalculateSecondaryAttributes() {
    for (const secondaryAttribute of this.secondaryAttributes) {
      secondaryAttribute.recalculate(this);
    }
    this.logger.info(
      `Recalculated secondary attributes of character ${this.getCharacterNameAndId()}.`,
      Character.name
    );
  }
}
