import EmberObject from '@ember/object';
import GameObject from '../game-object';

export default class Specialisation extends GameObject {
  declare skill: string;

  constructor(context: EmberObject, init: Partial<Specialisation>) {
    super(context);
    Object.assign(this, init);
  }
}
