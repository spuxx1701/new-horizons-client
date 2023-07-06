import { action } from '@ember/object';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import * as bootstrap from 'bootstrap';
import { tooltipConfig } from 'new-horizons-client/config/tooltip.config';
import { sleep } from 'new-horizons-client/utilities/misc.utility';

export interface Tooltip {
  source: HTMLElement;
  title: string;
  text: string;
  article?: string;
}

/**
 * `TooltipService` allows and controls the rendering of tooltips.
 */
export default class TooltipService extends Service {
  @tracked activeTooltip: Tooltip | undefined;
  @tracked isHovering = false;
  @tracked isClicked = false;

  tooltipElement: HTMLElement;
  tooltip: bootstrap.Tooltip;
  root: HTMLElement;

  constructor(properties?: object | undefined) {
    super(properties);
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

  /**
   * Shows the tooltip near the given element.
   * @param element The element that serves as the anchor for the tooltip.
   * @param title The tooltip title.
   * @param text The tooltip text.
   * @param article (optional) The Stellarpedia article the tooltip should link to.
   */
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

  /**
   * Positions the tooltip at the given element.
   * @param element The element.
   */
  private positionAtElement(element: HTMLElement) {
    const elementRect = element.getBoundingClientRect();
    const top = elementRect.top;
    const bottom = window.innerHeight - elementRect.bottom;
    const left = elementRect.left;
    const right = window.innerWidth - elementRect.right;
    // Position the tooltip depending on the element's location within the viewport
    // so that the tooltip is less likely to reach outside of the viewport
    if (top <= window.innerHeight * 0.6) {
      this.root.style.setProperty('--tooltip-top', `calc(${top}px + 2rem)`);
      this.root.style.setProperty('--tooltip-bottom', 'auto');
    } else {
      this.root.style.setProperty('--tooltip-top', 'auto');
      this.root.style.setProperty(
        '--tooltip-bottom',
        `calc(${bottom}px + 2rem)`
      );
    }
    if (left <= window.innerWidth * 0.6) {
      this.root.style.setProperty('--tooltip-left', `${left}px`);
      this.root.style.setProperty('--tooltip-right', `auto`);
    } else {
      this.root.style.setProperty('--tooltip-left', `auto`);
      this.root.style.setProperty('--tooltip-right', `${right}px`);
    }
  }

  /**
   * Hides the tooltip if the given element is the current tooltip's
   * anchor element.
   * @param element The tooltip's anchor element.
   */
  @action async hide(element: HTMLElement) {
    if (element === this.activeTooltip?.source) {
      this.forceHide();
    }
  }

  /**
   * Forcefully hides the tooltip.
   */
  async forceHide() {
    this.root.style.setProperty('--tooltip-opacity', '0');
    await sleep(tooltipConfig.tooltipHideTime);
    this.tooltip.hide();
    this.activeTooltip = undefined;
  }
}
