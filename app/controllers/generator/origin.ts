import Controller from '@ember/controller';
import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import { DropdownOption } from 'new-horizons-client/components/common/control/dropdown';
import Origin from 'new-horizons-client/game-objects/character/origin';
import { GeneratorOriginRouteModel } from 'new-horizons-client/routes/generator/origin';
import GeneratorService from 'new-horizons-client/services/generator';
import ModalService from 'new-horizons-client/services/modal';
import UtilityService from 'new-horizons-client/services/utility';

export default class GeneratorOriginController extends Controller {
  @service declare utility: UtilityService;
  @service declare generator: GeneratorService;
  @service declare router: RouterService;
  @service declare modal: ModalService;

  declare model: GeneratorOriginRouteModel;

  get originOptions() {
    return this.model.origins.map((origin) => {
      return {
        label: this.utility.translate(origin.id),
        data: origin,
      } as DropdownOption;
    });
  }

  get selectedOrigin() {
    return this.model.origins.find(
      (origin) => origin.id === this.generator.selectedOriginId
    ) as Origin;
  }

  get selectedOriginOptionIndex() {
    return this.originOptions.findIndex(
      (option) => option.data.id === this.generator.selectedOriginId
    );
  }

  /**
   * Returns all available skill options for the currently selected origin.
   * @returns The available skill options.
   */
  get skillOptions(): { options: DropdownOption[] }[] {
    const skillOptions: { options: DropdownOption[] }[] = [];
    this.selectedOrigin.skillOptions.forEach((skillOption, index) => {
      skillOptions.push({
        options: skillOption.options.map((value) => {
          return {
            label: `${this.utility.translate(value)} +${skillOption.level}`,
            data: { id: value, index, level: skillOption.level },
          } as DropdownOption;
        }),
      });
    });
    return skillOptions;
  }

  @action handleOriginSelect(option: DropdownOption) {
    this.generator.selectedOriginId = option.data.id;
    this.generator.selectedOriginSkillOptions = (
      option.data as Origin
    ).getSkillOptionDefaults();
  }

  @action handleSkillOptionSelect(option: DropdownOption) {
    this.generator.selectedOriginSkillOptions[option.data.index] = {
      id: option.data.id,
      level: option.data.level,
    };
  }

  @action handleSubmit() {
    this.modal.confirm({
      title: this.utility.translate(
        'generator.origin.modal.submit-origin.title'
      ),
      content: `<p>${this.utility.translate(
        'generator.origin.modal.submit-origin.text'
      )}</p>`,
      onSubmit: this.submit,
    });
  }

  @action submit() {
    this.generator.setOrigin(
      this.selectedOrigin as Origin,
      this.generator.selectedMotherTongue as string,
      this.generator.selectedOriginSkillOptions
    );
    this.modal.close();
    console.log(this.generator.character);
  }
}
