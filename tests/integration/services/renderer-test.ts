import { click, find, findAll, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import RendererService, { Theme } from 'new-horizons-client/services/renderer';
import { setupRenderingTest } from 'new-horizons-client/tests/helpers';
import { sleep } from 'new-horizons-client/utilities/misc.utility';
import { module, test } from 'qunit';
import Sinon from 'sinon';

module('Integration | Service | Renderer', function (hooks) {
  setupRenderingTest(hooks);
  let renderer: RendererService;

  hooks.beforeEach(function () {
    renderer = this.owner.lookup('service:renderer') as RendererService;
  });

  hooks.afterEach(() => {
    Sinon.reset();
  });

  test('should initialize with the default theme', (assert) => {
    // Stub localStorage so it doesn't return a value
    Sinon.stub(Storage.prototype, 'getItem');
    renderer.initialize();
    assert.ok(renderer);
    assert.equal(document.documentElement.className, 'theme-default');
  });

  test('should update the current theme', (assert) => {
    // Stub localStorage so it doesn't save the value
    Sinon.stub(Storage.prototype, 'setItem');
    renderer.setTheme(Theme.white);
    assert.equal(document.documentElement.className, 'theme-white');
  });

  test('should return true if viewport width is greater than desktop breakpoint', (assert) => {
    Sinon.stub(window, 'innerWidth').value(1920);
    Sinon.stub(window.document.documentElement, 'clientWidth').value(1920);
    assert.true(renderer.isDesktop);
  });

  test('should return false if viewport width is less than desktop breakpoint', (assert) => {
    Sinon.stub(window, 'innerWidth').value(500);
    Sinon.stub(window.document.documentElement, 'clientWidth').value(500);
    assert.false(renderer.isDesktop);
  });

  test('should create a ripple effect on the button', async (assert) => {
    await render(hbs(`<Common::Control::Button text="foo"/>`));
    assert.notOk(find('.click-ripple'));
    click('button');
    await sleep(10);
    assert.ok(find('.click-ripple'));
  });

  test('should never create more than one ripple', async (assert) => {
    await render(hbs(`<Common::Control::Button text="foo"/>`));
    assert.notOk(find('.click-ripple'));
    click('button');
    await sleep(10);
    click('button');
    await sleep(10);
    const ripples = findAll('.click-ripple');
    assert.equal(ripples.length, 1);
  });
});
