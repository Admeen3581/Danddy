export interface Enemy {
    name: string;
    type: string;
    hp: number;
    ac: number;
    attack: string;
  }
  
  export interface Encounter {
    name: string;
    enemies: Enemy[];
  }
  
  export const encounters: Encounter[] = [
    {
      name: "Goblin Ambush",
      enemies: [
        {
          name: "Goblin",
          type: "Humanoid",
          hp: 7,
          ac: 15,
          attack: "Shortsword (1d6+2)",
        },
        {
          name: "Goblin Boss",
          type: "Humanoid",
          hp: 21,
          ac: 17,
          attack: "Scimitar (1d6+4)",
        },
      ],
    },
    {
      name: "Bandit Raid",
      enemies: [
        {
          name: "Bandit",
          type: "Humanoid",
          hp: 11,
          ac: 12,
          attack: "Shortbow (1d6+2)",
        },
        {
          name: "Bandit Leader",
          type: "Humanoid",
          hp: 24,
          ac: 15,
          attack: "Longsword (1d8+3)",
        },
      ],
    },
  ];
  