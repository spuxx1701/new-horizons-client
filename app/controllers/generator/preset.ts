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
import ModalService from 'new-horizons-client/services/modal';

export default class GeneratorPresetController extends Controller {
  @service declare router: RouterService;
  @service declare utility: UtilityService;
  @service declare modal: ModalService;
  @service declare intl: any;
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

  @action handleSubmit(event: Event) {
    event.preventDefault();
    // Check whether a character is currently being generated and warn
    // the user that their progress may be lost.
    if (this.generator.character) {
      this.modal.confirm({
        icon: 'triangle-exclamation',
        type: 'warning',
        title: this.intl.t(
          'generator.preset.modal.generation-in-progress.title'
        ),
        content: `<p>${this.intl.t(
          'generator.preset.modal.generation-in-progress.text'
        )}</p>`,
        onSubmit: this.submit,
      });
    } else {
      this.submit();
    }
  }

  @action async submit() {
    this.modal.close();
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
    await this.generator.startGeneration(this.characterPreset);
    this.router.transitionTo('generator.origin');
  }
}
