import { setupTest } from 'new-horizons-client/tests/helpers';
import { getUuid, sleep } from 'new-horizons-client/utilities/misc.utility';
import { module, test } from 'qunit';

module('Unit | Utilities | Misc', function (hooks) {
  setupTest(hooks);
  test('should return a promise that resolves after the given amount of miliseconds', async (assert) => {
    const ms = 100;
    await sleep(ms);
    assert.step('promise has resolved');
    assert.verifySteps(['promise has resolved']);
  });

  test('should return a valid UUID', (assert) => {
    const pattern = new RegExp(
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    );
    const actual = getUuid();
    assert.equal(actual.match(pattern)?.length, 1);
  });
});
