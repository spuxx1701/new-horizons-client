import Helper from '@ember/component/helper';
import { service } from '@ember/service';
import CustomIntl from 'new-horizons-client/services/custom-intl';

export default class TranslateHelper extends Helper {
  @service declare intl: CustomIntl;

  compute([key]: string[], options: any) {
    return this.intl.translate(key as string, options);
  }
}
