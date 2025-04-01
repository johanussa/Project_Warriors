import axios from "axios";
import { toast } from "react-toastify";
import { Breed, Power, Warrior, WarriorType } from './types';

const PATH_BASE = 'http://localhost:8080/internal';

export const getAllWarriors = async (): Promise<Warrior[]> => {
    try {
        const response = await axios.get<Warrior[]>(`${PATH_BASE}/warrior/allWarriors`);
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
        return response.data;
    } catch (error) {
        toast.error(`Error al consultar guerrero. Error: ${validateError(error)}`);
        return null;
    }
}

export const getWarriorTypes = async (): Promise<WarriorType[]> => {
    try {
        const response = await axios.get<WarriorType[]>(`${PATH_BASE}/warrior-type/allWarriorTypes`);
        return response.data;
    } catch (error) {
        toast.error(`Error al consultar tipos de guerreros. Error: ${validateError(error)}`);
        return [];
    }
}

export const getBreeds = async (): Promise<Breed[]> => {
    try {
        const response = await axios.get<Breed[]>(`${PATH_BASE}/breed/allBreeds`);
        return response.data;
    } catch (error) {
        toast.error(`Error al consultar las razas. Error: ${validateError(error)}`);
        return [];
    }
}

export const getPowers = async (): Promise<Power[]> => {
    try {
        const response = await axios.get<Power[]>(`${PATH_BASE}/power/allPowers`);
        return response.data;
    } catch (error) {
        toast.error(`Error al consultar los poderes. Error: ${validateError(error)}`);
        return [];
    }
}

export const getImages = async (): Promise<string[]> => {
    try {
        const response = await axios.get<string[]>(`${PATH_BASE}/images`);
        return response.data;
    } catch (error) {
        toast.error(`Error al consultar las imagenes. Error: ${validateError(error)}`);
        return [];
    }
}

interface CreateWarriorProps {
    warrior: Warrior;
    handlerAddWarrior: (newWarrior: Warrior) => void;
}

export const createWarrior = async ({ warrior, handlerAddWarrior }: CreateWarriorProps): Promise<Warrior | void> => {
    try {
        const response = await axios.post<Warrior>(`${PATH_BASE}/warrior/create`, warrior);
        toast.success("Guerrero creado exitosamente", { autoClose: 800 });
        handlerAddWarrior(response.data);
        return response.data;
    } catch (error) {
        toast.error(`Error al crear guerrero. ${validateError(error)}`);
        return;
    }
}

export const updateWarrior = async (warrior: Warrior): Promise<Warrior | null> => {
    try {
        const response = await axios.put<Warrior>(`${PATH_BASE}/warrior/update`, warrior);
        toast.success("Guerrero actualizado exitosamente", { autoClose: 800 });
        return response.data;
    }
    catch (error) {
        toast.error(`Error al actualizar guerrero. ${validateError(error)}`);
        return null;
    }
}

export const deleteWarrior = async (idWarrior: string | undefined): Promise<void> => {
    try {
        const response = await axios.delete<void>(`${PATH_BASE}/warrior/delete/${idWarrior}`);
        toast.success("Guerrero eliminado correctamente", { autoClose: 800 });

        return response.data;
    }
    catch (error) {
        toast.error(`Error al eliminar guerrero. ${validateError(error)}`);
        return;
    }
}

export const validateError = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.detail || error.message;
    }
    return "Error desconocido";
}
