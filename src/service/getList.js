import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL; // Ejemplo: http://localhost:3001

// Construir URLs completas para endpoints
const API_URL = `${apiUrl}/List`;


// Función para obtener headers con token actualizado dinámicamente
const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Obtener lista de egresados con filtros
export const getList = async () => {
  try {
    
    const response = await axios.get(`${API_URL}`, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error.response?.data?.message || "Error al obtener los datos";
  }
};

export const getListId = async (id) => {
  try {
    
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error.response?.data?.message || "Error al obtener los datos";
  }
};

