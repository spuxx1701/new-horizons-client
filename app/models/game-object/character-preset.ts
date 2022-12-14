import { attr } from '@ember-data/model';
import GameObjectModel from '.';

export default class CharacterPresetModel extends GameObjectModel {
  @attr() declare gpBonus: number;
  @attr() declare apAvailable: number;
  @attr() declare traitsMax: number;
  @attr() declare abilitiesMax: number;
  @attr() declare ipAvailable: number;
  @attr() declare epStart: number;
  @attr() declare crStart: number;
  @attr() declare fpStart: number;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    characterPreset: CharacterPresetModel;
  }
}
