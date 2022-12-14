import Store from '@ember-data/store';
import Service, { service } from '@ember/service';

export const CONSTANTS = {};

export default class DatabaseService extends Service {
  @service declare store: Store;
}
