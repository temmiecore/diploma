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

export interface Task {
    title: string;
    description: string;
    deadline: string;
    tags: string[];
    difficulty: string;
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