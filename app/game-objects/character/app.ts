import GameObject from '../game-object';
import { Requirement } from './types';

export default class App extends GameObject {
  declare appCategory: string;
  declare factor: number;
  declare current: number;
  declare min: number;
  declare max: number;
  declare requirements: Requirement[];

  constructor(init: Partial<App>) {
    super();
    Object.assign(this, init);
  }
}
