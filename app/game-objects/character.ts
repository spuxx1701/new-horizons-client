import { tracked } from 'tracked-built-ins';
import GameObject from './game-object';

export default class Character extends GameObject {
  @tracked gameVersion: string; // The game version that the character has been edited with last.
  @tracked characterPresetId: string; // The id of the character preset the character has been created with.

  // Personal
  @tracked name = 'unknown';
  originId = 'unknown';

  constructor(gameVersion: string, characterPresetId: string, name: string) {
    super();
    this.gameVersion = gameVersion;
    this.name = name;
    this.characterPresetId = characterPresetId;
  }
}
