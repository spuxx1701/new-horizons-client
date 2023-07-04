import Service, { service } from '@ember/service';
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
import LoggerService from './logger';

interface DatabaseStore {
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

/**
 * `DatabaseService` loads, caches and provides all `GameObject` collections.
 */
export default class DatabaseService extends Service {
  @service declare logger: LoggerService;
  private store: DatabaseStore = {};

  /**
   * Loads and returns the 'ability' collection.
   * @returns The 'ability' collection.
   */
  async getAbilities(): Promise<Ability[]> {
    if (!this.store['ability']) {
      this.store['ability'] = [];
      const collection = (await this.getRawCollection(
        'ability'
      )) as Partial<Ability>[];
      for (const record of collection) {
        this.store['ability'].push(new Ability(this, record));
      }
    }
    return this.store['ability'];
  }

  /**
   * Loads and returns the 'app' collection.
   * @returns The 'app' collection.
   */
  async getApps(): Promise<App[]> {
    if (!this.store['app']) {
      this.store['app'] = [];
      const collection = (await this.getRawCollection('app')) as Partial<App>[];
      for (const record of collection) {
        this.store['app'].push(new App(this, record));
      }
    }
    return this.store['app'];
  }

  /**
   * Loads and returns the 'character-preset' collection.
   * @returns The 'character-preset' collection.
   */
  async getCharacterPresets(): Promise<CharacterPreset[]> {
    if (!this.store['character-preset']) {
      this.store['character-preset'] = [];
      const collection = (await this.getRawCollection(
        'character-preset'
      )) as Partial<CharacterPreset>[];
      for (const record of collection) {
        this.store['character-preset'].push(new CharacterPreset(this, record));
      }
    }
    return this.store['character-preset'];
  }

  /**
   * Loads and returns the 'item' collection.
   * @returns The 'item' collection.
   */
  async getItems(): Promise<Item[]> {
    if (!this.store['item']) {
      this.store['item'] = [];
      const collection = (await this.getRawCollection(
        'item'
      )) as Partial<Item>[];
      for (const record of collection) {
        this.store['item'].push(new Item(this, record));
      }
    }
    return this.store['item'];
  }

  /**
   * Loads and returns the 'origin' collection.
   * @returns The 'origin' collection.
   */
  async getOrigins(): Promise<Origin[]> {
    if (!this.store['origin']) {
      this.store['origin'] = [];
      const collection = (await this.getRawCollection(
        'origin'
      )) as Partial<Origin>[];
      for (const record of collection) {
        this.store['origin'].push(new Origin(this, record));
      }
    }
    return this.store['origin'];
  }

  /**
   * Loads an returns the 'primary-attribute' collection.
   * @returns The 'primary-attribute' collection.
   */
  async getPrimaryAttributes(): Promise<PrimaryAttribute[]> {
    if (!this.store['pri-a']) {
      this.store['pri-a'] = [];
      const collection = (await this.getRawCollection(
        'pri-a'
      )) as Partial<PrimaryAttribute>[];
      for (const record of collection) {
        this.store['pri-a'].push(new PrimaryAttribute(this, record));
      }
    }
    return this.store['pri-a'];
  }

  /**
   * Loads and returns the 'secondary-attribute' collection.
   * @returns The 'secondary-attribute' collection.
   */
  async getSecondaryAttributes(): Promise<SecondaryAttribute[]> {
    if (!this.store['sec-a']) {
      this.store['sec-a'] = [];
      const collection = (await this.getRawCollection(
        'sec-a'
      )) as Partial<SecondaryAttribute>[];
      for (const record of collection) {
        this.store['sec-a'].push(new SecondaryAttribute(this, record));
      }
    }
    return this.store['sec-a'];
  }

  /**
   * Loads and returns the 'skill' collection.
   * @returns The 'skill' collection.
   */
  async getSkills(): Promise<Skill[]> {
    if (!this.store['skill']) {
      this.store['skill'] = [];
      const collection = (await this.getRawCollection(
        'skill'
      )) as Partial<Skill>[];
      for (const record of collection) {
        this.store['skill'].push(new Skill(this, record));
      }
    }
    return this.store['skill'];
  }

  /**
   * Loads and returns the 'specialisation' collection.
   * @returns The 'specialisation' collection.
   */
  async getSpecialisations(): Promise<Specialisation[]> {
    if (!this.store['specialisation']) {
      this.store['specialisation'] = [];
      const collection = (await this.getRawCollection(
        'specialisation'
      )) as Partial<Specialisation>[];
      for (const record of collection) {
        this.store['specialisation'].push(new Specialisation(this, record));
      }
    }
    return this.store['specialisation'];
  }

  /**
   * Loads and returns the 'specialisation' collection.
   * @returns The 'specialisation' collection.
   */
  async getTraits(): Promise<Trait[]> {
    if (!this.store['trait']) {
      this.store['trait'] = [];
      const collection = (await this.getRawCollection(
        'trait'
      )) as Partial<Trait>[];
      for (const record of collection) {
        this.store['trait'].push(new Trait(this, record));
      }
    }
    return this.store['trait'];
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
}
