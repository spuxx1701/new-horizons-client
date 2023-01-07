import GameObject from '../game-object';

export default class Specialisation extends GameObject {
  declare skill: string;

  constructor(init: Partial<Specialisation>) {
    super();
    Object.assign(this, init);
  }
}
