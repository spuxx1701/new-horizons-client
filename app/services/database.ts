import Service from '@ember/service';
import Ability from 'new-horizons-client/game-objects/character/ability';
import AbilityCategory from 'new-horizons-client/game-objects/character/ability-category';
import App from 'new-horizons-client/game-objects/character/app';
import AppCategory from 'new-horizons-client/game-objects/character/app-category';
import CharacterPreset from 'new-horizons-client/game-objects/character/character-preset';
import Origin from 'new-horizons-client/game-objects/character/origin';
import PrimaryAttribute from 'new-horizons-client/game-objects/character/primary-attribute';
import SecondaryAttribute from 'new-horizons-client/game-objects/character/secondary-attribute';
import Skill from 'new-horizons-client/game-objects/character/skill';
import Item from 'new-horizons-client/game-objects/item';

export const CONSTANTS = {};

export interface DatabaseStore {
  'ability-category'?: AbilityCategory[];
  ability?: Ability[];
  'app-category'?: AppCategory[];
  app?: App[];
  'character-preset'?: CharacterPreset[];
  item?: Item[];
  origins?: Origin[];
  primaryAttributes?: PrimaryAttribute[];
  secondaryAttributes?: SecondaryAttribute[];
  skills?: Skill[];
}

export default class DatabaseService extends Service {
  private _database: DatabaseStore = {};

  /**
   * Loads and returns the 'ability-category' collection.
   * @returns The 'ability-category' collection.
   */
  async getAbilityCategories(): Promise<AbilityCategory[]> {
    if (!this._database['ability-category']) {
      this._database['ability-category'] = [];
      const collection = (await this.getRawCollection(
        'ability-category'
      )) as Partial<AbilityCategory>[];
      for (const record of collection) {
        this._database['ability-category'].push(new AbilityCategory(record));
      }
    }
    return this._database['ability-category'];
  }

  /**
   * Loads and returns the 'ability' collection.
   * @returns The 'ability' collection.
   */
  async getAbilities(): Promise<Ability[]> {
    if (!this._database['ability']) {
      this._database['ability'] = [];
      const collection = (await this.getRawCollection(
        'ability'
      )) as Partial<Ability>[];
      for (const record of collection) {
        this._database['ability'].push(new Ability(record));
      }
    }
    return this._database['ability'];
  }

  /**
   * Loads and returns the 'app-category' collection.
   * @returns The 'app-category' collection.
   */
  async getAppCategories(): Promise<AppCategory[]> {
    if (!this._database['app-category']) {
      this._database['app-category'] = [];
      const collection = (await this.getRawCollection(
        'app-category'
      )) as Partial<AppCategory>[];
      for (const record of collection) {
        this._database['app-category'].push(new AppCategory(record));
      }
    }
    return this._database['app-category'];
  }

  /**
   * Loads and returns the 'app' collection.
   * @returns The 'app' collection.
   */
  async getApps(): Promise<App[]> {
    if (!this._database['app']) {
      this._database['app'] = [];
      const collection = (await this.getRawCollection('app')) as Partial<App>[];
      for (const record of collection) {
        this._database['app'].push(new App(record));
      }
    }
    return this._database['app'];
  }

  /**
   * Loads and returns the 'character-preset' collection.
   * @returns The 'character-preset' collection.
   */
  async getCharacterPresets(): Promise<CharacterPreset[]> {
    if (!this._database['character-preset']) {
      this._database['character-preset'] = [];
      const collection = (await this.getRawCollection(
        'character-preset'
      )) as Partial<CharacterPreset>[];
      for (const record of collection) {
        this._database['character-preset'].push(new CharacterPreset(record));
      }
    }
    return this._database['character-preset'];
  }

  /**
   * Loads and returns the 'item' collection.
   * @returns The 'item' collection.
   */
  async getItems(): Promise<Item[]> {
    if (!this._database['item']) {
      this._database['item'] = [];
      const collection = (await this.getRawCollection(
        'item'
      )) as Partial<Item>[];
      for (const record of collection) {
        this._database['item'].push(new Item(record));
      }
    }
    return this._database['item'];
  }

  /**
   * Loads and returns the 'origin' collection.
   * @returns The 'origin' collection.
   */
  async getOrigins(): Promise<Origin[]> {
    if (!this._database.origins) {
      this._database.origins = [];
      const collection = (await this.getRawCollection(
        'origin'
      )) as Partial<Origin>[];
      for (const record of collection) {
        this._database.origins.push(new Origin(record));
      }
    }
    return this._database.origins;
  }

  /**
   * Loads an returns the 'primary-attribute' collection.
   * @returns The 'primary-attribute' collection.
   */
  async getPrimaryAttributes(): Promise<PrimaryAttribute[]> {
    if (!this._database.primaryAttributes) {
      this._database.primaryAttributes = [];
      const collection = (await this.getRawCollection(
        'pri-a'
      )) as Partial<PrimaryAttribute>[];
      for (const record of collection) {
        this._database.primaryAttributes.push(new PrimaryAttribute(record));
      }
    }
    return this._database.primaryAttributes;
  }

  /**
   * Loads and returns the 'secondary-attribute' collection.
   * @returns The 'secondary-attribute' collection.
   */
  async getSecondaryAttributes(): Promise<SecondaryAttribute[]> {
    if (!this._database.secondaryAttributes) {
      this._database.secondaryAttributes = [];
      const collection = (await this.getRawCollection(
        'sec-a'
      )) as Partial<SecondaryAttribute>[];
      for (const record of collection) {
        this._database.secondaryAttributes.push(new SecondaryAttribute(record));
      }
    }
    return this._database.secondaryAttributes;
  }

  /**
   * Loads and returns the 'skill' collection.
   * @returns The 'skill' collection.
   */
  async getSkills(): Promise<Skill[]> {
    if (!this._database.skills) {
      this._database.skills = [];
      const collection = (await this.getRawCollection(
        'skill'
      )) as Partial<Skill>[];
      for (const record of collection) {
        this._database.skills.push(new Skill(record));
      }
    }
    return this._database.skills;
  }

  /**
   * Fetches and returns any collection. ⚠ Note that this method does return the raw data. It doesn't cache the data and it also doesn't
   * return the data as proper instances of the corresponding class.
   * @param collection The name of the collection.
   * @returns The collection.
   */
  async getRawCollection(collection: CollectionName): Promise<any[]> {
    try {
      const response = await fetch(`/database/${collection}.json`);
      const data = (await response.json()) as unknown;
      if (!data || !Array.isArray(data)) {
        throw new Error(
          `Unable to load collection ${data} or collection is not an array.`
        );
      }
      return data as any[];
    } catch (error) {
      throw new Error(`Unable to fetch collection '${collection}' (${error}).`);
    }
  }

  /**
   * This abomination deals with mapping and loading collections. In contrast to getRawCollection() it will also cache
   * the data and return the data as proper instances of the corresponding class, behaving similarly to the dedicated getter functions.
   * ⚠ Beware: The spaghetti is strong in this one.
   */
  mapAndLoadCollection(collection: CollectionName): Promise<any[]> {
    switch (collection) {
      default:
        throw new Error(`Collection ${collection} is unknown.`);
    }
  }
}
