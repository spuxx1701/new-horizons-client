import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import TutorialsService from 'new-horizons-client/services/tutorials';
import UtilityService from 'new-horizons-client/services/utility';
import { tracked } from 'tracked-built-ins';

export interface Args {
  title: string;
}

export default class TutorialBoxComponent extends Component<Args> {
  @service declare tutorials: TutorialsService;
  @service declare utility: UtilityService;

  @tracked fading = true;
  @tracked closed = true;
  @tracked contentFading = true;
  @tracked contentClosed = false;

  constructor(owner: unknown, args: Args) {
    super(owner, args);
    this.closed = !this.tutorials.showTutorials;
  }

  /**
   * This did-update modifier observes tutorials.showTutorials.
   */
  @action showTutorialsDidUpdate() {
    if (this.tutorials.showTutorials) {
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
