import GameObject from './game-object';

export default class Skill extends GameObject {
  declare skillCategory: string;
  declare factor: number;
  declare constraint: number;
  declare current: number;
  declare min: number;
  declare max: number;
  declare primaryAttributes: string[];
  declare hasSpecialisations: boolean;
  declare isBasic: boolean;
  declare baseValue: number;
}
