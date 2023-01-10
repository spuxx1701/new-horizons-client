import Component from '@glimmer/component';

export interface Signature {
  Args: {
    style: 'transparent' | 'line';
  };
}

export default class SeparatorComponent extends Component<Signature> {
  declare args: Signature['Args'];

  get style() {
    return this.args.style || 'transparent';
  }
}
