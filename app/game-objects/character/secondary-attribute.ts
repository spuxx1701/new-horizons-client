import Character from './character';
import GameObject from '../game-object';
import EmberObject from '@ember/object';

export default class SecondaryAttribute extends GameObject {
  declare current: number;
  declare remaining: number;
  declare bonus: number;
  declare primaryAttributes: string[];
  declare div: number;

  constructor(context: EmberObject, init: Partial<SecondaryAttribute>) {
    super(context);
    Object.assign(this, init);
  }

  /**
   * Adds a copy of the secondary attribute to the given character.
   * @param character The character.
   */
  addToCharacter(character: Character) {
    // Check whether the character already owns this secondary attribute
    if (
      character.secondaryAttributes.find((secondaryAttribute) => {
        secondaryAttribute.id === this.id;
      })
    ) {
      throw new Error(
        `Character ${character.name} already owns secondary attribute ${this.id}.`
      );
    }
    const secondaryAttribute = new SecondaryAttribute(this, { ...this });
    character.secondaryAttributes.push(secondaryAttribute);
  }

  /**
   * Recalculates the secondary attribute's values.
   */
  recalculate(character: Character) {
    // do something
  }
}
