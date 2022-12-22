import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import TooltipService from 'new-horizons-client/services/tooltip';
import UtilityService from 'new-horizons-client/services/utility';

export default class TooltipComponent extends Component {
  @service declare utility: UtilityService;
  @service declare tooltip: TooltipService;

  @action handleMouseEnter() {
    this.tooltip.isHovering = true;
  }

  @action async handleMouseLeave(event: MouseEvent) {
    this.tooltip.isHovering = false;
    await this.utility.sleep(1000);
    if (!this.tooltip.isHovering) {
      this.tooltip.hide(event.target as HTMLElement);
    }
  }
}
