import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { ConfirmModalOptions } from 'new-horizons-client/components/modal/confirm';
import { sleep } from 'new-horizons-client/utilities/misc.utility';

export enum ModalType {
  confirm = 'confirm',
  input = 'input',
}

export default class ModalService extends Service {
  @tracked activeModalType: ModalType | null = null;
  @tracked activeModalOptions: object | null = null;
  timeToDestroy = 300;

  confirm(options: ConfirmModalOptions) {
    this.setActiveModal(ModalType.confirm, options);
  }

  setActiveModal(type: ModalType, options: object) {
    this.activeModalOptions = options;
    this.activeModalType = type;
    this.show();
  }

  getModalContainer() {
    const modal = document.getElementById('modal');
    if (!modal) {
      throw new Error('Unable to find modal container.');
    }
    return modal as HTMLDialogElement;
  }

  show() {
    document.documentElement.style.setProperty('--modal-opacity', '1');
    document.documentElement.style.setProperty('--modal-scale', '1');
    this.getModalContainer().showModal();
  }

  async close() {
    document.documentElement.style.setProperty('--modal-opacity', '0');
    document.documentElement.style.setProperty('--modal-scale', '0');
    await sleep(this.timeToDestroy);
    this.getModalContainer().close();
    this.activeModalType = null;
    this.activeModalOptions = null;
  }
}
