import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import * as bootstrap from 'bootstrap';
import UtilityService from './utility';

export interface Tooltip {
  source: HTMLElement;
  title: string;
  text: string;
  article?: string;
}

export const TOOLTIP_CLOSE_DELAY = 500;

export default class TooltipService extends Service {
  @service declare utility: UtilityService;

  @tracked activeTooltip: Tooltip | undefined;
  @tracked isHovering = false;
  @tracked isClicked = false;

  tooltipElement: HTMLElement;
  tooltip: bootstrap.Tooltip;
  root: HTMLElement;

  constructor() {
    // eslint-disable-next-line prefer-rest-params
    super(...arguments);
    this.tooltipElement = document.getElementById('tooltip') as HTMLElement;
    if (!this.tooltipElement) {
      throw new Error(
        'Unable to find tooltip container. Tooltips will not function.'
      );
    }
    this.tooltip = new bootstrap.Tooltip(this.tooltipElement, {});
    this.root = document.querySelector(':root') as HTMLElement;
    // Clicks anywhere outside the tooltip will close the tooltip
    document.addEventListener('click', (event: MouseEvent) => {
      if (!(event.target as HTMLElement).dataset['tooltip']) {
        this.forceHide();
      }
    });
  }

  @action show(
    element: HTMLElement,
    title: string,
    text: string,
    article?: string
  ) {
    this.root.style.setProperty('--tooltip-opacity', '1');
    this.positionAtElement(element);
    this.activeTooltip = { source: element, title, text, article };
    this.tooltip.show();
  }

  positionAtElement(element: HTMLElement) {
    const elementRect = element.getBoundingClientRect();
    const top = elementRect.top;
    const left = elementRect.left;
    this.root.style.setProperty('--tooltip-top', `calc(${top}px + 2rem)`);
    this.root.style.setProperty('--tooltip-left', `calc(${left}px + 2rem)`);
  }

  @action async hide(element: HTMLElement) {
    if (element === this.activeTooltip?.source) {
      this.forceHide();
    }
  }

  async forceHide() {
    this.root.style.setProperty('--tooltip-opacity', '0');
    await this.utility.sleep(200);
    this.tooltip.hide();
    this.activeTooltip = undefined;
  }
}
