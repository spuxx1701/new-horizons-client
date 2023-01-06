import Ember from 'ember';

declare global {
  // Prevents ESLint from "fixing" this via its auto-fix to turn it into a type
  // alias (e.g. after running any Ember CLI generator)
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Array<T> extends Ember.ArrayPrototypeExtensions<T> {}
  // interface Function extends Ember.FunctionPrototypeExtensions {}
  type ControlSize =
    | 'xx-small'
    | 'x-small'
    | 'small'
    | 'medium'
    | 'large'
    | 'x-large'
    | 'xx-large';

  type CollectionName =
    | 'ability-category'
    | 'ability'
    | 'app-category'
    | 'app'
    | 'character-preset'
    | 'item'
    | 'origin'
    | 'pri-a'
    | 'sec-a'
    | 'skill-category'
    | 'skill'
    | 'specialisation'
    | 'trait'
    | 'weight-modifier';
}

export {};
