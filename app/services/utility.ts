import Service from '@ember/service';

export default class UtilityService extends Service {
  async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
