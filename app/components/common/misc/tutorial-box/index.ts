import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import SettingsService from 'new-horizons-client/services/settings';
import { sleep } from 'new-horizons-client/utilities/misc.utility';
import { tracked } from 'tracked-built-ins';

export interface Args {
  title: string;
}

export default class TutorialBoxComponent extends Component<Args> {
  @service declare settings: SettingsService;

  @tracked fading = true;
  @tracked closed = true;
  @tracked contentFading = true;
  @tracked contentClosed = true;

  constructor(owner: unknown, args: Args) {
    super(owner, args);
    this.update();
  }

  /**
   * This did-update modifier observes localStorage.tutorialsEnabled.
   */
  @action update() {
    if (this.settings.getValue('tutorials')) {
      this.show();
    } else {
      this.close();
    }
  }

  @action async show() {
    this.closed = false;
    await sleep(100);
    this.fading = false;
  }

  @action async close() {
    this.fading = true;
    await sleep(500);
    this.closed = true;
  }

  @action async toggleContent() {
    if (this.contentClosed) {
      this.contentShow();
    } else {
      this.contentClose();
    }
  }

  @action async contentShow() {
    this.contentClosed = false;
    await sleep(100);
    this.contentFading = false;
  }

  @action async contentClose() {
    this.contentFading = true;
    await sleep(500);
    this.contentClosed = true;
  }
}
