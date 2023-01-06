export type Requirement = {
  id: string;
  type: string;
  input: string;
  level: number;
  overrideCurrent: boolean;
  oldLevel: number;
};

export type Option = {
  id: string;
  changesCost: boolean;
  value: string;
  restrictions: Restriction[];
  targets: Target[];
};

export type Restriction = {};

export type Target = {};
