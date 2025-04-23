export interface Pet {
    id: string;
    name: string;
    type: string;
    health: number;
    speed: number;
    armor: number;
    damage: number;
    lastFedDate: string;
    lastPlayedDate: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    deadline: string;
    tags: string[];
    difficulty: string;
    isCompleted: boolean;
    isRepeated: boolean;
    repeatInterval: number; // number of days?
}

export interface User {
    email: string;
    password: string;
    name: string;
    age: string;
    gender: string;
    tasks: Task[];
    pet: Pet | null;
    coinAmount: number;
    profileImage: any;
  }