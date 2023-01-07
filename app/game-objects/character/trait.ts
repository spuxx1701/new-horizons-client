import GameObject from '../game-object';
import { Option, Requirement, Restriction, Target } from './types';

export default class Trait extends GameObject {
  declare costs: number;
  declare hasLevel: boolean;
  declare level: number;
  declare minLevel: number;
  declare maxLevel: number;
  declare hasOptions: boolean;
  declare selectedOption: Option;
  declare options: Option[];
  declare needsInput: boolean;
  declare input: string;
  declare targets: Target[];
  declare requirements: Requirement[];
  declare restrictions: Restriction[];

  constructor(init: Partial<Trait>) {
    super();
    Object.assign(this, init);
  }
}
