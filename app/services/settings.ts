import Service, { service } from '@ember/service';
import { tracked } from 'tracked-built-ins/.';
import { Theme } from './renderer';
import { appConfig } from 'new-horizons-client/config/app.config';
import LoggerService from './logger';
import { DEFAULT_SETTINGS } from 'new-horizons-client/config/settings.config';

export interface Settings {
  debug: boolean;
  tutorials: boolean;
  theme: Theme;
}

const LOCAL_STORAGE_KEY = `${appConfig.localStoragePrefix}settings`;

/**
 * `SettingsService` provides access to the user's settings.
 * Settings will be loaded from and stored to `localStorage`
 * and cached during a session.
 */
export default class SettingsService extends Service {
  @service declare logger: LoggerService;
  @tracked settings: Settings = this.loadFromStorage();

  /**
   * Returns the current settings value for the given key.
   * @param key The key.
   * @returns The settings value.
   */
  getValue<K extends keyof Settings>(key: K): Settings[K] {
    return this.settings[key];
  }

  /**
   * Updates the settings with the given values. May optionally
   * also trigger a save to `localStorage`
   * @param newSettings The new settings values.
   * @param options.save (optional) When `true`, will also trigger a save to `localStorage`
   */
  update(newSettings: Partial<Settings>, options?: { save: boolean }) {
    this.settings = { ...this.settings, ...newSettings };
    if (options?.save) {
      this.save();
    }
  }

  /**
   * Loads the settings from `localStorage`. Uses default settings if no settings
   * can be found in `localStorage`
   */
  loadFromStorage(): Settings {
    const jsonString = localStorage.getItem(LOCAL_STORAGE_KEY);
    let settings: Settings;
    if (jsonString) {
      const loadedSettings: Settings = JSON.parse(jsonString);
      settings = { ...DEFAULT_SETTINGS, ...loadedSettings };
    } else {
      settings = { ...DEFAULT_SETTINGS };
    }
    return settings;
  }

  /**
   * Reloads the currently stored settings by re-fetching them
   * from `localStorage`.
   */
  reload(): void {
    this.settings = this.loadFromStorage();
  }

  /**
   * Saves the current settings to `localStorage`.
   */
  save() {
    const jsonString = JSON.stringify(this.settings);
    localStorage.setItem(LOCAL_STORAGE_KEY, jsonString);
    this.logger.debug(`Settings saved: ${jsonString}`, SettingsService.name);
  }
}
