import Service from '@ember/service';
import CharacterPreset from 'new-horizons-client/game-objects/character-preset';
import Origin from 'new-horizons-client/game-objects/origin';

export const CONSTANTS = {};

export interface DatabaseStore {
  characterPresets?: CharacterPreset[];
  origins?: Origin[];
}

export default class DatabaseService extends Service {
  private _database: DatabaseStore = {};

  /**
   * Fetches and returns the 'character-preset' collection.
   * @returns The 'character-preset' collection.
   */
  async getCharacterPresets(): Promise<CharacterPreset[]> {
    if (!this._database.characterPresets) {
      this._database.characterPresets = (await this.getCollection(
        'character-preset'
      )) as CharacterPreset[];
    }
    return this._database.characterPresets;
  }

  /**
   * Fetches and returns the 'origin' collection.
   * @returns The 'origin' collection.
   */
  async getOrigins(): Promise<Origin[]> {
    if (!this._database.origins) {
      this._database.origins = (await this.getCollection('origin')) as Origin[];
    }
    return this._database.origins;
  }

  /**
   * Fetches and returns any collection.
   * @param collection The name of the collection.
   * @returns The collection.
   */
  async getCollection(collection: string): Promise<any[]> {
    try {
      const response = await fetch(`/database/${collection}.json`);
      const data = await response.json();
      return data as any[];
    } catch (error) {
      throw new Error(`Unable to fetch collection '${collection}' (${error}).`);
    }
  }
}
