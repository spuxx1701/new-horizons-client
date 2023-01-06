import GameObject from '../game-object';

export default class AbilityCategory extends GameObject {
  constructor(init: Partial<AbilityCategory>) {
    super();
    Object.assign(this, init);
  }
}
