import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import * as bootstrap from 'bootstrap';
import { ConfirmModalOptions } from 'new-horizons-client/components/modal/confirm';
import UtilityService from './utility';

export enum ModalType {
  confirm = 'confirm',
  input = 'input',
}

export default class ModalService extends Service {
  @service declare utility: UtilityService;

  modalElement: HTMLElement;
  modal: bootstrap.Modal;

  @tracked activeModalType: ModalType | undefined;
  @tracked activeModalOptions: object | undefined;
  timeToDestroy = 300;

  constructor() {
    // eslint-disable-next-line prefer-rest-params
    super(...arguments);
    this.modalElement = document.getElementById('modal') as HTMLElement;
    if (!this.modalElement) {
      throw new Error(
        'Unable to find modal container. Modals will not function.'
      );
    }
    this.modal = new bootstrap.Modal(this.modalElement, {});
  }

  confirm(options: ConfirmModalOptions) {
    this.setActiveModal(ModalType.confirm, options);
  }

  setActiveModal(type: ModalType, options: object) {
    this.activeModalType = type;
    this.activeModalOptions = options;
    this.show();
  }

  show() {
    this.modal.show();
  }

  async hide() {
    this.modal.hide();
    await this.utility.sleep(this.timeToDestroy);
    this.activeModalType = undefined;
  }
}
