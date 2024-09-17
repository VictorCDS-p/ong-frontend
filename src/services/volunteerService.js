import axios from "axios";

const API_URL = "http://localhost:3000";

export const getVolunteers = async () => {
    try {
        const response = await axios.get(`${API_URL}/volunteer`);
        return response.data;
    } catch (error) {
        throw new Error("Erro ao buscar os Voluntários: " + error.message);
    }
};

export const getVolunteerById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/volunteer/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Erro ao buscar o Voluntário: " + error.message);
    }
};

export const createVolunteer = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/volunteer`, data);
        return response.data;
    } catch (error) {
        throw new Error("Erro ao criar o Voluntário: " + error.message);
    }
};

export const updateVolunteer = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/volunteer/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error("Erro ao atualizar o Voluntário: " + error.message);
    }
};

export const deleteVolunteer = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/volunteer/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Erro ao deletar o Voluntário: " + error.message);
    }
};
