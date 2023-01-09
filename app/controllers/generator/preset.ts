import Controller from '@ember/controller';
import { tracked } from 'tracked-built-ins';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { DropdownOption } from 'new-horizons-client/components/common/control/dropdown';
import { GeneratorPresetRouteModel } from 'new-horizons-client/routes/generator/preset';
import GeneratorService from 'new-horizons-client/services/generator';
import LocalStorageService from 'new-horizons-client/services/local-storage';
import UtilityService from 'new-horizons-client/services/utility';
import CharacterPreset from 'new-horizons-client/game-objects/character/character-preset';
import { EmberChangeset } from 'ember-changeset';
import RouterService from '@ember/routing/router-service';

export default class GeneratorPresetController extends Controller {
  @service declare router: RouterService;
  @service declare utility: UtilityService;
  declare model: GeneratorPresetRouteModel;

  @service declare localStorage: LocalStorageService;
  @service declare generator: GeneratorService;

  @tracked customize = false;

  @tracked characterPreset = {
    ...this.model.characterPresets[0],
  } as CharacterPreset;

  @tracked characterPresetChangeset: EmberChangeset = new EmberChangeset(
    this.characterPreset as CharacterPreset
  );

  @action toggleTutorials() {
    this.localStorage.setTutorialsEnabled(!this.localStorage.tutorialsEnabled);
  }

  @action handlePresetSelect(option: DropdownOption) {
    this.characterPreset = new CharacterPreset(this, option.data);
    this.characterPresetChangeset = new EmberChangeset(
      this.characterPreset as CharacterPreset
    );
  }

  @action toggleCustomize() {
    this.customize = !this.customize;
  }

  get presetOptions() {
    return this.model.characterPresets.map((characterPreset) => {
      return {
        label: this.utility.translate(characterPreset.id),
        data: characterPreset,
      } as DropdownOption;
    });
  }

  @action submit(event: Event) {
    event.preventDefault();
    // Check whether the character preset has been customized
    if (
      JSON.stringify(this.characterPreset) !==
      JSON.stringify(
        this.model.characterPresets.find(
          (element) => element.id === this.characterPreset.id
        )
      )
    ) {
      this.characterPreset.id = 'character-preset/custom';
    }
    // Start generation and navigate to origin route
    this.generator.startGeneration(this.characterPreset);
    this.router.transitionTo('generator.origin');
  }
}
