import axios from "axios";

const API_URL = "http://localhost:3000";

export const getOpportunities = async () => {
    try {
        const response = await axios.get(`${API_URL}/opportunity`);
        return response.data;
    } catch (error) {
        throw new Error("Erro ao buscar as Oportunidades: " + error.message);
    }
};

export const getOpportunityById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/opportunity/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Erro ao buscar a Oportunidade: " + error.message);
    }
};

export const createOpportunity = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/opportunity`, data);
        return response.data;
    } catch (error) {
        throw new Error("Erro ao criar a Oportunidade: " + error.message);
    }
};

export const updateOpportunity = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/opportunity/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error("Erro ao atualizar a Oportunidade: " + error.message);
    }
};

export const deleteOpportunity = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/opportunity/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Erro ao deletar a Oportunidade: " + error.message);
    }
};
