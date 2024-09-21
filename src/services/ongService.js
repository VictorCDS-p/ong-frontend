import axios from "axios";

const API_URL = "http://localhost:3000";

const handleError = (error, action) => {
    throw new Error(`Erro ao ${action}: ${error.response?.data.message || error.message}`);
};

export const getONGs = async () => {
    try {
        const response = await axios.get(`${API_URL}/ong`);
        return response.data;
    } catch (error) {
        handleError(error, "buscar as ONGs");
    }
};

export const getONGById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/ong/${id}`);
        return response.data;
    } catch (error) {
        handleError(error, "buscar a ONG");
    }
};

export const createONG = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/ong`, data);
        return response.data;
    } catch (error) {
        handleError(error, "criar a ONG");
    }
};

export const updateONG = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/ong/${id}`, data);
        return response.data;
    } catch (error) {
        handleError(error, "atualizar a ONG");
    }
};

export const deleteONG = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/ong/${id}`);
        return response.data;
    } catch (error) {
        handleError(error, "deletar ONG");
    }
};
