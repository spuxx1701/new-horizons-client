import Service, { service } from '@ember/service';
import { v4 as uuiv4 } from 'uuid';
// import { TOptions } from 'ember-intl/services/intl';

export default class UtilityService extends Service {
  @service declare intl: any;

  async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // TODO: Temporaroly don't include type information since ember-intl has type errors:
  // https://github.com/ember-intl/ember-intl/issues/1732
  translate(key: string, options?: any) {
    return this.intl.t(key.replaceAll('/', '.'), options) as string;
  }

  getUuid() {
    return uuiv4();
  }
}
