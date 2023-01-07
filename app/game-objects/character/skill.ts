import GameObject from '../game-object';
import { SkillCategory } from './types';

export default class Skill extends GameObject {
  declare skillCategory: SkillCategory;
  declare factor: number;
  declare constraint: number;
  declare current: number;
  declare min: number;
  declare max: number;
  declare primaryAttributes: string[];
  declare hasSpecialisations: boolean;
  declare isBasic: boolean;
  declare baseValue: number;

  constructor(init: Partial<Skill>) {
    super();
    Object.assign(this, init);
  }
}
