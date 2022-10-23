import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @tracked leftSidebarExpanded = false;

  get sidebarExpandedWidth(): string {
    return getComputedStyle(document.documentElement).getPropertyValue(
      '--sidebar-max-width'
    );
  }

  @action toggleLeftSidebar() {
    this.leftSidebarExpanded = !this.leftSidebarExpanded;
    const leftSidebar = document.getElementById('sidebar-left') as HTMLElement;
    this.toggleSidebar(leftSidebar, this.leftSidebarExpanded);
  }

  @action toggleRightSidebar() {
    // TODO: IMPLEMENT ME
  }

  toggleSidebar(sidebar: HTMLElement, expanded: boolean) {
    if (expanded) {
      sidebar.style.width = this.sidebarExpandedWidth;
    } else {
      sidebar.style.width = '0px';
    }
  }
}
