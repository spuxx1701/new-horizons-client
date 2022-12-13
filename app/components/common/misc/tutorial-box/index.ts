import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import LocalStorageService from 'new-horizons-client/services/local-storage';
import UtilityService from 'new-horizons-client/services/utility';
import { tracked } from 'tracked-built-ins';

export interface Args {
  title: string;
}

export default class TutorialBoxComponent extends Component<Args> {
  @service declare localStorage: LocalStorageService;
  @service declare utility: UtilityService;

  @tracked fading = true;
  @tracked closed = true;
  @tracked contentFading = true;
  @tracked contentClosed = false;

  constructor(owner: unknown, args: Args) {
    super(owner, args);
    this.update();
  }

  /**
   * This did-update modifier observes localStorage.tutorialsEnabled.
   */
  @action update() {
    if (this.localStorage.tutorialsEnabled) {
      this.show();
    } else {
      this.close();
    }
  }

  @action async show() {
    this.contentShow();
    this.closed = false;
    await this.utility.sleep(100);
    this.fading = false;
  }

  @action async close() {
    this.fading = true;
    await this.utility.sleep(500);
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
    await this.utility.sleep(100);
    this.contentFading = false;
  }

  @action async contentClose() {
    this.contentFading = true;
    await this.utility.sleep(500);
    this.contentClosed = true;
  }
}
