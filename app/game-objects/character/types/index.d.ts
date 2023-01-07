export type Option = {
  id: string;
  changesCost: boolean;
  value: string;
  restrictions: Restriction[];
  targets: Target[];
};

export type Requirement = {
  id: string;
  type: string;
  input: string;
  level: number;
};

export type Restriction = {
  id: string;
  type: string;
  input: string;
  level: number;
};

export type Target = {
  id: string;
  type: string;
  input: string;
  level: number;
  overrideCurrent: boolean;
};

export type AbilityCategory =
  | 'ability-category/general'
  | 'ability-category/melee'
  | 'ability-category/ranged'
  | 'ability-category/vehicles';

export type SkillCategory =
  | 'skill-category/combat'
  | 'skill-category/physical'
  | 'skill-category/crafting'
  | 'skill-category/vehicles'
  | 'skill-category/social'
  | 'skill-category/knowledge';

export type AppBaseAbility =
  | 'ability/general/mid-hacking'
  | 'skill/knowledge/informatics';

export type AppBaseSkill =
  | 'skill/crafting/hacking'
  | 'skill/knowledge/tactics-and-strategy';
