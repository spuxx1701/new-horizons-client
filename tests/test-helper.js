import Application from 'new-horizons-client/app';
import config from 'new-horizons-client/config/environment';
import * as QUnit from 'qunit';
import {
  forceModulesToBeLoaded,
  sendCoverage,
} from 'ember-cli-code-coverage/test-support';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';
import setupSinon from 'ember-sinon-qunit';

setApplication(Application.create(config.APP));

QUnit.config.maxDepth = 12;
QUnit.dump.maxDepth = 12;

setup(QUnit.assert);
setupSinon();

start();

QUnit.done(async function () {
  forceModulesToBeLoaded();
  await sendCoverage();
});
