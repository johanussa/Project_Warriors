export interface Warrior {
    idWarrior: string;
    name: string;
    image: string;
    health: number;
    energy: number;
    breed: Breed;
    warriorType: WarriorType;
    powers: Power[];
}

export interface Breed {
    idBreed: string;
    name: string;
    description: string;
    resistance: number;
}

export interface WarriorType {
    idWarriorType: string;
    name: string;
    description: string;
}

export interface Power {
    idPower: string;
    name: string;
    damage: number;
    effect: string;
    description: string;
    powerEnergyConsumed: number;
}