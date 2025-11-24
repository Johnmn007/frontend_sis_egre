import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

const API_URL = `${apiUrl}/Rol`;

export const postRol = async (data) => {
    try {
      const response = await axios.post(API_URL,data);
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const getRol = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener datos:", error);
        throw error.response?.data?.message || "Error al obtener los datos";
    }
};

export const getIdRol = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener datos:", error);
        throw error.response?.data?.message || "Error al obtener los datos";
    }
};

export const updateRol = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error al obtener datos:", error);
        throw error.response?.data?.message || "Error al obtener los datos";
    }
};

export const deleteRol = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`,);
        return response.data;
    } catch (error) {
        console.error("Error al obtener datos:", error);
        throw error.response?.data?.message || "Error al obtener los datos";
    }
};
