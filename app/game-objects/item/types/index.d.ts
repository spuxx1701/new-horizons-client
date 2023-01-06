import { Damage } from 'new-horizons-client/game-objects/types';

export type WeightModifier = 'backpack' | 'clothing' | 'storage' | null;

export type Durability = {
  max: number;
  current: number;
  functionalThreshold: number;
  complexity: number;
};

export type RadMod = {
  reaction: number;
  attack: number;
  defense: number;
};

export type MeleeCombat = {
  damage: Damage;
  radMod: RadMod;
  isImprovised: boolean;
};

export type RangedWeaponType = string;
export type Caliber = string;
export type LoadType = 'load-type/clip' | 'load-type/barrel';
export type AmmunitionType = string;

export type WeaponRange = {
  maxUnits: number;
  damageMod: number;
};

export type RapidFireMod = {
  startAtShot: number;
  mod: number;
};

export type Ammunition = {
  caliber: Caliber;
  ammoType: AmmunitionType;
};

export type Consumable = {
  uses: number;
  maxUses: number;
};

export type RangedCombat = {
  type: RangedWeaponType;
  caliber: Caliber;
  loadType: LoadType;
  clipSize: number;
  damage: Damage;
  radMod: RadMod;
  ranges: WeaponRange[];
  hasRapidFire: boolean;
  rapidFireMod: RapidFireMod;
  hasSecondFireMode: boolean;
  altFireMode: RangedCombat | null;
};

export type ArmorBodySlot = string;

export type Armor = {
  bodySlot: ArmorBodySlot;
  armorScorePhysical: number;
  armorScoreEnergy: number;
  constraint: number;
};
