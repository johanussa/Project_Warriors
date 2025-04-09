import { ChangeEvent } from "react";

export interface Warrior {
    idWarrior?: string;
    name: string;
    image: string;
    health: number;
    energy: number;
    breed?: Breed;
    warriorType?: WarriorType;
    powers?: Power[];
    breedId: string;
    warriorTypeId: string;
    powersId: string[];
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

export interface ImageSelectorProps {
    image?: string;
    warriorImages: string[];
    setWarriorData: (updater: (prevState: Warrior) => Warrior) => void;
}

export interface ImageOptionsProps {
    warriorImages: string[];
    selectedImage: string;
    onImageChange: (image: string) => void;
}

export interface FieldFormProps {
    label: string;
    name: string;
    type?: string;
    value?: string | number;
    handlerChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface RadioGroupProps {
    value?: string;
    name?: string;
    label?: string;
    options: {
        id: string;
        name: string;
        description: string;
        resistence?: number;
    }[];
    extra?: boolean;
    handlerChange: (event: ChangeEvent<HTMLInputElement>) => void;
    width?: string;
    powers?: string[];
}

export interface WarriorCreateCompProps extends WarriorListData {
    setWarrior: (updater: (prevState: Warrior) => Warrior) => void;
    title: string;
    warrior?: Warrior;
    isUpdate?: boolean;
}

export interface WarriorDataProps extends WarriorListData {
    open: boolean;
    idWarrior: string;
    setOpen: (event: boolean) => void;
    handlerDeleteWarrior: (idWarrior: string) => void;
    handlerUpdateWarrior: (updatedWarrior: Warrior) => void;
}

export interface WarriorUpdateProps extends WarriorListData {
    warrior: Warrior;
    handlerUpdateWarrior: (updatedWarrior: Warrior) => void;
}

export interface OnWarriorChangeProps {
    event: ChangeEvent<HTMLInputElement>;
    setWarrior: (updater: (prevState: Warrior) => Warrior) => void;
}

export interface WarriorCreateProps extends WarriorListData {
    handlerAddWarrior: (newWarrior: Warrior) => void;
}

export interface CreateWarriorProps {
    warrior: Warrior;
    handlerAddWarrior: (newWarrior: Warrior) => void;
}

export interface WarriorListProps {
    warriors: Warrior[];
    handleShowWarrior: (warrior: Warrior) => void
}

export interface BtnCreateWarriorProps {
    openCreate: boolean;
    setOpenCreate: (updater: (prevState: boolean) => boolean) => void;
}

interface WarriorListData {
    warriorTypes: WarriorType[];
    warriorBreeds: Breed[];
    warriorPowers: Power[];
    warriorImages: string[];
}