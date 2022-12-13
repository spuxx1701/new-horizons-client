import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import RendererService from 'new-horizons-client/services/renderer';

export default class ApplicationController extends Controller {
  @service declare renderer: RendererService;
  @tracked leftSidebarExpanded = false;
  @tracked rightSidebarExpanded = false;

  get sidebarExpandedWidth(): string {
    return getComputedStyle(document.documentElement).getPropertyValue(
      '--sidebar-max-width'
    );
  }

  @action toggleLeftSidebar() {
    this.leftSidebarExpanded = !this.leftSidebarExpanded;
    const leftSidebar = document.getElementById('sidebar-left') as HTMLElement;
    this.toggleSidebar(leftSidebar, this.leftSidebarExpanded);
    this.adjustContent('left', this.leftSidebarExpanded);
  }

  @action toggleRightSidebar() {
    this.rightSidebarExpanded = !this.rightSidebarExpanded;
    const rightSidebar = document.getElementById(
      'sidebar-right'
    ) as HTMLElement;
    this.toggleSidebar(rightSidebar, this.rightSidebarExpanded);
    this.adjustContent('right', this.rightSidebarExpanded);
  }

  toggleSidebar(sidebar: HTMLElement, expanded: boolean) {
    if (expanded) {
      sidebar.style.width = this.sidebarExpandedWidth;
    } else {
      sidebar.style.width = '0px';
    }
  }

  adjustContent(side: 'left' | 'right', expanded: boolean) {
    if (expanded && this.renderer.isDesktop) {
      document.documentElement.style.setProperty(
        `--app-content-${side}`,
        this.sidebarExpandedWidth
      );
    } else if (!expanded) {
      document.documentElement.style.setProperty(
        `--app-content-${side}`,
        '0px'
      );
    }
  }
}
