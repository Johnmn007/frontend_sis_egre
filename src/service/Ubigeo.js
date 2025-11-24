import axios from "axios"; const apiUrl = process.env.REACT_APP_API_URL; 
// Ejemplo: http://localhost:3001 // 
// Construir URLs completas para endpoints 

const API_URL = `${apiUrl}/ubigeo`; 
// Función para obtener headers con token actualizado dinámicamente 
const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getDepartaments = async () => { 
  try { 
    const response = await axios.get(`${API_URL}/departamentos`, {
      headers: authHeaders(),
    }); 
    return response.data; 
  } catch (error) { 
    throw error.response?.data || "Error al enviar los datos"; 
  } 
};

export const getIdDepartaments = async (id) => { 
  try { 
    const response = await axios.get(`${API_URL}/departamentos/${id}`, {
      headers: authHeaders(),
    }); 
    return response.data; 
  } catch (error) { 
    throw error.response?.data || "Error al enviar los datos"; 
  } 
};


export const getProvincias = async (id) => { 
  try { 
    const response = await axios.get(`${API_URL}/provincias/${id}`, {
      headers: authHeaders(),
    }); 
    return response.data; 
  } catch (error) { 
    throw error.response?.data || "Error al enviar los datos"; 

  } 
}; 

export const getIdProvincias = async (id) => { 
  try { 
    const response = await axios.get(`${API_URL}/provincia/${id}`, {
      headers: authHeaders(),
    }); 
    return response.data; 
  } catch (error) { 
    throw error.response?.data || "Error al enviar los datos"; 

  } 
}; 

export const getDistritos = async (id) => { 
  try { 
    const response = await axios.get(`${API_URL}/distritos/${id}`, {
      headers: authHeaders(),
    }); 
    return response.data; 
  } catch (error) { 
    throw error.response?.data || "Error al enviar los datos"; 
  } 
};

export const getIdDistritos = async (id) => { 
  try { 
    const response = await axios.get(`${API_URL}/distrito/${id}`, {
      headers: authHeaders(),
    }); 
    return response.data; 
  } catch (error) { 
    throw error.response?.data || "Error al enviar los datos"; 
  } 
};