import GameObject from '../game-object';

export default class AppCategory extends GameObject {
  declare baseSkill: string;

  constructor(init: Partial<AppCategory>) {
    super();
    Object.assign(this, init);
  }
}
