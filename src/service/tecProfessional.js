import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";
const API_URL = `${apiUrl}/tecProfessional`;

// Función para obtener config con headers y token
const getConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

export const postTecProf = async (data) => {
  try {
    const response = await axios.post(API_URL, data, getConfig());
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error.response?.data?.message || "Error al obtener los datos";
  }
};

export const getTecProf = async () => {
  try {
    const response = await axios.get(API_URL, getConfig());
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error.response?.data?.message || "Error al obtener los datos";
  }
};

export const getIdTecProf = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, getConfig());
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error.response?.data?.message || "Error al obtener los datos";
  }
};

export const updateTecProf = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data, getConfig());
    return response.data;
  } catch (error) {
    console.error("Error al actualizar datos:", error);
    throw error.response?.data?.message || "Error al actualizar los datos";
  }
};

export const deleteTecProf = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, getConfig());
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error.response?.data?.message || "Error al obtener los datos";
  }
};
