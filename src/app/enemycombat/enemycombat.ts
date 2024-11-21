export interface Enemy {
    actions: any[];
    alignment: string;
    armor_class: any[];
    challenge_rating: number;
    charisma: number;
    constitution: number;
    count: number;
    dexterity: number;
    hit_dice: string;
    hit_points: number;
    hit_points_roll: string
    image: string;
    index: string;
    intelligence: number;
    languages: string;
    legendary_action: any[];
    name: string;
    proficiencies: any[];
    proficiency_bonus: number;
    senses: any[];
    size: string;
    special_abilities: any[];
    speed: any[];
    strength: number;
    type: string;
    url: string;
    wisdom: number;
    xp: number;
  }
  
  export interface Encounter {
    name: string;
    enemies: Enemy[];
  }

  function newEnemy(data: JSON): Enemy{
    var enemy : Enemy = {
        actions: data["actions"],
        alignment: data["alignment"],
        armor_class: data["armor_class"],
        challenge_rating: data["challenge_rating"],
        charisma: data["charisma"],
        constitution: data["constitution"],
        count: data["count"],
        dexterity: data["dexterity"],
        hit_dice: data["hit_dice"],
        hit_points: data["hit_points"],
        hit_points_roll: data["hit_points_roll"],
        image: data["image"],
        index: data["index"],
        intelligence: data["intelligence"],
        languages: data["languages"],
        legendary_action: data["legendary_action"],
        name: data["name"],
        proficiencies: data["proficiencies"],
        proficiency_bonus: data["proficiency_bonus"],
        senses: data["senses"],
        size: data["size"],
        special_abilities: data["special_abilities"],
        speed: data["speed"],
        strength: data["strength"],
        type: data["type"],
        url: data["url"],
        wisdom: data["wisdom"],
        xp: data["xp"]
    }
    return enemy
  }

  export function setUpEncouters(data: JSON){
    var dmEncoutners: Encounter[] = []
    for(var encounterName in data){
        const encounter: Encounter = {
            name: encounterName,
            enemies: []
        }
        for(var enemy in data[encounterName]){
            var enem = newEnemy(data[encounterName][enemy])
            encounter.enemies.push(enem)
        }
        dmEncoutners.push(encounter)
    }
    return dmEncoutners
  }