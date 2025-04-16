export interface Pet {
    id: string;
    name: string;
    type: string;
    health: number;
    speed: number;
    armor: number;
    damage: number;
    icon: any;
}

export interface User {
    email: string;
    password: string;
    name: string;
    age: string;
    gender: string;
    pet: Pet | null;
    coinAmount: number;
    profileImage: any;
  }