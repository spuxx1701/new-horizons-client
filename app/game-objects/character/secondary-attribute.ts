import GameObject from '../game-object';

export default class SecondaryAttribute extends GameObject {
  declare current: number;
  declare remaining: number;
  declare bonus: number;
  declare primaryAttributes: string[];
  declare div: number;

  constructor(init: Partial<SecondaryAttribute>) {
    super();
    Object.assign(this, init);
  }
}
