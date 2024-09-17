import axios from "axios"

const API_URL = "http://localhost:3000"

export const getONGs = async () => {
    try {
        const response = await axios.get(`${API_URL}/ong`)
        return response.data;
    } catch (error) {
        throw new Error("Erro ao buscar a ONGs: " + error.message)
    }
};

export const getONGById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/ong/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Erro ao buscar a ONG: " + error.message);
    }
};

export const createONG = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/ong`, data);
        return response.data;
    } catch (error) {
        throw new Error("Erro ao buscar a ONG: " + error.message);

    }
};

export const updateONG = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/ong/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error("Erro ao buscar a ONG: " + error.message);
    }
};

export const deleteONG = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/ong/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Erro ao deletar ONG: " + error.message);
    }
};