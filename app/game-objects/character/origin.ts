import GameObject from '../game-object';

export interface SkillFixed {
  id: string;
  level: number;
}

export interface SkillOption {
  level: number;
  options: string[];
}

export default class Origin extends GameObject {
  declare convenientTraits: any[]; // TODO: FIX TYPING
  declare specialPA: string;
  declare skillsFixed: SkillFixed[];
  declare skillOptions: SkillOption[];

  constructor(init: Partial<Origin>) {
    super();
    Object.assign(this, init);
  }
}
