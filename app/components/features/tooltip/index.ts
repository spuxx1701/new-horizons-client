import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tooltipConfig } from 'new-horizons-client/config/tooltip.config';
import TooltipService from 'new-horizons-client/services/tooltip';
import { sleep } from 'new-horizons-client/utilities/misc.utility';

export default class TooltipComponent extends Component {
  @service declare tooltip: TooltipService;

  get activeTooltip() {
    return this.tooltip.activeTooltip;
  }

  @action handleMouseEnter() {
    this.tooltip.isHovering = true;
  }

  @action async handleMouseLeave() {
    this.tooltip.isHovering = false;
    await sleep(tooltipConfig.tooltipCloseDelay);
    if (!this.tooltip.isHovering) {
      this.tooltip.forceHide();
    }
  }
}
