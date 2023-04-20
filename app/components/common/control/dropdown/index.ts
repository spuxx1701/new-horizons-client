import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import RendererService from 'new-horizons-client/services/renderer';

export interface DropdownOption {
  label: string;
  data: any;
}

export interface Args {
  options: DropdownOption[];
  default?: number;
  label?: string;
  onSelect?: Function;
  size?: ControlSize;
  loop?: boolean;
}

export default class DropdownComponent extends Component<Args> {
  @service declare renderer: RendererService;

  componentId = 'dropdown-' + guidFor(this);

  @tracked selectedOption: DropdownOption | undefined;
  @tracked expanded = false;

  constructor(owner: unknown, args: Args) {
    super(owner, args);
    if (args.options.length > 0) {
      if (
        typeof args.default === 'number' &&
        args.default >= 0 &&
        args.default < args.options.length
      ) {
        this.selectedOption = args.options[args.default];
      } else {
        this.selectedOption = args.options[0];
      }
    } else {
      this.selectedOption = undefined;
    }
  }

  get caption() {
    return this.selectedOption?.label || '';
  }

  get options() {
    return this.args.options;
  }

  get size() {
    return this.args.size || 'medium';
  }

  @action toggle(event: MouseEvent) {
    this.renderer.createClickRipple(event);
    if (this.expanded) {
      this.collapse();
    } else {
      this.expand();
    }
  }

  @action expand() {
    this.expanded = true;
  }

  @action collapse() {
    this.expanded = false;
  }

  @action handleBlur(event: FocusEvent) {
    if (
      event.relatedTarget instanceof HTMLElement &&
      event.relatedTarget.matches('.dropdown-item')
    ) {
      return;
    }
    this.collapse();
  }

  @action handleItemClick(option: DropdownOption) {
    this.selectedOption = option;
    this.collapse();
    if (typeof this.args.onSelect === 'function') {
      this.args.onSelect(option);
    }
  }

  @action handleBackClick() {
    if (!this.selectedOption) return;
    const currentIndex = this.options.indexOf(
      this.selectedOption as DropdownOption
    );
    let previousIndex = currentIndex - 1;
    if (previousIndex < 0) previousIndex = this.options.length - 1;
    this.handleItemClick(this.options[previousIndex] as DropdownOption);
  }

  @action handleForwardClick() {
    if (!this.selectedOption) return;
    const currentIndex = this.options.indexOf(
      this.selectedOption as DropdownOption
    );
    let nextIndex = currentIndex + 1;
    if (nextIndex >= this.options.length) nextIndex = 0;
    this.handleItemClick(this.options[nextIndex] as DropdownOption);
  }
}
