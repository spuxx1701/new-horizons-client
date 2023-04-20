import GeneratorOriginController from 'new-horizons-client/controllers/generator/origin';
import { module, test } from 'qunit';
import { setupTest } from 'new-horizons-client/tests/helpers/index';
import DatabaseService from 'new-horizons-client/services/database';
import { DropdownOption } from 'new-horizons-client/components/common/control/dropdown';
import Origin from 'new-horizons-client/game-objects/character/origin';

module('Unit | Controller | Generator | Origin', function (hooks) {
  setupTest(hooks);
  let controller: GeneratorOriginController;
  let database: DatabaseService;

  // hooks.beforeEach(async function (this) {
  //   database = this.owner.lookup('service:database') as DatabaseService;
  //   controller = this.owner.lookup(
  //     'controller:generator.origin'
  //   ) as GeneratorOriginController;
  //   const origins = await database.getOrigins();
  //   controller.model = {
  //     origins,
  //     selectedOrigin: origins[0] as Origin,
  //   };
  // });

  // test('Should properly update all states after selecting a specific origin.', async function (assert) {
  //   const originOption = controller.originOptions.find(
  //     (element) => element.data.id === 'origin/europa'
  //   ) as DropdownOption;
  //   controller.handleOriginSelect(originOption);
  //   const expected = {};
  //   // const result = controller.getSkillOptions();
  //   // assert.strictEqual(result, expected);
  // });
});
