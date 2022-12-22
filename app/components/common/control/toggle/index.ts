import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { EmberChangeset } from 'ember-changeset';

export interface Args {
  label: string;
  state?: boolean;
  changeset?: EmberChangeset;
  key?: string;
  onChange?: Function;
  disabled?: boolean;
}

export default class ToggleComponent extends Component<Args> {
  declare args: Args;

  componentId = 'toggle-' + guidFor(this);

  constructor(owner: unknown, args: Args) {
    super(owner, args);
    if (args.state === undefined && (!args.changeset || !args.key)) {
      throw new Error(
        'The Toggle component expects either a state or a changeset-key-pair, but it received neither.'
      );
    }
  }

  get disabled() {
    return this.args.disabled;
  }

  get state() {
    if (this.args.changeset) {
      return this.args.changeset[this.args.key as string];
    } else {
      return this.args.state;
    }
  }

  @action handleChange(event: any) {
    if (this.args.changeset) {
      this.args.changeset[this.args.key as string] =
        !this.args.changeset[this.args.key as string];
      if (this.args.changeset.isValid) {
        this.args.changeset.save();
      }
    }
    if (this.args.onChange) {
      this.args.onChange(event);
    }
  }
}
