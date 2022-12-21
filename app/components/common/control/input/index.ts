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
    align?: 'start' | 'center' | 'end';
  };
}

export default class InputComponent extends Component<Signature> {
  declare args: Signature['Args'];

  constructor(owner: unknown, args: Signature['Args']) {
    super(owner, args);
    if (args.value === undefined && (!args.changeset || !args.key)) {
      throw new Error(
        'The Input component expects either a value or a changeset-key-pair, but it received neither.'
      );
    }
  }

  get value() {
    if (this.args.changeset && this.args.key) {
      return this.args.changeset.get(this.args.key);
    } else {
      return this.args.value || '';
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
    if (this.args.type === 'number' && !this.args.align) {
      return 'end';
    } else {
      return this.args.align || 'start';
    }
  }

  @action handleInput(event: InputEvent) {
    (event.target as HTMLElement).classList.remove('hide-invalidity');
    (event.target as HTMLInputElement).reportValidity();
  }

  @action handleChange(event: InputEvent) {
    if ((event.target as HTMLInputElement).checkValidity()) {
      const value = (event.target as HTMLInputElement).value;
      if (this.args.changeset && this.args.key) {
        this.args.changeset.set(this.args.key, value);
        if (this.args.changeset.isValid) {
          this.args.changeset.save();
        }
      }
      if (this.args.onChange) {
        this.args.onChange(value, event);
      }
    }
  }
}
