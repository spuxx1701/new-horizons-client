import { DEFAULT_SETTINGS } from 'new-horizons-client/config/settings.config';
import { Theme } from 'new-horizons-client/services/renderer';
import SettingsService, {
  Settings,
} from 'new-horizons-client/services/settings';
import { setupTest } from 'new-horizons-client/tests/helpers';
import { module, test } from 'qunit';
import sinon from 'sinon';

module('Unit | Service | Settings', function (hooks) {
  setupTest(hooks);
  let settings: SettingsService;

  hooks.beforeEach(function () {
    settings = this.owner.lookup('service:settings') as SettingsService;
  });

  test('should initialize using the default settings', (assert) => {
    const stub = sinon.stub(Storage.prototype, 'getItem');
    stub.returns(null);
    const actual = settings.settings;
    assert.deepEqual(actual, DEFAULT_SETTINGS);
  });

  test('should load stored settings', (assert) => {
    const stub = sinon.stub(Storage.prototype, 'getItem');
    const expected: Settings = {
      ...DEFAULT_SETTINGS,
      theme: Theme.red,
      debug: true,
      tutorials: true,
    };
    stub.returns(JSON.stringify(expected));
    settings.reload();
    const actual = settings.settings;
    assert.deepEqual(actual, expected);
  });

  test('should return a specific setting value', (assert) => {
    settings.update({ debug: true });
    assert.equal(settings.getValue('debug'), true);
  });

  test('should update and save the settings', (assert) => {
    const stub = sinon.spy(Storage.prototype, 'setItem');
    const expected: Settings = {
      ...DEFAULT_SETTINGS,
      debug: true,
    };
    settings.update(
      {
        debug: true,
      },
      {
        save: true,
      }
    );
    assert.deepEqual(settings.settings, expected);
    assert.ok(stub.called);
  });

  test('should save the current settings to localStorage', (assert) => {
    const spy = sinon.spy(Storage.prototype, 'setItem');
    settings.save();
    assert.ok(spy.calledOnce);
  });
});
