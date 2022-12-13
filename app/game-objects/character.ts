import { tracked } from 'tracked-built-ins';
import GameObject from './game-object';

export default class CharacterGameObject extends GameObject {
  @tracked gameVersion = 0; // The game version that the character has been edited with last.
  @tracked characterPreset = ''; // The id of the character preset the character has been created with.

  // Personal
  @tracked name = '';

  constructor(gameVersion: number, name: string) {
    super();
    this.gameVersion = gameVersion;
    this.name = name;
  }
}
