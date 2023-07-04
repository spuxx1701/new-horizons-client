import { Theme } from 'new-horizons-client/services/renderer';
import { Settings } from 'new-horizons-client/services/settings';

/**
 * The default user settings.
 */
export const DEFAULT_SETTINGS: Settings = {
  debug: false,
  tutorials: false,
  theme: Theme.default,
};
