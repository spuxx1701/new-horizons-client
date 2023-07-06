import UtilityService from 'new-horizons-client/services/utility';
import { setupTest } from 'new-horizons-client/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Service | Utility', function (hooks) {
  setupTest(hooks);
  let utility: UtilityService;

  hooks.beforeEach(function () {
    utility = this.owner.lookup('service:utility') as UtilityService;
  });

  test('should translate', function (assert) {
    const intl = this.owner.lookup('service:intl') as any;
    intl.setLocale('de-de');
    assert.equal(utility.translate('misc.ok'), 'OK');
    assert.equal(utility.translate('misc/ok'), 'OK');
  });
});
