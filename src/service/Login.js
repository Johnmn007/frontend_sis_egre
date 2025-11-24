import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

const API_URL = `${apiUrl}/Login`;

export const postLogin = async (data) => {
    try {
      const response = await axios.post(API_URL,data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
export const getLogin = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error.response?.data?.message || "Error al obtener los datos";
  }
};
export const getIdLogin = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error.response?.data?.message || "Error al obtener los datos";
  }
};

  export const getLoginUser = async (usuario) => {
    try {
      const {data} = await axios.get(`${API_URL}/user/${usuario}`);
      return data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return null; // usuario no existe
      }
      throw error; // otros errores sí se lanzan
    }
  };

  
  export const getUserValidate = async (usuario, contraseña,idRol) => {
    try {
      const response = await axios.post(`${API_URL}/validateUser`, { usuario, contraseña,idRol });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
export const deleteLogin = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`,);
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error.response?.data?.message || "Error al obtener los datos";
  }
};
export const updateLogin = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error.response?.data?.message || "Error al obtener los datos";
  }
};
