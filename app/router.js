import EmberRouter from '@ember/routing/router';
import config from 'new-horizons-client/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('index', { path: '' });
  this.route('generator', function () {
    this.route('preset');
    this.route('origin');
    this.route('origin-select', { path: 'origin/:reduced_origin_id' });
    this.route('personal');
    this.route('attributes');
    this.route('traits');
    this.route('skills');
    this.route('abilities');
    this.route('apps');
    this.route('inventory');
    this.route('finish');
  });
});
