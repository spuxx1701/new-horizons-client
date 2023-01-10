import Component from '@glimmer/component';

export interface Signature {
  Args: {
    text: string;
    icon?: string;
    design?: 'primary' | 'secondary';
  };
}

export default class ModalFooterButton extends Component<Signature> {
  declare args: Signature['Args'];

  get design() {
    return this.args.design || 'primary';
  }
}
