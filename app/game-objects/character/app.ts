import EmberObject from '@ember/object';
import GameObject from '../game-object';
import { Requirement } from './types';

export default class App extends GameObject {
  declare appCategory: string;
  declare factor: number;
  declare current: number;
  declare min: number;
  declare max: number;
  declare requirements: Requirement[];

  constructor(context: EmberObject, init: Partial<App>) {
    super(context);
    Object.assign(this, init);
  }
}
