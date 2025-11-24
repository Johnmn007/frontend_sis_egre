import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";
const API_URL = `${apiUrl}/Permisos`;

// Configuración de headers con token
const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const postPermisos = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al enviar los datos";
  }
};

export const getPermisos = async (query = "") => {
  try {
    const response = await axios.get(`${API_URL}?${query}`, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al obtener los datos";
  }
};

export const getIdPermisos = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al enviar los datos";
  }
};

export const updatePermisos = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al enviar los datos";
  }
};