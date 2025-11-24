import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";
const API_URL = `${apiUrl}/Student`;

// Configuración de headers con token
const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const postStudent = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al enviar los datos";
  }
};

export const getStudent = async () => {
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al obtener los datos";
  }
};

export const getIdStudent = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al enviar los datos";
  }
};

export const updateStudent = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al enviar los datos";
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al enviar los datos";
  }
};

export const uploadPhotoEstudent = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data; // { filename, url }
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    throw error;
  }
};

export const detalleView = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/detalleView/${id}`, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al obtener los datos";
  } 
};
export const detalleViewTitle = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/detalleViewTitle/${id}`, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al obtener los datos";
  } 
};

