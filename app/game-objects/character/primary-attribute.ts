import Character from '.';
import GameObject from '../game-object';

export default class PrimaryAttribute extends GameObject {
  declare current: number;
  declare start: number;
  declare min: number;
  declare max: number;

  constructor(init: Partial<PrimaryAttribute>) {
    super();
    Object.assign(this, init);
  }

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
    const primaryAttribute = new PrimaryAttribute({ ...this });
    character.primaryAttributes.push(primaryAttribute);
  }
}
