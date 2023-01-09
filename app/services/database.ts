import Service from '@ember/service';
import Ability from 'new-horizons-client/game-objects/character/ability';
import App from 'new-horizons-client/game-objects/character/app';
import CharacterPreset from 'new-horizons-client/game-objects/character/character-preset';
import Origin from 'new-horizons-client/game-objects/character/origin';
import PrimaryAttribute from 'new-horizons-client/game-objects/character/primary-attribute';
import SecondaryAttribute from 'new-horizons-client/game-objects/character/secondary-attribute';
import Skill from 'new-horizons-client/game-objects/character/skill';
import Specialisation from 'new-horizons-client/game-objects/character/specialisation';
import Trait from 'new-horizons-client/game-objects/character/trait';
import Item from 'new-horizons-client/game-objects/item';

export const CONSTANTS = {};

export interface DatabaseStore {
  ability?: Ability[];
  app?: App[];
  'character-preset'?: CharacterPreset[];
  item?: Item[];
  origin?: Origin[];
  'pri-a'?: PrimaryAttribute[];
  'sec-a'?: SecondaryAttribute[];
  skill?: Skill[];
  specialisation?: Specialisation[];
  trait?: Trait[];
}

export default class DatabaseService extends Service {
  private _database: DatabaseStore = {};

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
        this._database['ability'].push(new Ability(this, record));
      }
    }
    return this._database['ability'];
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
        this._database['app'].push(new App(this, record));
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
        this._database['character-preset'].push(
          new CharacterPreset(this, record)
        );
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
        this._database['item'].push(new Item(this, record));
      }
    }
    return this._database['item'];
  }

  /**
   * Loads and returns the 'origin' collection.
   * @returns The 'origin' collection.
   */
  async getOrigins(): Promise<Origin[]> {
    if (!this._database['origin']) {
      this._database['origin'] = [];
      const collection = (await this.getRawCollection(
        'origin'
      )) as Partial<Origin>[];
      for (const record of collection) {
        this._database['origin'].push(new Origin(this, record));
      }
    }
    return this._database['origin'];
  }

  /**
   * Loads an returns the 'primary-attribute' collection.
   * @returns The 'primary-attribute' collection.
   */
  async getPrimaryAttributes(): Promise<PrimaryAttribute[]> {
    if (!this._database['pri-a']) {
      this._database['pri-a'] = [];
      const collection = (await this.getRawCollection(
        'pri-a'
      )) as Partial<PrimaryAttribute>[];
      for (const record of collection) {
        this._database['pri-a'].push(new PrimaryAttribute(this, record));
      }
    }
    return this._database['pri-a'];
  }

  /**
   * Loads and returns the 'secondary-attribute' collection.
   * @returns The 'secondary-attribute' collection.
   */
  async getSecondaryAttributes(): Promise<SecondaryAttribute[]> {
    if (!this._database['sec-a']) {
      this._database['sec-a'] = [];
      const collection = (await this.getRawCollection(
        'sec-a'
      )) as Partial<SecondaryAttribute>[];
      for (const record of collection) {
        this._database['sec-a'].push(new SecondaryAttribute(this, record));
      }
    }
    return this._database['sec-a'];
  }

  /**
   * Loads and returns the 'skill' collection.
   * @returns The 'skill' collection.
   */
  async getSkills(): Promise<Skill[]> {
    if (!this._database['skill']) {
      this._database['skill'] = [];
      const collection = (await this.getRawCollection(
        'skill'
      )) as Partial<Skill>[];
      for (const record of collection) {
        this._database['skill'].push(new Skill(this, record));
      }
    }
    return this._database['skill'];
  }

  /**
   * Loads and returns the 'specialisation' collection.
   * @returns The 'specialisation' collection.
   */
  async getSpecialisations(): Promise<Specialisation[]> {
    if (!this._database['specialisation']) {
      this._database['specialisation'] = [];
      const collection = (await this.getRawCollection(
        'specialisation'
      )) as Partial<Specialisation>[];
      for (const record of collection) {
        this._database['specialisation'].push(new Specialisation(this, record));
      }
    }
    return this._database['specialisation'];
  }

  /**
   * Loads and returns the 'specialisation' collection.
   * @returns The 'specialisation' collection.
   */
  async getTraits(): Promise<Trait[]> {
    if (!this._database['trait']) {
      this._database['trait'] = [];
      const collection = (await this.getRawCollection(
        'trait'
      )) as Partial<Trait>[];
      for (const record of collection) {
        this._database['trait'].push(new Trait(this, record));
      }
    }
    return this._database['trait'];
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
