import axios from "axios";

const API_URL = "http://localhost:3000";

const handleError = (error, action) => {
    throw new Error(`Erro ao ${action}: ${error.response?.data.message || error.message}`);
};

export const getOpportunities = async () => {
    try {
        const response = await axios.get(`${API_URL}/opportunity`);
        return response.data;
    } catch (error) {
        handleError(error, "buscar as Oportunidades");
    }
};

export const getOpportunityById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/opportunity/${id}`);
        return response.data;
    } catch (error) {
        handleError(error, "buscar a Oportunidade");
    }
};

export const createOpportunity = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/opportunity`, data);
        return response.data;
    } catch (error) {
        handleError(error, "criar a Oportunidade");
    }
};

export const updateOpportunity = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/opportunity/${id}`, data);
        return response.data;
    } catch (error) {
        handleError(error, "atualizar a Oportunidade");
    }
};

export const deleteOpportunity = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/opportunity/${id}`);
        return response.data;
    } catch (error) {
        handleError(error, "deletar a Oportunidade");
    }
};
