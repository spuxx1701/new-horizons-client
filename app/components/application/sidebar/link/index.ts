import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import RendererService from 'new-horizons-client/services/renderer';

export interface Args {
  route: string;
  icon: string;
  prefix?: string;
}

export default class SidebarLinkComponent extends Component<Args> {
  @service declare renderer: RendererService;

  get prefix() {
    return this.args.prefix || 'fas';
  }

  @action handleClick(event: MouseEvent) {
    this.renderer.createClickRipple(event);
  }
}
