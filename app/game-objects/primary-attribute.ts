import GameObject from './game-object';

export default class PrimaryAttribute extends GameObject {
  declare current: number;
  declare start: number;
  declare min: number;
  declare max: number;
}
