import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import RendererService from 'new-horizons-client/services/renderer';

export interface ButtonSignature {
  Args: {
    type?: 'button' | 'submit';
    class?: string;
    text?: string;
    icon?: string;
    prefix?: 'fas' | 'far';
    size?: ControlSize;
    onClick?: Function;
    disabled?: boolean;
    busy?: boolean;
    ripple?: boolean;
  };
}

export default class CommonButtonComponent extends Component<ButtonSignature> {
  @service declare renderer: RendererService;

  declare args: ButtonSignature['Args'];

  @action handleClick(event: Event) {
    if (this.ripple && event.currentTarget) {
      this.renderer.createClickRipple(event as MouseEvent);
    }
    if (typeof this.args.onClick === 'function') {
      this.args.onClick(event);
    }
  }

  get class() {
    return this.args.class || '';
  }

  get ripple() {
    return this.args.ripple || true;
  }

  get disabled() {
    return this.args.busy || this.args.disabled;
  }

  get prefix() {
    return this.args.prefix || 'fas';
  }

  get size(): ControlSize {
    return this.args.size || 'large';
  }
}
