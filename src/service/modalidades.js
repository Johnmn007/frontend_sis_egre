  import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";
const API_URL = `${apiUrl}/Modalidad`;

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const postModalidad = async (data) => {
  const response = await axios.post(API_URL, data, {
      headers: authHeaders(),
    });
  return response.data;
};

export const getModalidad = async () => {
  const response = await axios.get(API_URL, {
      headers: authHeaders(),
    });
  return response.data;
};

export const getIdModalidad = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, {
      headers: authHeaders(),
    });
  return response.data;
};

export const updateModalidad = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data, {
      headers: authHeaders(),
    });
  return response.data;
};

export const deleteModalidad = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
      headers: authHeaders(),
    });
  return response.data;
};
