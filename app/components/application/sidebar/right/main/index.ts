import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import RendererService, { Theme } from 'new-horizons-client/services/renderer';

export default class SidebarRightMainComponent extends Component {
  @service declare renderer: RendererService;

  @action setThemeDefault() {
    this.renderer.currentTheme = Theme.default;
  }

  @action setThemeWhite() {
    this.renderer.currentTheme = Theme.white;
  }
  @action setThemeRed() {
    this.renderer.currentTheme = Theme.red;
  }
}
