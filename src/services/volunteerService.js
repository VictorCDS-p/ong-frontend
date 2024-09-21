import axios from "axios";

const API_URL = "http://localhost:3000";

const handleError = (error, action) => {
    throw new Error(`Erro ao ${action}: ${error.response?.data.message || error.message}`);
};

export const getVolunteers = async () => {
    try {
        const response = await axios.get(`${API_URL}/volunteer`);
        return response.data;
    } catch (error) {
        handleError(error, "buscar os Voluntários");
    }
};

export const getVolunteerById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/volunteer/${id}`);
        return response.data;
    } catch (error) {
        handleError(error, "buscar o Voluntário");
    }
};

export const createVolunteer = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/volunteer`, data);
        return response.data;
    } catch (error) {
        handleError(error, "criar o Voluntário");
    }
};

export const updateVolunteer = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/volunteer/${id}`, data);
        return response.data;
    } catch (error) {
        handleError(error, "atualizar o Voluntário");
    }
};

export const deleteVolunteer = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/volunteer/${id}`);
        return response.data;
    } catch (error) {
        handleError(error, "deletar o Voluntário");
    }
};
