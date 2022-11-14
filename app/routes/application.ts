import Route from '@ember/routing/route';
import { service } from '@ember/service';
import RendererService from 'new-horizons-client/services/renderer';

export default class ApplicationRoute extends Route {
  @service declare renderer: RendererService;

  beforeModel(): void {
    this.renderer.initialize();
  }
}
