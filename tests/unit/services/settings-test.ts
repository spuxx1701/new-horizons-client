import { DEFAULT_SETTINGS } from 'new-horizons-client/config/settings.config';
import SettingsService from 'new-horizons-client/services/settings';
import { setupTest } from 'new-horizons-client/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Service | Settings', function (hooks) {
  setupTest(hooks);
  let service: SettingsService;

  hooks.beforeEach(function () {
    service = this.owner.lookup('service:settings') as SettingsService;
  });

  test('should initialize using the default settings', async function (assert) {
    const actual = service.settings;
    assert.deepEqual(actual, DEFAULT_SETTINGS);
  });
});
