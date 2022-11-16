import Component from '@glimmer/component';

export interface Args {
  size: 'x-small' | 'small' | 'medium' | 'large' | 'max';
  align:
    | 'baseline'
    | 'center'
    | 'fle-start'
    | 'flex-end'
    | 'stretch'
    | 'inherit';
}

export default class ContainerComponent extends Component<Args> {
  declare args: Args;

  get size() {
    return this.args.size || 'medium';
  }

  get align() {
    return this.args.align || 'inherit';
  }
}
