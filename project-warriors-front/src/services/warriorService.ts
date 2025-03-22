import axios from "axios";
import { toast } from "react-toastify";
import { Warrior } from './types';

const PATH_BASE = 'http://localhost:8080/internal';

const getAllWarriors = async (): Promise<Warrior[]> => {
    try {
        const response = await axios.get<Warrior[]>(`${PATH_BASE}/warrior/all`);
        toast.success("Consulta lista de guerreros exitosa", { autoClose: 1200 });

        return response.data;

    } catch (error) {

        const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "Error desconocido";

        toast.error(`Error al consultar lista de guerreros. Error: ${errorMessage}`)
        return [];
    }
}
// Petición para obtener los detalles de un guerrero

export { getAllWarriors }