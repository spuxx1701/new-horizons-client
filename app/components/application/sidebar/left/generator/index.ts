import { service } from '@ember/service';
import Component from '@glimmer/component';
import GeneratorService from 'new-horizons-client/services/generator';

export default class LeftSidebarGeneratorComponent extends Component {
  @service declare generator: GeneratorService;

  get originButtonVisible() {
    return this.generator.state !== 'preset';
  }

  get postOriginButtonsVisible() {
    return this.generator.state === 'post-origin';
  }
}
