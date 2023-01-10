import { action } from '@ember/object';
import { service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import ModalService from 'new-horizons-client/services/modal';

export interface ConfirmModalOptions {
  title: string;
  content: string;
  type?: ModalType;
  icon?: string;
  prefix?: string;
  submitLabel?: string;
  cancelLabel?: string;
  onSubmit?: Function;
  onCancel?: Function;
}

export interface Signature {
  Args: {
    options: ConfirmModalOptions;
  };
}

export default class ConfirmModal extends Component<Signature> {
  @service declare modal: ModalService;
  @service declare intl: any;

  declare args: Signature['Args'];

  get content() {
    return htmlSafe(this.args.options.content);
  }

  get submitLabel() {
    return this.args.options.submitLabel || this.intl.t('misc.ok');
  }

  get cancelLabel() {
    return this.args.options.cancelLabel || this.intl.t('misc.cancel');
  }

  @action handleSubmit() {
    if (this.args.options.onSubmit) {
      this.args.options.onSubmit();
    }
  }

  @action handleCancel() {
    if (this.args.options.onCancel) {
      this.args.options.onCancel();
    } else {
      this.modal.close();
    }
  }
}
