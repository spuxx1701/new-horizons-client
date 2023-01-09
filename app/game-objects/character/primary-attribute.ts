import Character from './character';
import GameObject from '../game-object';
import EmberObject from '@ember/object';
import { service } from '@ember/service';
import LoggerService from 'new-horizons-client/services/logger';

export default class PrimaryAttribute extends GameObject {
  @service declare logger: LoggerService;

  declare current: number;
  declare start: number;
  declare min: number;
  declare max: number;

  constructor(context: EmberObject, init: Partial<PrimaryAttribute>) {
    super(context);
    Object.assign(this, init);
  }

  /**
   * Adds a copy of the primary attribute to the given character.
   * @param character The character.
   */
  addToCharacter(character: Character) {
    // Check whether the character already owns this primary attribute
    if (
      character.primaryAttributes.find((primaryAttribute) => {
        primaryAttribute.id === this.id;
      })
    ) {
      throw new Error(
        `Character ${character.name} already owns primary attribute ${this.id}.`
      );
    }
    const primaryAttribute = new PrimaryAttribute(this, { ...this });
    character.primaryAttributes.push(primaryAttribute);
  }
}
