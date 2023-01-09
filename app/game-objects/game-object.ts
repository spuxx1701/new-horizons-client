import { getOwner, setOwner } from '@ember/application';
import EmberObject from '@ember/object';

export default class GameObject extends EmberObject {
  id = '';

  constructor(context: EmberObject) {
    super();
    setOwner(this, getOwner(context));
  }
}
