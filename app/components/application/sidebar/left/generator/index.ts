import { service } from '@ember/service';
import Component from '@glimmer/component';
import GeneratorService from 'new-horizons-client/services/generator';

export default class LeftSidebarGeneratorComponent extends Component {
  @service declare generator: GeneratorService;

  get originButtonDisabled() {
    return this.generator.state === 'preset';
  }

  get postOriginButtonDisabled() {
    return this.generator.state !== 'post-origin';
  }
}
