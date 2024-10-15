
export interface Health {
    max_health: number;
    current_health: number;
    temp_health: number;
  }
  
  export interface SpellSlot {
    max_slots: number;
    current_slots: number;
  }
  
  export interface Spells {
    [key: string]: SpellSlot;
  }
  
  export interface Skill {
    value: number;
    saving_throw: boolean;
    skills: { [key: string]: boolean };
  }
  
  export interface Stats {
    strength: Skill;
    dexterity: Skill;
    constitution: Skill;
    intelligence: Skill;
    wisdom: Skill;
    charisma: Skill;
  }
  
  export interface Character {
    user_id: string;
    name: string;
    class: string;
    race: string;
    level: number;
    health: Health;
    spells: string[];
    spell_slots: Spells;
    stats: Stats;
    inventory: string[];
    current_conditions: string[];
  }
  
  // Function to create a blank character JSON
  
  export function createBlankCharacterJSON(): Character {
    return {
      user_id: "",
      name: "",
      class: "",
      race: "",
      level: 1,
      health: {
        max_health: 0,
        current_health: 0,
        temp_health: 0,
      },
      spells: [],
      spell_slots: {
        level_1: {
          max_slots: 0,
          current_slots: 0,
        },
        level_2: {
          max_slots: 0,
          current_slots: 0,
        },
      },
      stats: {
        strength: {
          value: 0,
          saving_throw: false,
          skills: {},
        },
        dexterity: {
          value: 0,
          saving_throw: false,
          skills: {},
        },
        constitution: {
          value: 0,
          saving_throw: false,
          skills: {},
        },
        intelligence: {
          value: 0,
          saving_throw: false,
          skills: {},
        },
        wisdom: {
          value: 0,
          saving_throw: false,
          skills: {},
        },
        charisma: {
          value: 0,
          saving_throw: false,
          skills: {},
        },
      },
      inventory: [],
      current_conditions: [],
    };
  }
  