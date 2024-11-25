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
    proficiencies: string[];
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
      },
      stats: {
        strength: {
          value: 0,
          saving_throw: false,
          skills: {
            athletics: false
          }
        },
        dexterity: {
          value: 0,
          saving_throw: false,
          skills: {
            acrobatics: false,
            sleight_of_hand: false,
            stealth: false
          }
        },
        constitution: {
          value: 0,
          saving_throw: false,
          skills: {},
        },
        intelligence: {
          value: 0,
          saving_throw: false,
          skills: {
            arcana: false,
            history: false,
            investigation: false,
            nature: false,
            religion: false
          }
        },
        wisdom: {
          value: 0,
          saving_throw: false,
          skills: {
            animal_handling: false,
            insight: false,
            medicine: false,
            perception: false,
            survival: false
          }
        },
        charisma: {
          value: 0,
          saving_throw: false,
          skills: {
            deception: false,
            intimidation: false,
            performance: false,
            persuasion: false
          }
        },
      },
      inventory: [],
      proficiencies: [],
      current_conditions: [],
    };
  }
  
export function findSkillInJson(skill: String, character: Character): boolean{
  const formattedSkill = skill.toLowerCase().replace(" ", "_");
  for(const stat in character.stats){
    for(const skil in character.stats[stat].skills){
      if(formattedSkill == skil)
        return character.stats[stat].skills[skil]
    }
  }
  return false
}

export function setSkillInJson(skill: String, character: Character, flag: boolean){
  const formattedSkill = skill.toLowerCase().replace(" ", "_");
  for(const stat in character.stats){
    for(const skil in character.stats[stat].skills){
      if(formattedSkill == skil){
        character.stats[stat].skills[skil] = flag
        return
      }
    }
  }
  return
}

export function getModifier(abilityScore: number): number {
  return Math.floor((abilityScore - 10) / 2);
}
