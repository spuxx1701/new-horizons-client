import { action } from '@ember/object';
import Component from '@glimmer/component';

export interface Signature {
  Args: {
    icon: string;
    type: ModalType;
  };
}

export default class ModalHeaderComponent extends Component<Signature> {
  declare args: Signature['Args'];

  get type() {
    return this.args.type || 'default';
  }

  get icon() {
    return this.args.icon || 'circle-info';
  }

  @action handleClose() {
    // do something
  }
}
