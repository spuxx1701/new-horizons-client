import GameObject from '../game-object';
import {
  AppBaseAbility,
  AppBaseSkill,
  Option,
  Requirement,
  Target,
} from './types';

export default class Ability extends GameObject {
  declare baseAbility: AppBaseAbility;
  declare baseSkill: AppBaseSkill;
  declare editorOnly: boolean;
  declare requirements: Requirement[];
  declare needsInput: boolean;
  declare input: string;
  declare isSpecialisation: boolean;
  declare options: Option[];
  declare isActive: boolean;
  declare castTime: number;
  declare staminaUse: number;
  declare usesPower: boolean;
  declare powerUse: number;
  declare costs: number;
  declare targets: Target[];

  constructor(init: Partial<Ability>) {
    super();
    Object.assign(this, init);
  }
}
