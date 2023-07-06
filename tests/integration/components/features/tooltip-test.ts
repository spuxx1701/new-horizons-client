import { click, find, render, triggerEvent } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { tooltipConfig } from 'new-horizons-client/config/tooltip.config';
import { setupRenderingTest } from 'new-horizons-client/tests/helpers';
import { sleep } from 'new-horizons-client/utilities/misc.utility';
import { module, test } from 'qunit';

module('Integration | Component | Features | Tooltip', function (hooks) {
  setupRenderingTest(hooks);

  hooks.before(() => {
    // For testing purposes, set all tooltip time values to 0
    tooltipConfig.tooltipCloseDelay = 0;
    tooltipConfig.tooltipHideTime = 0;
  });

  hooks.beforeEach(async function () {
    await render(
      hbs(
        `<Features::Tooltip/> <Features::Tooltip::Button @title="Foo" @text="Bar" />`
      )
    );
  });

  test('should render the correct tooltip when clicking on the button', async function (assert) {
    assert.notOk(find('.tooltip-container'));
    await click('.tooltip-button');
    assert.ok(find('.tooltip-container'));
    assert.equal(find('h4')?.textContent, 'Foo');
    assert.equal(find('p')?.textContent, 'Bar');
  });

  test('should render the tooltip when hovering over the button', async function (assert) {
    assert.notOk(find('.tooltip-container'));
    await triggerEvent('.tooltip-button', 'mouseenter');
    assert.ok(find('.tooltip-container'));
  });

  test('tooltip should stay visible as long as mouse is on tooltip and hide when mouse leaves', async function (assert) {
    await triggerEvent('.tooltip-button', 'mouseenter');
    assert.ok(find('.tooltip-container'));
    await triggerEvent('.tooltip-container', 'mouseenter');
    // Wait a bit longer than the close delay to make sure the tooltip stays open
    await sleep(10);
    assert.ok(find('.tooltip-container'));
    await triggerEvent('.tooltip-container', 'mouseleave');
    // Wait a bit longer than the close delay to make sure that the tooltip had time to close
    await sleep(10);
    assert.notOk(find('.tooltip-container'));
  });
});
