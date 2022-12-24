import Service from '@ember/service';
import CharacterPreset from 'new-horizons-client/game-objects/character-preset';
import Origin from 'new-horizons-client/game-objects/origin';
import PrimaryAttribute from 'new-horizons-client/game-objects/primary-attribute';
import SecondaryAttribute from 'new-horizons-client/game-objects/secondary-attribute';
import Skill from 'new-horizons-client/game-objects/skills';

export const CONSTANTS = {};

export interface DatabaseStore {
  characterPresets?: CharacterPreset[];
  origins?: Origin[];
  primaryAttributes?: PrimaryAttribute[];
  secondaryAttributes?: SecondaryAttribute[];
  skills?: Skill[];
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
   * Fetches an returns the 'primary-attribute' collection.
   * @returns The 'primary-attribute' collection.
   */
  async getPrimaryAttributes(): Promise<PrimaryAttribute[]> {
    if (!this._database.primaryAttributes) {
      this._database.primaryAttributes = (await this.getCollection(
        'pri-a'
      )) as PrimaryAttribute[];
    }
    return this._database.primaryAttributes;
  }

  /**
   * Fetches and returns the 'secondary-attribute' collection.
   * @returns The 'secondary-attribute' collection.
   */
  async getSecondaryAttributes(): Promise<SecondaryAttribute[]> {
    if (!this._database.secondaryAttributes) {
      this._database.secondaryAttributes = (await this.getCollection(
        'sec-a'
      )) as SecondaryAttribute[];
    }
    return this._database.secondaryAttributes;
  }

  /**
   * Fetches and returns the 'skill' collection.
   * @returns The 'skill' collection.
   */
  async getSkills(): Promise<Skill[]> {
    if (!this._database.skills) {
      this._database.skills = (await this.getCollection('skill')) as Skill[];
    }
    return this._database.skills;
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
