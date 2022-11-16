import { tracked } from 'tracked-built-ins';
import GameObject from './game-object';

export default class CharacterGameObject extends GameObject {
  @tracked gameVersion: number = 0; // The game version that the character has been edited with last.
  @tracked characterPreset: string = ''; // The id of the character preset the character has been created with.

  // Personal
  @tracked name: string = '';

  constructor(gameVersion: number, name: string) {
    super();
    this.gameVersion = gameVersion;
    this.name = name;
  }
}
