import EmberObject from '@ember/object';
import GameObject from '../game-object';

export default class CharacterPreset extends GameObject {
  declare gpBonus: number;
  declare apAvailable: number;
  declare traitsMax: number;
  declare abilitiesMax: number;
  declare ipAvailable: number;
  declare epStart: number;
  declare crStart: number;
  declare fpStart: number;

  constructor(context: EmberObject, init: Partial<CharacterPreset>) {
    super(context);
    Object.assign(this, init);
  }
}
