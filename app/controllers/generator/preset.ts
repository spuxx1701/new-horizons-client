import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { DropdownOption } from 'new-horizons-client/components/common/control/dropdown';
import { GeneratorPresetRouteModel } from 'new-horizons-client/routes/generator/preset';
import GeneratorService from 'new-horizons-client/services/generator';
import LocalStorageService from 'new-horizons-client/services/local-storage';
import UtilityService from 'new-horizons-client/services/utility';

export default class GeneratorPresetController extends Controller {
  @service declare utility: UtilityService;
  declare model: GeneratorPresetRouteModel;

  @service declare localStorage: LocalStorageService;
  @service declare generator: GeneratorService;

  @tracked characterPreset = this.model.characterPresets[0];

  @action toggleTutorials() {
    this.localStorage.setTutorialsEnabled(!this.localStorage.tutorialsEnabled);
  }

  get presetOptions() {
    return this.model.characterPresets.map((characterPreset) => {
      return {
        label: this.utility.translate(characterPreset.id),
        data: characterPreset,
      } as DropdownOption;
    });
  }

  @action handlePresetSelect(option: DropdownOption) {
    this.characterPreset = option.data;
  }

  @action submit(event: Event) {
    event.preventDefault();
    console.log(this.characterPreset);
  }
}
