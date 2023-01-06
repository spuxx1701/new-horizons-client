import { tracked } from 'tracked-built-ins';
import GameObject from '../game-object';
import PrimaryAttribute from './primary-attribute';

export default class Character extends GameObject {
  @tracked gameVersion: string; // The game version that the character has been edited with last.
  @tracked characterPresetId: string; // The id of the character preset the character has been created with.

  @tracked name = 'unknown';
  originId = 'unknown';

  primaryAttributes: PrimaryAttribute[] = [];

  constructor(
    id: string,
    gameVersion: string,
    characterPresetId: string,
    name: string
  ) {
    super();
    this.id = id;
    this.gameVersion = gameVersion;
    this.name = name;
    this.characterPresetId = characterPresetId;
  }
}
