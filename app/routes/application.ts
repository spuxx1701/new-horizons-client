import Route from '@ember/routing/route';
import { service } from '@ember/service';
import ThemeService from 'new-horizons-client/services/theme';

export default class ApplicationRoute extends Route {
  @service declare theme: ThemeService;

  beforeModel(): void {
    this.theme.initialize();
  }
}
