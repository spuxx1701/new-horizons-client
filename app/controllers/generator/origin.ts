import Controller from '@ember/controller';
import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { DropdownOption } from 'new-horizons-client/components/common/control/dropdown';
import Origin from 'new-horizons-client/game-objects/character/origin';
import { GeneratorOriginRouteModel } from 'new-horizons-client/routes/generator/origin';
import GeneratorService from 'new-horizons-client/services/generator';
import UtilityService from 'new-horizons-client/services/utility';

export default class GeneratorOriginController extends Controller {
  @service declare utility: UtilityService;
  @service declare generator: GeneratorService;
  @service declare router: RouterService;

  @tracked selectedOrigin = { ...this.model.origins[0] } as Origin;

  declare model: GeneratorOriginRouteModel;

  get originOptions() {
    return this.model.origins.map((origin) => {
      return {
        label: this.utility.translate(origin.id),
        data: origin,
      } as DropdownOption;
    });
  }

  @action handleOriginSelect(option: DropdownOption) {
    this.selectedOrigin = { ...option.data } as Origin;
  }

  @action submit() {
    this.generator.setOrigin(this.selectedOrigin);
  }
}
