import axios from "axios";
import { toast } from "react-toastify";
import { Breed, Power, Warrior, WarriorType } from './types';

const PATH_BASE = 'http://localhost:8080/internal';

export const getAllWarriors = async (): Promise<Warrior[]> => {
    try {
        const response = await axios.get<Warrior[]>(`${PATH_BASE}/warrior/all`);
        toast.success("Consulta lista de guerreros exitosa", { autoClose: 800 });

        return response.data;

    } catch (error) {
        toast.error(`Error al consultar lista de guerreros. Error: ${validateError(error)}`);
        return [];
    }
}

export const getWarriorById = async (idWarrior: string | undefined): Promise<Warrior | null> => {
    try {
        const response = await axios.get<Warrior>(`${PATH_BASE}/warrior/${idWarrior}`);
        toast.success("Consulta de guerrero exitosa", { autoClose: 1000, position: "top-center" });

        return response.data;
    } catch (error) {
        toast.error(`Error al consultar guerrero. Error: ${validateError(error)}`);
        return null;
    }
}

export const getWarriorTypes = async (): Promise<WarriorType[]> => {
    try {
        const response = await axios.get<WarriorType[]>(`${PATH_BASE}/warrior-type/all`);
        toast.success("Consulta de tipos de guerreros exitosa", { autoClose: 800 });

        return response.data;
    } catch (error) {
        toast.error(`Error al consultar tipos de guerreros. Error: ${validateError(error)}`);
        return [];
    }
}

export const getBreeds = async (): Promise<Breed[]> => {
    try {
        const response = await axios.get<Breed[]>(`${PATH_BASE}/breed/all`);
        toast.success("Consulta de razas exitosa", { autoClose: 800 });

        return response.data;
    } catch (error) {
        toast.error(`Error al consultar las razas. Error: ${validateError(error)}`);
        return [];
    }
}

export const getPowers = async (): Promise<Power[]> => {
    try {
        const response = await axios.get<Power[]>(`${PATH_BASE}/power/all`);
        toast.success("Consulta de poderes exitosa", { autoClose: 800 });

        return response.data;
    } catch (error) {
        toast.error(`Error al consultar los poderes. Error: ${validateError(error)}`);
        return [];
    }
}

export const getImages = async (): Promise<string[]> => {
    try {
        const response = await axios.get<string[]>(`${PATH_BASE}/images`);
        toast.success("Consulta de imágenes exitosa", { autoClose: 800 });

        return response.data;
    } catch (error) {
        toast.error(`Error al consultar las imagenes. Error: ${validateError(error)}`);
        return [];
    }
}

export const validateError = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.message || error.message;
    }
    return "Error desconocido";
}
