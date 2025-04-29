import { Pet } from "./types";

const today = new Date();

export const pets: Pet[] = [
  {
    id: "1",
    name: "",
    type: "cat",
    maxHealth: 80,
    health: 80,
    speed: 1,
    armor: 2,
    damage: 4,
    lastFedDate: today.toISOString(),
    lastPlayedDate: today.toISOString(),
    lastBattleDate: today.toISOString(),
    xp: 0,
    level: 1,
  },
  {
    id: "2",
    name: "",
    type: "dog",
    maxHealth: 110,
    health: 110,
    speed: 1,
    armor: 2,
    damage: 2,
    lastFedDate: today.toISOString(),
    lastPlayedDate: today.toISOString(),
    lastBattleDate: today.toISOString(),
    xp: 0,
    level: 1,
  },
  {
    id: "3",
    name: "",
    type: "deer",
    maxHealth: 140,
    health: 140,
    speed: 2,
    armor: 0,
    damage: 2,
    lastFedDate: today.toISOString(),
    lastPlayedDate: today.toISOString(),
    lastBattleDate: today.toISOString(),
    xp: 0,
    level: 1,
  },
  {
    id: "4",
    name: "",
    type: "hedgehog",
    maxHealth: 80,
    health: 80,
    speed: 1,
    armor: 6,
    damage: 2,
    lastFedDate: today.toISOString(),
    lastPlayedDate: today.toISOString(),
    lastBattleDate: today.toISOString(),
    xp: 0,
    level: 1,
  },
  {
    id: "5",
    name: "",
    type: "seal",
    maxHealth: 90,
    health: 90,
    speed: 2,
    armor: 2,
    damage: 3,
    lastFedDate: today.toISOString(),
    lastPlayedDate: today.toISOString(),
    lastBattleDate: today.toISOString(),
    xp: 0,
    level: 1,
  },
];

export const chooseIcon = (type: string) => {
  switch (type) {
    case "cat":
      return require("@/assets/images/pets/cat.png");
    case "dog":
      return require("@/assets/images/pets/dog.png");
    case "deer":
      return require("@/assets/images/pets/deer.png");
    case "hedgehog":
      return require("@/assets/images/pets/hedgehog.png");
    case "seal":
      return require("@/assets/images/pets/seal.png");
  }
};
