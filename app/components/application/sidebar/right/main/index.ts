import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import RendererService, { Theme } from 'new-horizons-client/services/renderer';

export default class SidebarRightMainComponent extends Component {
  @service declare renderer: RendererService;

  @action setThemeDefault() {
    this.renderer.setTheme(Theme.default);
  }

  @action setThemeWhite() {
    this.renderer.setTheme(Theme.white);
  }
  @action setThemeRed() {
    this.renderer.setTheme(Theme.red);
  }
}
