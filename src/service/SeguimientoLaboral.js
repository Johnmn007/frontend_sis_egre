import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL; // base URL de la API (ejemplo: http://localhost:3001)

// Construir la URL completa usando la base apiUrl y el endpoint
const API_URL = `${apiUrl}/SeguimientoLaboral`;

// Configuración de headers con token
const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const postSeguimiento = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error.response?.data?.message || "Error al obtener los datos";
  }
};

export const getSeguimiento = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error.response?.data?.message || "Error al obtener los datos";
  }
};

export const getSeguimientoIdTitle = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/validar/${id}`, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error.response?.data?.message || "Error al obtener los datos";
  }
};

export const updateSeguimiento = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data, {
      headers: authHeaders(),
    });
    return response;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error.response?.data?.message || "Error al obtener los datos";
  }
};

export const deleteSeguimiento = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error.response?.data?.message || "Error al obtener los datos";
  }
};
export const validarSeguimiento = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error.response?.data?.message || "Error al obtener los datos";
  }
};


