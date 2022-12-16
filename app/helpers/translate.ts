import Helper from '@ember/component/helper';
import { service } from '@ember/service';
import UtilityService from 'new-horizons-client/services/utility';

export default class TranslateHelper extends Helper {
  @service declare utility: UtilityService;

  format(key: string, options: any) {
    return this.utility.translate(key, options);
  }
}
