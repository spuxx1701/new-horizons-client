import GameObject from '../game-object';
import {
  Ammunition,
  Consumable,
  Durability,
  MeleeCombat,
  RangedCombat,
  WeightModifier,
} from './types';

export default class Item extends GameObject {
  declare guid: string;
  declare name: string;
  declare itemCategory: string;
  declare itemType: string;
  declare value: number;
  declare weight: number;
  declare carriedWhere: string;
  declare weightModifier: WeightModifier;
  declare isCustom: boolean;
  declare durability: Durability;
  declare meleeCombat: MeleeCombat | null;
  declare rangedCombat: RangedCombat | null;
  declare ammo: Ammunition | null;
  declare armor: Armor | null;
  declare consumable: Consumable | null;
  declare valuePerWeight: number | null;

  constructor(init: Partial<Item>) {
    super();
    Object.assign(this, init);
  }
}
