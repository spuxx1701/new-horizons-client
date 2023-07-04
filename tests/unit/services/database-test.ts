import DatabaseService from 'new-horizons-client/services/database';
import { setupTest } from 'new-horizons-client/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Service | Database', function (hooks) {
  setupTest(hooks);
  let service: DatabaseService;

  hooks.beforeEach(function () {
    service = this.owner.lookup('service:database') as DatabaseService;
  });

  test('should load all abilities', async function (assert) {
    const collection = await service.getAbilities();
    assert.ok(collection.length);
  });

  test('should load all apps', async function (assert) {
    const collection = await service.getApps();
    assert.ok(collection.length);
  });

  test('should load all character presets', async function (assert) {
    const collection = await service.getCharacterPresets();
    assert.ok(collection.length);
  });

  test('should load all items', async function (assert) {
    const collection = await service.getItems();
    assert.ok(collection.length);
  });

  test('should load all origins', async function (assert) {
    const collection = await service.getOrigins();
    assert.ok(collection.length);
  });

  test('should load all primary attributes', async function (assert) {
    const collection = await service.getPrimaryAttributes();
    assert.ok(collection.length);
  });

  test('should load all secondary attributes', async function (assert) {
    const collection = await service.getSecondaryAttributes();
    assert.ok(collection.length);
  });

  test('should load all skills', async function (assert) {
    const collection = await service.getSkills();
    assert.ok(collection.length);
  });

  test('should load all specialisations', async function (assert) {
    const collection = await service.getSpecialisations();
    assert.ok(collection.length);
  });

  test('should load all traits', async function (assert) {
    const collection = await service.getTraits();
    assert.ok(collection.length);
  });

  test('should reject the promise when failing to load a collection', async function (assert) {
    assert.rejects(service.getRawCollection('foo' as any));
  });
});
