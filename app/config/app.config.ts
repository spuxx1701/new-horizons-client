import ENV from 'new-horizons-client/config/environment';

/**
 * The global application config. Also exposes `ember`'s
 * environment config.
 */
export const appConfig = {
  // The prefix that will be added to localStorage keys.
  localStoragePrefix: 'newhorizons-',
  // The minimum width of the viewport to assume desktop mode.
  desktopMinWidth: 768,
  // Ember's environmental config.
  ENV,
};
