import LoggerService from 'new-horizons-client/services/logger';
import SettingsService from 'new-horizons-client/services/settings';
import { setupTest } from 'new-horizons-client/tests/helpers';
import { module, test } from 'qunit';
import sinon from 'sinon';

module('Unit | Service | Settings', function (hooks) {
  setupTest(hooks);
  let logger: LoggerService;
  let settings: SettingsService;

  hooks.beforeEach(function () {
    logger = this.owner.lookup('service:logger') as LoggerService;
    settings = this.owner.lookup('service:settings') as SettingsService;
  });

  hooks.afterEach(function () {
    settings.reload();
    sinon.restore();
  });

  test('should not log a debug message when debug mode is disabled', function (assert) {
    settings.update({ debug: false });
    logger.debug('foo');
    assert.equal(logger.messages.length, 0);
  });

  test('should log a debug message when debug mode is enabled', function (assert) {
    const spy = sinon.spy(console, 'debug');
    settings.update({ debug: true });
    logger.debug('foo');
    assert.equal(logger.messages.length, 1);
    assert.equal(spy.getCalls().length, 1);
  });

  test('should log an info message', function (assert) {
    const spy = sinon.spy(console, 'log');
    settings.update({ debug: true });
    logger.info('foo', 'SomeContext');
    assert.equal(logger.messages.length, 1);
    assert.equal(logger.messages[0]?.text, 'foo');
    assert.equal(logger.messages[0]?.type, 'info');
    assert.equal(logger.messages[0]?.context, 'SomeContext');
    assert.equal(spy.getCalls().length, 1);
  });

  test('should not print the info message to console when debug mode is disabled', function (assert) {
    const spy = sinon.spy(console, 'log');
    settings.update({ debug: false });
    logger.info('foo');
    assert.equal(logger.messages.length, 1);
    assert.equal(spy.getCalls().length, 0);
  });

  test('should log a success message', function (assert) {
    const spy = sinon.spy(console, 'log');
    settings.update({ debug: true });
    logger.success('foo');
    assert.equal(logger.messages.length, 1);
    assert.equal(logger.messages[0]?.type, 'success');
    assert.equal(spy.getCalls().length, 1);
  });

  test('should log a warning message', function (assert) {
    const spy = sinon.spy(console, 'warn');
    settings.update({ debug: true });
    logger.warning('foo');
    assert.equal(logger.messages.length, 1);
    assert.equal(logger.messages[0]?.type, 'warning');
    assert.equal(spy.getCalls().length, 1);
  });

  test('should log an error message', function (assert) {
    const spy = sinon.spy(console, 'error');
    settings.update({ debug: true });
    logger.error('foo');
    assert.equal(logger.messages.length, 1);
    assert.equal(logger.messages[0]?.type, 'error');
    assert.equal(spy.getCalls().length, 1);
  });
});
