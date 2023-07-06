import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import TooltipService from 'new-horizons-client/services/tooltip';
import { setupRenderingTest } from 'new-horizons-client/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Service | Tooltip', function (hooks) {
  setupRenderingTest(hooks);
  test('should throw an error if tooltip container is missing', function (assert) {
    assert.throws(() => {
      this.owner.lookup('service:tooltip') as TooltipService;
    });
  });

  test('should initialize property if tooltip container is part of the DOM', async function (assert) {
    await render(hbs`<Features::Tooltip />`);
    const tooltip = this.owner.lookup('service:tooltip') as TooltipService;
    assert.ok(tooltip);
  });
});
