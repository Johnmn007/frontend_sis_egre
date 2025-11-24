import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL; // Ejemplo: http://localhost:3001
const API_URL = `${apiUrl}/Status`;

// Función para obtener headers con token actualizado dinámicamente
const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const postStatus = async (data) => {
  try {
    const response = await axios.post(API_URL, data, authConfig());
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error.response?.data?.message || "Error al obtener los datos";
  }
};

export const getStatus = async () => {
  try {
    const response = await axios.get(API_URL, authConfig());
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error.response?.data?.message || "Error al obtener los datos";
  }
};

export const getIdStatus = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, authConfig());
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error.response?.data?.message || "Error al obtener los datos";
  }
};

export const updateStatus = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data, authConfig());
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error.response?.data?.message || "Error al obtener los datos";
  }
};

export const deleteStatus = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, authConfig());
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error.response?.data?.message || "Error al obtener los datos";
  }
};
