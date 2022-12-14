import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export interface DropdownOption {
  label: string;
  data: any;
}

export interface Args {
  options: DropdownOption[];
  default?: DropdownOption;
  onSelect?: Function;
}

export default class DropdownComponent extends Component<Args> {
  @tracked selectedOption: DropdownOption | undefined;
  @tracked expanded = false;

  constructor(owner: unknown, args: Args) {
    super(owner, args);
    if (args.options.length > 0) {
      if (args.default) {
        this.selectedOption = args.default;
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

  @action toggle() {
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
}
