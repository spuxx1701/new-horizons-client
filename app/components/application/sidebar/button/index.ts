import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Component from '@glimmer/component';

export interface Args {
  text: string;
  icon: string;
  prefix?: 'far' | 'fas';
  onClick?: Function;
  disabled?: boolean;
  busy?: boolean;
}

export default class SidebarButtonComponent extends Component<Args> {
  @service declare router: RouterService;
  declare args: Args;

  get disabled() {
    return this.args.busy || this.args.disabled;
  }

  get prefix() {
    return this.args.prefix || 'fas';
  }

  @action handleClick(event: any) {
    if (typeof this.args.onClick === 'function') {
      this.args.onClick(event);
    }
  }
}
