import RESTAdapter from '@ember-data/adapter/rest';
import Store from '@ember-data/store';
import Model from '@ember-data/model';

export default class GameObjectAdapter extends RESTAdapter {
  namespace = '/database/';

  urlForFindAll(modelName: any) {
    return this.namespace + modelName + '.json';
  }

  // Needs to return false to prevent reloading data
  shouldBackgroundReloadAll() {
    return false;
  }

  // Prevent Create and Update
  updateRecord(store: Store, type: Model, snapshot: any) {
    return snapshot;
  }

  createRecord(store: Store, type: Model, snapshot: any) {
    return snapshot;
  }
}
