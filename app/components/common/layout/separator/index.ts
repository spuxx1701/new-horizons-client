import Component from '@glimmer/component';

export interface Args {
  style: 'transparent' | 'line';
}

export default class SeparatorComponent extends Component<Args> {
  get style() {
    return this.args.style || 'transparent';
  }
}
