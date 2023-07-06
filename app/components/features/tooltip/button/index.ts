import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tooltipConfig } from 'new-horizons-client/config/tooltip.config';
import TooltipService from 'new-horizons-client/services/tooltip';
import { sleep } from 'new-horizons-client/utilities/misc.utility';

export interface Signature {
  Args: {
    title: string;
    text: string;
    article?: string;
  };
}

export default class TooltipButtonComponent extends Component<Signature> {
  @service declare tooltip: TooltipService;

  wasClicked = false;

  declare arts: Signature['Args'];

  @action handleMouseEnter(event: MouseEvent) {
    this.tooltip.isHovering = true;
    if (
      event.target &&
      this.tooltip.activeTooltip?.source !== (event.target as HTMLElement)
    ) {
      this.tooltip.show(
        event.target as HTMLElement,
        this.args.title,
        this.args.text,
        this.args.article
      );
    }
  }

  @action async handleMouseLeave(event: MouseEvent) {
    this.tooltip.isHovering = false;
    await sleep(tooltipConfig.tooltipCloseDelay);
    if (!this.tooltip.isHovering && !this.wasClicked) {
      this.tooltip.hide(event.target as HTMLElement);
    }
  }

  @action handleClick(event: MouseEvent) {
    this.wasClicked = true;
    if (!this.tooltip.isHovering) {
      this.tooltip.show(
        event.target as HTMLElement,
        this.args.title,
        this.args.text,
        this.args.article
      );
    }
  }
}
