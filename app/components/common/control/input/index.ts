import { action } from '@ember/object';
import Component from '@glimmer/component';
import { EmberChangeset } from 'ember-changeset';
import { tracked } from 'tracked-built-ins';

export interface Signature {
  Args: {
    type?: 'text' | 'email' | 'number';
    label: string;
    value?: string;
    changeset?: EmberChangeset;
    key?: string;
    size?: ControlSize;
    onChange?: Function;
    disabled?: boolean;
    required?: boolean;
    pattern?: RegExp;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    autocapitalize?: string;
    autocomplete?: string;
    align?: 'left' | 'center' | 'right';
  };
}

export default class InputComponent extends Component<Signature> {
  declare args: Signature['Args'];

  @tracked value;

  constructor(owner: unknown, args: Signature['Args']) {
    super(owner, args);
    if (this.args.changeset && this.args.key) {
      this.value = this.args.changeset[this.args.key];
    } else {
      this.value = this.args.value || '';
    }
  }

  get type() {
    return this.args.type || 'text';
  }

  get size() {
    return this.args.size || 'medium';
  }

  get autocapitalize() {
    return this.args.autocapitalize || 'off';
  }

  get autocomplete() {
    return this.args.autocomplete || 'off';
  }

  get align() {
    return this.args.align || 'left';
  }

  @action handleInput(event: InputEvent) {
    (event.target as HTMLElement).classList.remove('hide-invalidity');
    (event.target as HTMLInputElement).reportValidity();
  }

  @action handleChange(event: InputEvent) {
    if ((event.target as HTMLInputElement).checkValidity()) {
      if (this.args.changeset && this.args.key) {
        this.args.changeset[this.args.key] = this.value;
        if (this.args.changeset.isValid) {
          this.args.changeset.save();
        }
      }
      if (this.args.onChange) {
        this.args.onChange(event);
      }
    }
  }
}
