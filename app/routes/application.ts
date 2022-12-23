import Route from '@ember/routing/route';
import { service } from '@ember/service';
import ManagerService from 'new-horizons-client/services/manager';

export default class ApplicationRoute extends Route {
  @service declare manager: ManagerService;

  beforeModel(): void {
    this.manager.initialize();
  }
}
