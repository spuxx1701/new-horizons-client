'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'new-horizons-client',
    environment,
    rootURL: '/',
    locationType: 'history',
    gameVersion: '1.0',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      DEBUG: false,
      USE_ONBEFOREUNLOAD: true,
    },
  };

  if (environment === 'development') {
    ENV.APP.DEBUG = true;
    ENV.APP.USE_ONBEFOREUNLOAD = false;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
