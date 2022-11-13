import { action } from '@ember/object';
import Component from '@glimmer/component';

export interface Args {
  type?: 'button' | 'submit';
  text?: string;
  icon?: string;
  prefix?: 'fas' | 'far';
  size?: ControlSize;
  onClick?: Function;
  disabled?: boolean;
  busy?: boolean;
}

export default class CommonButtonComponent extends Component<Args> {
  declare args: Args;

  @action handleClick(event: any) {
    if (typeof this.args.onClick === 'function') {
      this.args.onClick(event);
    }
  }

  get disabled() {
    return this.args.busy || this.args.disabled;
  }

  get size() {
    return this.args.size || 'medium';
  }

  get prefix() {
    return this.args.prefix || 'fas';
  }
}
