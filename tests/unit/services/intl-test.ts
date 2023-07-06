import CustomIntl from 'new-horizons-client/services/custom-intl';
import { setupTest } from 'new-horizons-client/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Service | Utility', function (hooks) {
  setupTest(hooks);
  let intl: CustomIntl;

  hooks.beforeEach(function () {
    intl = this.owner.lookup('service:utility') as CustomIntl;
  });

  test('should translate', function (assert) {
    const intl = this.owner.lookup('service:intl') as any;
    intl.setLocale('de-de');
    assert.equal(intl.translate('misc.ok'), 'OK');
    assert.equal(intl.translate('misc/ok'), 'OK');
  });
});
